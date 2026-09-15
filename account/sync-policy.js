/* Pure conflict decision shared by browser and focused tests. */
(function(root){
  function decide({revision,hasLocal,meta,remote}){
    if(meta?.pending && remote?.revision===meta.pending.remoteRevision)return 'acknowledge';
    const dirty=meta ? revision!==meta.localRevision : hasLocal;
    if(!remote)return meta?.remoteRevision?'conflict':dirty?'upload':'idle';
    if(remote.revision===meta?.remoteRevision)return dirty?'upload':'idle';
    if(dirty){
      const other=remote.payload?.accountVersion||remote.payload?.data?.syncRevision||(Date.parse(remote.updated_at)+'-legacy');
      const a=Number(String(revision).split('-')[0]),b=Number(String(other).split('-')[0]);
      if(!Number.isFinite(a)||!Number.isFinite(b)||a<=0||b<=0)return 'conflict';
      return a>b || (a===b && String(revision)>String(other)) ? 'upload' : 'download';
    }
    return 'download';
  }
  if(typeof module==='object'&&module.exports)module.exports={decide};
  else root.RatingSyncPolicy={decide};
})(typeof window==='object'?window:globalThis);
