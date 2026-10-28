/* ============================================================
   14 PROFILE (XP, levels, unlocks, streak) + LEADERBOARD
   Online board: a free Supabase table (fill BOARD_CFG — see the
   setup guide). Without it the board shows your own best runs.
   ============================================================ */
const BOARD_CFG={url:'https://kaiosdcwonadpppwlbtk.supabase.co',key:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthaW9zZGN3b25hZHBwcHdsYnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxOTc5ODcsImV4cCI6MjEwODc3Mzk4N30.cBis9D-4PDBwfIjwdJgziicQtPuZsso7GjGox5N8Og8'};   // ← Supabase project URL ও anon key এখানে বসাও
const LEVELS=[0,150,400,750,1200,1800,2600,3600,5000,7000];
const LV_TITLE=['নতুন যাত্রী','নিয়মিত যাত্রী','জ্যাম-যোদ্ধা','লোকাল বাসের ওস্তাদ','ঢাকার পথিক','সময়ের রাজা','ফুটপাতের ফেলুদা','ঢাকার কিংবদন্তি','অফিসের আইকন','অমর যাত্রী'];
function profile(){const p=store('ojb4-profile')||{};return Object.assign({xp:0,runs:0,onTime:0,days:{},best:{},ach:{}},p);}
function saveProfile(p){store('ojb4-profile',p);}
function levelOf(xp){let l=0;for(let i=0;i<LEVELS.length;i++)if(xp>=LEVELS[i])l=i;return l+1;}
function levelSpan(xp){const l=levelOf(xp),a=LEVELS[l-1],b=LEVELS[l]||a+2000;return{l,a,b,f:clamp((xp-a)/(b-a),0,1)};}
function planUnlocked(pk,p){return levelOf((p||profile()).xp)>=PLANS[pk].lvl;}
function streakOf(p){let s=0;for(let i=0;i<400;i++){const k=dayKeyOffset(-i);if(p.days[k])s++;else if(i>0)break;}return s;}

/* ---------- leaderboard ---------- */
const BOARD={
  online(){return !!(BOARD_CFG.url&&BOARD_CFG.key);},
  headers(){const h={'apikey':BOARD_CFG.key,'Content-Type':'application/json'};/* legacy anon key is a JWT; new sb_publishable_ keys go in apikey only */if(!/^sb_/.test(BOARD_CFG.key))h.Authorization='Bearer '+BOARD_CFG.key;return h;},
  async submit(e){if(!this.online())return false;
    try{const r=await fetch(BOARD_CFG.url.replace(/\/$/,'')+'/rest/v1/scores',{method:'POST',headers:Object.assign(this.headers(),{'Prefer':'return=minimal'}),body:JSON.stringify(e)});return r.ok;}catch(err){return false;}},
  async top(day,track,limit){if(!this.online())return null;
    try{const u=BOARD_CFG.url.replace(/\/$/,'')+'/rest/v1/scores?select=name,score,plan,arrive,stars,pid&day=eq.'+day+'&track=eq.'+track+'&order=score.desc&limit=400';
      const r=await fetch(u,{headers:this.headers()});if(!r.ok)return null;const all=await r.json();
      /* one row per player: their best run today */
      const seen=new Set(),out=[];for(const x of all){if(seen.has(x.pid))continue;seen.add(x.pid);x.name=cleanName(x.name)||'যাত্রী';out.push(x);}return out.slice(0,limit||50);}catch(err){return null;}}};
function playerId(){let id=store('ojb4-pid');if(!id){id=Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4);store('ojb4-pid',id);}return id;}
/* your own runs, kept on this device */
function localRuns(){return store('ojb4-runs')||[];}
function addLocalRun(r){const l=localRuns();l.push(r);l.sort((a,b)=>b.score-a.score);store('ojb4-runs',l.slice(0,60));}
function cleanName(s){return String(s||'').replace(/[<>"'`\\]/g,'').replace(/\s+/g,' ').trim().slice(0,16);}
