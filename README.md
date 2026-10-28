# অফিস যাবো, ভাই! (V5)

ঢাকার সকালের রাশ: ১০টায় অফিস, ৮:৩০-এ ক্লাস। ৬টা বাসা, ১০টা অফিস/ক্যাম্পাস — আসল OpenStreetMap রাস্তা ধরে।
বাস চালাও (যাত্রী তোলো, রাইভাল বাসকে হারাও), রিকশা চালিয়ে মেট্রো ধরো, দৌড়ে লাফিয়ে কয়েন কুড়াও, বাইক-গাড়ি-সিএনজি-সাইকেল।
COMBO, Daily Missions, Garage, অনলাইন Leaderboard।

## খেলো
`index.html` আর `audio/` ফোল্ডার একসাথে রাখো (মিউজিক `audio/` থেকে আসে)। GitHub Pages / Cloudflare Pages-এ সরাসরি চলে।

## সোর্স থেকে বানাও
```
npm install
npm run build      # src/ + sfx/ → dist/index.html → index.html
```

| ফোল্ডার/ফাইল | কী আছে |
|---|---|
| `src/` | গেমের কোড (নাম অনুযায়ী ক্রমে জোড়া লাগে) |
| `sfx/` | সাউন্ড ইফেক্ট (build-এ index.html-এর ভেতরে ঢুকে যায়) |
| `audio/` | মিউজিক (আলাদা ফাইল, খেলার সময় লোড হয়) |
| `tests/` | Playwright অটো-টেস্ট |
| `leaderboard.sql` | Supabase লিডারবোর্ড টেবিল |

## ক্রেডিট
- রাস্তার তথ্য: © OpenStreetMap contributors (ODbL)
- মিউজিক (CC0): Komiku, HinaCC0, Bauchamp (SoundSafari CC0 corpus), OpenLo-Fi
- সাউন্ড ইফেক্ট (CC0): Kenney.nl, public-domain SFX packs
