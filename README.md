# অফিস যাবো, ভাই! (V4)

ঢাকার সকালের যুদ্ধ: ১০টায় অফিস, ৮:৩০-এ ক্লাস। বাস, ডাবল ডেকার, রিকশা + মেট্রো, সিএনজি, বাইক, গাড়ি বা সাইকেলে সময়মতো পৌঁছাও।
Three.js দিয়ে বানানো, একটা মাত্র HTML ফাইল। ফোন, ট্যাব, ল্যাপটপ, পিসি সবখানে চলে।

## খেলো
`index.html` ব্রাউজারে খোলো, অথবা GitHub Pages / Cloudflare Pages-এ হোস্ট করো।

## সোর্স থেকে বানাও
```
npm install
npm run build      # src/ → dist/index.html → index.html
```

| ফোল্ডার/ফাইল | কী আছে |
|---|---|
| `src/` | গেমের কোড (ক্রম অনুযায়ী জোড়া লাগে) |
| `build.py` | ফন্ট আর three.js ইনলাইন করে একটা HTML বানায় |
| `tests/` | Playwright দিয়ে অটো-টেস্ট |
| `leaderboard.sql` | Supabase লিডারবোর্ড টেবিল |

## অনলাইন লিডারবোর্ড (ঐচ্ছিক)
১. supabase.com-এ প্রজেক্ট খুলে `leaderboard.sql` চালাও
২. `src/14_board.js`-এ `BOARD_CFG`-তে Project URL আর anon key বসাও, তারপর `npm run build`

ম্যাপের তথ্য: © OpenStreetMap contributors
