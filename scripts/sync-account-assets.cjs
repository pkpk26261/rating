// Keep the startup-critical storage adapter in the HTML and pin all other account assets.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const storage=(fs.readFileSync(path.join(root,'vendor/lz-string-1.5.0.min.js'),'utf8')+'\n'+fs.readFileSync(path.join(root,'account/storage.js'),'utf8')).replace(/<\/script/gi,'<\\/script');
const inline='<!-- BEGIN ACCOUNT STORAGE BOOTSTRAP -->\n<script>\n'+storage+'\n</script>\n<!-- END ACCOUNT STORAGE BOOTSTRAP -->';
html=html.includes('<!-- BEGIN ACCOUNT STORAGE BOOTSTRAP -->')?html.replace(/<!-- BEGIN ACCOUNT STORAGE BOOTSTRAP -->[\s\S]*?<!-- END ACCOUNT STORAGE BOOTSTRAP -->/,()=>inline):html.replace(/<script src="account\/storage\.js(?:\?[^\"]*)?"><\/script>/,()=>inline);
for(const file of ['account/account.css','account/sync-policy.js','account/account.js','vendor/supabase-2.116.0.js']){
 const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex').slice(0,16);
 const escaped=file.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 html=html.replace(new RegExp('(["\\\'])'+escaped+'(?:\\?[^"\\\']*)?(["\\\'])','g'),(_,a,b)=>a+file+'?v='+hash+b);
}
fs.writeFileSync(path.join(root,'index.html'),html);
console.log('Account bootstrap embedded; asset URLs pinned to their contents.');
