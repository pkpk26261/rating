/* Keep every legacy cache, Google setting and backup in its account namespace.
 * Authentication has its own reserved storage; no secret key is used. */
(function(root){
  'use strict';
  function scopedStorage(native, owner){
    const prefix = owner ? 'rating-account:' + owner + ':' : '';
    const keys = () => Array.from({length:native.length},(_,i)=>native.key(i))
      .filter(k=>k && (prefix ? k.startsWith(prefix) : !k.startsWith('rating-account:')));
    return {
      get length(){return keys().length;},
      key(i){const k=keys()[i];return k == null ? null : k.slice(prefix.length);},
      getItem(k){return !prefix && String(k).startsWith('rating-account:') ? null : native.getItem(prefix+k);},
      setItem(k,v){if(!prefix && String(k).startsWith('rating-account:'))throw Error('保留的儲存名稱');native.setItem(prefix+k,String(v));},
      removeItem(k){if(prefix || !String(k).startsWith('rating-account:'))native.removeItem(prefix+k);},
      clear(){for(const k of keys())native.removeItem(k);}
    };
  }
  const guestResetKey='rating-guest-reset-v1';
  function resetGuestWorkspace(native){
    const keys=Array.from({length:native.length},(_,i)=>native.key(i)).filter(k=>
      /^(pscore_session_v1|scores_v[12]|deductions_v1|stu_notes_v1|pscore_before_cloud_download_v1|pscore_exam_dashboard_v1)$/.test(k)||/^(hw_v1__|seat_v1__|draw_v1__)/.test(k));
    const configKey='gsheet_sync_v1',raw=native.getItem(configKey);
    const config=raw?JSON.parse(raw):{};
    if(!config||typeof config!=='object'||Array.isArray(config))throw Error('Google 設定無法讀取，尚未清空本機資料。');
    const before=new Map([...keys,configKey,guestResetKey].map(k=>[k,native.getItem(k)]));
    try{
      native.setItem(configKey,JSON.stringify({...config,autoSync:false,autoLoad:false,lastSync:0,lastUploadedRevision:'',accountBackupRevision:''}));
      for(const key of keys)native.removeItem(key);
      native.setItem(guestResetKey,String(Number(before.get(guestResetKey)||0)+1));
    }catch(error){
      for(const [key,value] of before){if(value===null)native.removeItem(key);else native.setItem(key,value);}
      throw error;
    }
  }
  // A guest tab opened before a reset must not save its old in-memory data back.
  function guestStorage(native){
    const scoped=scopedStorage(native,'');
    let generation;try{generation=native.getItem(guestResetKey);}catch{}
    const check=()=>{if(native.getItem(guestResetKey)!==generation)throw Error('本機空間已清空，請重新整理此分頁。');};
    return {...scoped,get length(){return scoped.length;},
      setItem(k,v){check();scoped.setItem(k,v);},
      removeItem(k){check();scoped.removeItem(k);},
      clear(){check();scoped.clear();}
    };
  }
  function clearAccountSession(session,owner){
    for(const key of ['rating-workspace:'+owner,'rating-auth','rating-owner','rating-recovery','rating-open-google'])session.removeItem(key);
  }
  function clearAccountLocalData(native,session,owner){
    if(!owner)throw Error('無法辨識要清除的帳號。');
    const prefix='rating-account:'+owner+':';
    const keys=Array.from({length:native.length},(_,i)=>native.key(i)).filter(k=>k?.startsWith(prefix)||k?.startsWith('rating-account:auth:'));
    // Remove the lease first so stale documents cannot recreate deleted caches.
    native.removeItem(prefix+'epoch');
    for(const key of keys)native.removeItem(key);
    if(native.getItem('rating-account:last-owner')===owner)native.removeItem('rating-account:last-owner');
    clearAccountSession(session,owner);
  }
  // Each document edits its own durable cache. Other tabs only meet at the
  // server's compare-and-swap boundary, never through shared mutable revisions.
  function accountStorage(native,session,owner,id,reloading=false){
    const base='rating-account:'+owner+':',sessionKey='rating-workspace:'+owner;
    const epochKey=base+'epoch';
    const epoch=native.getItem(epochKey)||id;
    native.setItem(epochKey,epoch);
    const isActive=()=>native.getItem(epochKey)===epoch;
    const check=()=>{if(!isActive())throw Error('帳號已登出並清除，請重新整理此分頁。');};
    const ownPrevious=session.getItem(sessionKey);
    if(reloading&&ownPrevious)id=ownPrevious;
    const previous=ownPrevious||native.getItem(base+'last-workspace');
    const source=previous?base+'workspace:'+previous+':':base;
    const prefix=base+'workspace:'+id+':';
    const all=Array.from({length:native.length},(_,i)=>native.key(i));
    try{for(const key of all){
      if(prefix===source)break;
      if(!key?.startsWith(source))continue;
      const short=key.slice(source.length);
      if(!previous&&(short==='epoch'||short==='last-workspace'||short==='google-connection'||short.startsWith('workspace:')))continue;
      native.setItem(prefix+short,native.getItem(key));
    }session.setItem(sessionKey,id);}catch(error){
      for(const key of Array.from({length:native.length},(_,i)=>native.key(i)))if(prefix!==source&&key?.startsWith(prefix))native.removeItem(key);
      throw error;
    }
    // Reload retains this tab's workspace instead of temporarily doubling its disk use.
    const scoped=scopedStorage(native,owner+':workspace:'+id);
    return {...scoped,isActive,
      get length(){return scoped.length;},
      getItem(key){
        check();
        const own=scoped.getItem(key),shared=key==='gsheet_sync_v1'?native.getItem(base+'google-connection'):null;
        if(!shared)return own;
        const local=JSON.parse(own||'{}'),connection=JSON.parse(shared);
        if(!connection||typeof connection!=='object'||Array.isArray(connection)||typeof connection.url!=='string'||typeof connection.token!=='string')throw Error('Invalid Google connection');
        // Older background saves could create an empty shared record. It is not
        // an explicit disconnect; preserve this account tab's complete setting.
        if(!connection.explicit&&!connection.url&&!connection.token&&local.url&&local.token)return own;
        const changed=local.url!==connection.url||local.token!==connection.token;
        return JSON.stringify({...local,...connection,...(changed?{lastSync:0,lastUploadedRevision:'',accountBackupRevision:''}:{})});
      },
      setItem(key,value){
        check();
        if(key==='gsheet_sync_v1'){
          const after=JSON.parse(value);
          if(!native.getItem(base+'google-connection'))native.setItem(base+'google-connection',JSON.stringify({url:after.url||'',token:after.token||''}));
        }
        scoped.setItem(key,value);native.setItem(base+'last-workspace',id);
      },
      setGoogleConnection(connection){
        check();
        native.setItem(base+'google-connection',JSON.stringify({url:connection.url,token:connection.token,explicit:true}));
      },
      removeItem(key){check();scoped.removeItem(key);},
      clear(){check();scoped.clear();}
    };
  }
  if(typeof module==='object' && module.exports){module.exports={scopedStorage,accountStorage,resetGuestWorkspace,guestStorage,clearAccountLocalData};return;}
  let owner='';
  try{
    // Migrate the previous per-tab login once, then keep login across reopening.
    const old=sessionStorage.getItem('rating-auth');
    if(old&&!root.localStorage.getItem('rating-account:auth:rating-auth'))root.localStorage.setItem('rating-account:auth:rating-auth',old);
    sessionStorage.removeItem('rating-auth');
    owner=sessionStorage.getItem('rating-owner')||root.localStorage.getItem('rating-account:last-owner')||'';
  }catch{}
  if(!/^[0-9a-f-]{36}$/i.test(owner))owner='';
  // Lazy access preserves the existing app's handling of unavailable storage.
  const native={get length(){return root.localStorage.length;},key:i=>root.localStorage.key(i),getItem:k=>root.localStorage.getItem(k),setItem:(k,v)=>root.localStorage.setItem(k,v),removeItem:k=>root.localStorage.removeItem(k)};
  root.RatingAuthStorage={
    getItem:key=>native.getItem('rating-account:auth:'+key),
    setItem:(key,value)=>{
      if(owner&&root.RatingStorage?.isActive&&!root.RatingStorage.isActive())throw Error('帳號已登出，無法儲存登入憑證。');
      native.setItem('rating-account:auth:'+key,value);
    },
    removeItem:key=>native.removeItem('rating-account:auth:'+key)
  };
  root.RatingRememberOwner=id=>{if(id)native.setItem('rating-account:last-owner',id);else native.removeItem('rating-account:last-owner');};
  root.RatingClearAccountLocalData=()=>clearAccountLocalData(native,sessionStorage,owner);
  root.RatingResetGuestWorkspace=()=>resetGuestWorkspace(native);
  root.RatingAccount={owner,ready:false,busy:false,initializationError:''};
  try{
    root.RatingStorage=owner?accountStorage(native,sessionStorage,owner,crypto.randomUUID(),performance.getEntriesByType('navigation')[0]?.type==='reload'):guestStorage(native);
    root.RatingAccount.ready=!owner;
  }catch(error){
    root.RatingAccount.initializationError=error?.name==='QuotaExceededError'?'瀏覽器儲存空間不足，無法開啟帳號資料。原有資料已保留。':'瀏覽器無法讀取本機資料。請確認允許此網站使用儲存空間，再重新載入；原有資料已保留。';
    const fail=()=>{throw Error(root.RatingAccount.initializationError);};
    root.RatingStorage={get length(){return fail();},key:fail,getItem:fail,setItem:fail,removeItem:fail,clear:fail,isActive:()=>false};
  }
  if(!owner)root.addEventListener('storage',event=>{
    if(event.key!==guestResetKey)return;
    root.RatingAccount.ready=false;root.RatingBridge?.cancelGoogle();
    root.location.reload();
  });
  if(owner&&!root.RatingAccount.initializationError){
    const leaveClearedAccount=()=>{
      if(root.RatingStorage.isActive())return;
      root.RatingAccount.ready=false;
      root.RatingBridge?.cancelGoogle();
      document.documentElement.dataset.accountPending='true';
      clearAccountSession(sessionStorage,owner);
      root.location.reload();
    };
    root.addEventListener('storage',event=>{if(event.key===null||event.key==='rating-account:'+owner+':epoch')leaveClearedAccount();});
    root.addEventListener('pageshow',leaveClearedAccount);
    document.documentElement.dataset.accountPending='true';
  }
})(typeof window==='object'?window:globalThis);
