(function(){
  'use strict';
  const A=window.RatingAccount, $=id=>document.getElementById(id);
  const PROJECT_URL='https://xfmflmattytjpyraauyu.supabase.co';
  const KEY='sb_publishable_oV97m81Mp4D8748zYcFP6g_P684t9MC';
  const redirect=location.protocol==='file:'?'https://pkpk26261.github.io/rating/index.html':new URL('index.html',location.href).href.split('#')[0].split('?')[0];
  const dialog=$('account-dialog');
  let client,user=null,mode='login',working=false,cloud=null,epoch=0;
  const metaKey='rating-cloud-meta';
  const readMeta=()=>JSON.parse(RatingStorage.getItem(metaKey)||'null');
  const message=(text,error=false)=>{$('account-feedback').textContent=text;$('account-feedback').dataset.error=String(error);};
  let syncTimer=null,syncPromise=null,channel=null,stopped=false,syncState='loading',syncError='',syncedAt='';
  const live=()=>!stopped&&A.ready&&!!user&&user.id===A.owner;
  function paintSync(kind,error=''){
    syncState=kind;syncError=error;updateStatus();
    if(error)message(error,true);
    else if(['saved','empty'].includes(kind))message('');
  }
  function scheduleSync(delay=900){
    if(!live()||mode==='reset')return;
    clearTimeout(syncTimer);syncTimer=setTimeout(()=>{syncTimer=null;syncNow();},delay);
  }
  function hasContent(data){return !!(data.classOrder?.length||data.progress?.order?.length||data.taskBoard?.library?.length||data.taskBoard?.current||data.classroomTemplates?.length);}
  async function writeCloud(uid,payload,localRevision,remote){
    payload={...payload,accountVersion:localRevision};
    if(new Blob([JSON.stringify(payload)]).size>50*1024*1024)throw Error('資料超過單次上傳的 50 MB 限制。');
    const revision=crypto.randomUUID(),before=readMeta()||{};
    // Save a durable request receipt before sending. A lost response can be reconciled by GET.
    RatingStorage.setItem(metaKey,JSON.stringify({...before,pending:{remoteRevision:revision,localRevision}}));
    const request=remote?client.from('teacher_workspaces').update({payload,revision}).eq('user_id',uid).eq('revision',remote.revision):client.from('teacher_workspaces').insert({user_id:uid,payload,revision});
    const {data,error}=await request.select('revision,updated_at');
    if(error||data?.length!==1)throw Error(error?.code==='23505'||!error?'雲端版本已變更，請先核對資料。':error.message);
    if(!live()||uid!==user.id)return;
    RatingStorage.setItem(metaKey,JSON.stringify({remoteRevision:revision,localRevision}));syncedAt=data[0].updated_at;
    return {payload,revision,updated_at:syncedAt};
  }
  async function performSync(){
    if(!live()||working||mode==='reset')return;
    try{RatingBridge.assertWritable();}catch{scheduleSync(2000);return;}
    const uid=user.id,revision=RatingBridge.revision();
    try{
      const remote=await getCloud(uid);
      if(!live()||uid!==user.id)return;
      // A local change during the fetch belongs to the next pass, never this download.
      if(revision!==RatingBridge.revision()){paintSync('pending');scheduleSync();return;}
      const payload=RatingBridge.snapshot(),meta=readMeta();
      const action=RatingSyncPolicy.decide({revision,hasLocal:hasContent(payload.data),meta,remote});
      if(action==='acknowledge'){
        RatingStorage.setItem(metaKey,JSON.stringify({remoteRevision:remote.revision,localRevision:meta.pending.localRevision}));
        syncedAt=remote.updated_at;paintSync('pending');scheduleSync(0);return;
      }
      if(action==='conflict'){
        paintSync('conflict','資料版本時間無法辨識，請先在「備份與還原」保存本機備份，再載入帳號資料。');return;
      }
      if(action==='download'){
        if(!RatingBridge.canReceive()){paintSync('receiving');scheduleSync(2000);return;}
        RatingBridge.restore(RatingBridge.validate(remote.payload));
        RatingStorage.setItem(metaKey,JSON.stringify({remoteRevision:remote.revision,localRevision:RatingBridge.revision()}));
        syncedAt=remote.updated_at;paintSync('saved');return;
      }
      if(action==='upload'){
        RatingBridge.assertWritable();
        if(!RatingBridge.flush())throw Error('本機儲存失敗，請先下載備份並重試儲存。');
        paintSync('syncing');
        await writeCloud(uid,payload,revision,remote);
        if(!live())return;
        if(revision!==RatingBridge.revision()){paintSync('pending');scheduleSync();return;}
        paintSync('saved');return;
      }
      syncedAt=remote?.updated_at||'';paintSync(remote?'saved':'empty');
    }catch(error){if(live()){paintSync('error',explain(error));if(/版本已變更/.test(error.message))scheduleSync(900);}}
  }
  function syncNow(){
    if(syncPromise)return syncPromise;
    syncPromise=performSync().finally(()=>{syncPromise=null;});return syncPromise;
  }
  function startSync(){
    if(!live())return;
    if(!channel){
      channel=client.channel('rating-workspace-'+user.id)
        .on('postgres_changes',{event:'*',schema:'public',table:'teacher_workspaces',filter:'user_id=eq.'+user.id},()=>scheduleSync(0))
        .subscribe(status=>{if(status==='SUBSCRIBED')scheduleSync(0);});
    }
    scheduleSync(0);
  }

  function explain(error){
    const text=String(error?.message||error);
    if(/Invalid login credentials/i.test(text))return 'Email 或密碼不正確。';
    if(/Email not confirmed/i.test(text))return '請先到信箱點選驗證連結，再回來登入。';
    if(/rate limit|too many/i.test(text))return '操作次數較多，請稍候再試。';
    if(/email address.*invalid/i.test(text))return '請輸入有效的 Email。';
    if(/email.*sending|smtp|email address not authorized/i.test(text))return '驗證信未寄出，請聯絡管理者檢查寄信服務。';
    if(/teacher_workspaces|schema cache|42P01|PGRST205/i.test(text))return '帳號已連線，但雲端資料表尚未完成設定，請聯絡管理者。';
    if(/fetch|network|timeout|abort/i.test(text))return '連線未完成，請檢查網路後重試。本機資料仍保留。';
    return text;
  }
  function busy(value){
    working=value;A.busy=value;
    for(const el of dialog.querySelectorAll('button,input'))el.disabled=value;
    $('app').inert=value||!A.ready;
    window.RatingBridge?.refreshAccess();
    if(!value&&!A.owner)RatingBridge.resumeGoogle();
  }
  function open(){if(!dialog.open)dialog.showModal();update();}
  function close(){if(A.ready&&!working){dialog.close();$('btn-data').focus();}}
  function setMode(value){
    mode=value;const reset=value==='reset',signup=value==='signup',forgot=value==='forgot';
    $('account-form').name=reset?'reset-password':signup?'sign-up':forgot?'recover-account':'sign-in';
    $('account-email').autocomplete=forgot?'email':'username';
    $('account-title').textContent=reset?'設定新密碼':signup?'建立老師帳號':forgot?'重設密碼':'登入帳號';
    $('account-submit').textContent=reset?'儲存新密碼':signup?'註冊帳號':forgot?'寄送重設連結':'登入';
    $('account-email-label').hidden=reset;$('account-email').required=!reset;
    $('account-password-label').hidden=forgot;$('account-password').required=!forgot;
    $('account-password').minLength=signup||reset?8:1;
    $('account-password').autocomplete=signup||reset?'new-password':'current-password';
    $('account-password').value='';
    $('account-switch').textContent=signup||forgot?'已有帳號，返回登入':'建立新帳號';
    $('account-switch').hidden=reset;$('account-forgot').hidden=forgot||reset;
    message('');update();
  }
  function update(){
    const signed=!!user && user.id===A.owner;
    $('account-form').hidden=signed&&mode!=='reset';
    $('account-login-links').hidden=signed||mode==='reset';
    $('account-workspace').hidden=!signed||mode==='reset';
    $('account-identity').textContent=signed?user.email:'';
    if(signed&&mode!=='reset')$('account-title').textContent='我的帳號';
    $('account-entry-title').textContent='系統帳號';
    $('account-entry-detail').textContent=signed?user.email:'登入後切換為系統帳號同步';
    $('account-exit').hidden=!A.owner;
    $('account-close').hidden=!A.ready;
    $('account-help').textContent=signed?'登入後自動儲存，多個分頁與裝置都能接續使用。':'登入後只使用系統帳號同步，Google 試算表同步會停止。原有的本機資料與 Google 設定會保留，不會自動加入帳號。';
    updateStatus();
  }
  function updateStatus(){
    const signed=user&&user.id===A.owner;
    const accountMode=!!A.owner;
    $('btn-account').setAttribute('aria-pressed',String(accountMode));
    $('btn-gsheet').setAttribute('aria-pressed',String(!accountMode));
    $('google-entry-detail').textContent=accountMode?'切換前會先登出帳號':'使用試算表上傳與下載';
    const labels={loading:'載入雲端中…',syncing:'同步中…',pending:'待同步',saved:'已同步',empty:'自動同步已就緒',receiving:'有更新，待目前操作完成',conflict:'版本衝突',error:'同步失敗，待重試'};
    const readonly=window.RatingBridge?.isReadonly?.()===true;
    const text=signed?(readonly?'另一分頁使用中':labels[syncState]||'待同步'):(A.owner?'確認登入中…':'未啟用');
    $('account-status').textContent=text;$('account-status').dataset.pending=String(signed&&!['saved','empty'].includes(syncState));
    $('account-status').dataset.kind=['error','conflict'].includes(syncState)?'error':['saved','empty'].includes(syncState)?'saved':'pending';
    if(signed){
      $('account-check').hidden=!['error','conflict'].includes(syncState);
      $('account-cloud-summary').textContent=syncError||text+(syncedAt?' · '+new Date(syncedAt).toLocaleTimeString('zh-TW'):'');
      const local=$('save-local-status'),summary=$('data-status');
      if(!['error','pending'].includes(local?.dataset.kind)&&local?.textContent!=='唯讀視窗'){
        summary.textContent=text;summary.dataset.kind=$('account-status').dataset.kind;
        summary.title='系統帳號同步：'+text;
      }
    }
  }
  function saveBeforeSwitch(){
    RatingBridge.assertCanSwitch();
    if(A.ready&&window.RatingBridge&&!RatingBridge.isReadonly()&&!RatingBridge.flush())throw Error('本機儲存尚未完成，請先下載完整備份或重試儲存。');
  }
  function switchOwner(id){
    saveBeforeSwitch();RatingBridge.cancelGoogle();A.ready=false;$('app').inert=true;
    document.documentElement.dataset.accountPending='true';
    RatingRememberOwner(id);sessionStorage.setItem('rating-owner',id);
    // Keep submitted values until successful navigation so the browser can save credentials.
    $('account-form').hidden=true;location.reload();
  }
  async function verify(){
    const ticket=++epoch;
    const {data,error}=await client.auth.getSession();if(error)throw error;
    if(!data.session){
      user=null;
      if(A.owner){A.ready=false;$('app').inert=true;document.documentElement.dataset.accountPending='true';RatingBridge.refreshAccess();open();message('登入已失效，請重新登入；也可以返回未登入的本機空間。');}
      else {A.ready=true;RatingBridge.refreshAccess();update();}
      return;
    }
    const result=await client.auth.getUser();if(result.error)throw result.error;
    if(ticket!==epoch)return;
    user=result.data.user;
    if(user.id!==A.owner){switchOwner(user.id);return;}
    A.ready=true;RatingRememberOwner(user.id);delete document.documentElement.dataset.accountPending;$('app').inert=false;
    RatingBridge.refreshAccess();
    if(sessionStorage.getItem('rating-recovery')){mode='reset';open();setMode('reset');}
    update();startSync();
  }
  async function authenticated(){
    if(!client||!A.ready||!user||user.id!==A.owner)throw Error('請先登入帳號。');
    const expected=user.id;
    const {data,error}=await client.auth.getUser();if(error)throw error;
    if(data.user.id!==expected||expected!==A.owner)throw Error('帳號已變更，請重新登入。');
    return expected;
  }
  async function getCloud(uid){
    const {data,error}=await client.from('teacher_workspaces').select('payload,revision,updated_at').eq('user_id',uid).maybeSingle();
    if(error)throw error;
    return data;
  }
  async function run(action){
    if(working)return;
    working=true;
    if(syncPromise)await syncPromise;
    try{busy(true);await action();}catch(e){message(explain(e),true);}finally{busy(false);update();}
  }
  $('btn-account').onclick=open;
  $('account-close').onclick=close;
  dialog.addEventListener('close',()=>{if(A.ready)$('btn-data').focus();});
  dialog.addEventListener('cancel',e=>{if(!A.ready||working)e.preventDefault();});
  $('account-switch').onclick=()=>setMode(mode==='login'?'signup':'login');
  $('account-forgot').onclick=()=>setMode('forgot');
  $('account-form').onsubmit=e=>{
    e.preventDefault();run(async()=>{
      if(!client)throw Error('登入元件未載入，請重新整理頁面。');
      const email=$('account-email').value.trim(),password=$('account-password').value;
      if(mode==='signup'){
        saveBeforeSwitch();
        const {data,error}=await client.auth.signUp({email,password,options:{emailRedirectTo:redirect}});if(error)throw error;
        if(data.session)await verify();else {
          $('account-password').value='';
          message('註冊申請已送出。請到信箱查看驗證信；若已註冊，請直接登入或重設密碼。');
        }
      }else if(mode==='forgot'){
        const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:redirect});if(error)throw error;
        message('重設申請已送出。若此 Email 已註冊，請到信箱查看重設連結。');
      }else if(mode==='reset'){
        const {error}=await client.auth.updateUser({password});if(error)throw error;
        sessionStorage.removeItem('rating-recovery');setMode('login');message('密碼已更新。');
      }else{
        saveBeforeSwitch();
        const {error}=await client.auth.signInWithPassword({email,password});if(error)throw error;
        await verify();
      }
    });
  };
  function leaveAccount(toGoogle=false){return run(async()=>{
    saveBeforeSwitch();
    const question=toGoogle?'切換為 Google 試算表同步？系統會先登出帳號，再返回原本的 Google 試算表／本機空間。尚未上傳的帳號資料會保留，下次登入可繼續同步。':'登出並返回未登入的本機空間？尚未上傳的資料仍保留在此瀏覽器的帳號空間。';
    if(!confirm(question))return;
    if(toGoogle)sessionStorage.setItem('rating-open-google','1');
    stopped=true;clearTimeout(syncTimer);if(channel)client.removeChannel(channel);
    // Local sign-out also works offline; don't leave credentials on this tab.
    try{await client?.auth.signOut({scope:'local'});}catch{}
    RatingAuthStorage.removeItem('rating-auth');RatingRememberOwner('');
    sessionStorage.removeItem('rating-auth');
    sessionStorage.removeItem('rating-owner');sessionStorage.removeItem('rating-recovery');
    location.reload();
  });}
  $('account-exit').onclick=()=>leaveAccount();
  A.switchToGoogle=()=>leaveAccount(true);
  $('account-check').onclick=()=>{syncNow();};
  $('account-backup').onclick=()=>RatingBridge.backup();
  $('account-upload').onclick=()=>run(async()=>{
    const uid=await authenticated();RatingBridge.assertWritable();
    if(!RatingBridge.flush())throw Error('本機儲存失敗，請先重試儲存。');
    const payload=RatingBridge.snapshot(),localRevision=RatingBridge.revision(),m=readMeta();
    if(new Blob([JSON.stringify(payload)]).size>50*1024*1024)throw Error('資料超過單次上傳的 50 MB 限制。');
    cloud=await getCloud(uid);
    // A missing/lost response never grants permission to overwrite a newer row.
    if(cloud && cloud.revision!==m?.remoteRevision)throw Error('雲端有尚未下載的版本。請先下載完整本機備份，再下載雲端資料核對；尚未覆寫雲端。');
    if(!confirm('將目前帳號的全部班級與教學資料上傳至雲端？'))return;
    await writeCloud(uid,payload,localRevision,cloud);paintSync('saved');
    message('已上傳此帳號的完整資料。');
  });
  $('account-download').onclick=()=>run(async()=>{
    const uid=await authenticated();RatingBridge.assertWritable();
    const beforeRevision=RatingBridge.revision();cloud=await getCloud(uid);
    if(!cloud)throw Error('此帳號尚無雲端資料。');
    const checked=RatingBridge.validate(cloud.payload);
    if(!confirm('下載將取代目前帳號的本機資料。系統會先保留下載前的完整備份。是否繼續？'))return;
    RatingBridge.assertWritable();
    if(uid!==A.owner||beforeRevision!==RatingBridge.revision())throw Error('下載期間本機資料已變更，請重新下載。');
    RatingBridge.restore(checked);
    RatingStorage.setItem(metaKey,JSON.stringify({remoteRevision:cloud.revision,localRevision:RatingBridge.revision()}));
    paintSync('saved');message('已下載雲端資料，自動同步已恢復。');
  });
  A.changed=()=>{if(live()){paintSync('pending');scheduleSync();}};
  A.renderStatus=updateStatus;
  window.addEventListener('online',()=>{if(A.owner&&!A.ready)verify().catch(e=>message(explain(e),true));});
  setInterval(()=>{if(document.visibilityState==='visible'&&live())scheduleSync(0);},15000);
  window.addEventListener('focus',()=>scheduleSync(0));
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')scheduleSync(0);});
  window.addEventListener('online',()=>scheduleSync(0));
  setMode('login');
  if(!A.owner&&sessionStorage.getItem('rating-open-google')){
    sessionStorage.removeItem('rating-open-google');RatingBridge.openGoogle();
  }
  try{
    if(!window.supabase)throw Error('登入元件未載入，請重新整理頁面。');
    client=supabase.createClient(PROJECT_URL,KEY,{auth:{storage:window.RatingAuthStorage,storageKey:'rating-auth',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true},global:{fetch:(url,options)=>fetch(url,{...options,signal:options?.signal||AbortSignal.timeout(20000)})}});
    client.auth.onAuthStateChange((event)=>{
      if(event==='SIGNED_OUT')RatingRememberOwner('');
      if(event==='PASSWORD_RECOVERY')sessionStorage.setItem('rating-recovery','1');
      if(['SIGNED_IN','SIGNED_OUT','PASSWORD_RECOVERY'].includes(event))setTimeout(()=>verify().catch(e=>{open();message(explain(e),true);}),0);
    });
    verify().catch(e=>{if(A.owner)open();message(explain(e),true);});
  }catch(e){if(A.owner)open();message(explain(e),true);}
})();
