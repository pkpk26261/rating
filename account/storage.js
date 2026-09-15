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
  // Each document edits its own durable cache. Other tabs only meet at the
  // server's compare-and-swap boundary, never through shared mutable revisions.
  function accountStorage(native,session,owner,id,reloading=false){
    const base='rating-account:'+owner+':',sessionKey='rating-workspace:'+owner;
    const ownPrevious=session.getItem(sessionKey);
    const previous=ownPrevious||native.getItem(base+'last-workspace');
    const source=previous?base+'workspace:'+previous+':':base;
    const prefix=base+'workspace:'+id+':';
    const all=Array.from({length:native.length},(_,i)=>native.key(i));
    for(const key of all){
      if(!key?.startsWith(source))continue;
      const short=key.slice(source.length);
      if(!previous&&(short==='last-workspace'||short==='google-connection'||short.startsWith('workspace:')))continue;
      native.setItem(prefix+short,native.getItem(key));
    }
    if(reloading&&ownPrevious){for(const key of all)if(key?.startsWith(source))native.removeItem(key);if(native.getItem(base+'last-workspace')===ownPrevious)native.setItem(base+'last-workspace',id);}
    session.setItem(sessionKey,id);
    const scoped=scopedStorage(native,owner+':workspace:'+id);
    return {...scoped,
      get length(){return scoped.length;},
      getItem(key){
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
        if(key==='gsheet_sync_v1'){
          const after=JSON.parse(value);
          if(!native.getItem(base+'google-connection'))native.setItem(base+'google-connection',JSON.stringify({url:after.url||'',token:after.token||''}));
        }
        scoped.setItem(key,value);native.setItem(base+'last-workspace',id);
      },
      setGoogleConnection(connection){
        native.setItem(base+'google-connection',JSON.stringify({url:connection.url,token:connection.token,explicit:true}));
      },
      clear(){scoped.clear();}
    };
  }
  if(typeof module==='object' && module.exports){module.exports={scopedStorage,accountStorage};return;}
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
    setItem:(key,value)=>native.setItem('rating-account:auth:'+key,value),
    removeItem:key=>native.removeItem('rating-account:auth:'+key)
  };
  root.RatingRememberOwner=id=>{if(id)native.setItem('rating-account:last-owner',id);else native.removeItem('rating-account:last-owner');};
  root.RatingStorage=owner?accountStorage(native,sessionStorage,owner,crypto.randomUUID(),performance.getEntriesByType('navigation')[0]?.type==='reload'):scopedStorage(native,'');
  root.RatingAccount={owner,ready:!owner,busy:false};
  if(owner)document.documentElement.dataset.accountPending='true';
})(typeof window==='object'?window:globalThis);
