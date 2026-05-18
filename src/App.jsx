import { useState, useCallback } from "react";

// BANGLADESH-SPECIFIC SCENE TYPES (May 2026 Trending)
const DESHI_SCENES = [
  { id: "90s_village_night", label: "৯০'স গ্রামের রাত", labelEn: "90s Village Night", icon: "🌙", trend: "🔥" },
  { id: "monsoon_nostalgia", label: "বর্ষার নস্টালজিয়া", labelEn: "Monsoon Nostalgia", icon: "🌧️", trend: "🔥" },
  { id: "pond_childhood", label: "পুকুরপাড়ের শৈশব", labelEn: "Pond Childhood", icon: "🐟", trend: "✨" },
  { id: "khas_land_farming", label: "খাস জমিতে চাষ", labelEn: "Village Farming", icon: "🌾", trend: "✨" },
  { id: "clay_house_life", label: "মাটির ঘরের জীবন", labelEn: "Clay House Life", icon: "🏡", trend: "🔥" },
  { id: "kerosene_lamp", label: "কেরোসিন বাতি রাত", labelEn: "Kerosene Lamp Night", icon: "🪔", trend: "✨" },
  { id: "village_market", label: "হাটবাজার দৃশ্য", labelEn: "Village Market", icon: "🧺", trend: "" },
  { id: "boat_journey", label: "নৌকা ভ্রমণ", labelEn: "Boat Journey", icon: "⛵", trend: "" },
  { id: "harvesting_paddy", label: "ধান কাটা মৌসুম", labelEn: "Harvesting Season", icon: "🌾", trend: "✨" },
  { id: "rooftop_stargazing", label: "ছাদে তারা দেখা", labelEn: "Rooftop Stargazing", icon: "⭐", trend: "🔥" },
  { id: "hand_fan_summer", label: "হাতপাখা গরম", labelEn: "Hand Fan Summer", icon: "🪭", trend: "" },
  { id: "village_wedding", label: "গ্রামীণ বিয়ে", labelEn: "Village Wedding", icon: "💐", trend: "" },
];

// BANGLADESH REGIONS (2026)
const BD_REGIONS = [
  "গ্রামীণ বাংলাদেশ (Rural Bangladesh)",
  "সিলেট অঞ্চল (Sylhet Region)",
  "চট্টগ্রাম পাহাড়ী এলাকা (Chittagong Hills)",
  "কুষ্টিয়া-যশোর (Kushtia-Jessore)",
  "ময়মনসিংহ (Mymensingh)",
  "বরিশাল নদী এলাকা (Barisal River Region)",
  "রংপুর-দিনাজপুর (Rangpur-Dinajpur)",
  "বেঙ্গল ডেল্টা (Bengal Delta)",
];

// ART STYLES (Ghibli-focused for Bangladesh)
const ART_STYLES = [
  { id: "ghibli_bangla", label: "Ghibli Bengali Style", color: "#4a9eff", desc: "Studio Ghibli meets rural Bangladesh" },
  { id: "watercolor_nostalgic", label: "Nostalgic Watercolor", color: "#7ec8a0", desc: "Soft, dreamy village memories" },
  { id: "vintage_postcard", label: "Vintage Postcard", color: "#e8a045", desc: "1980s Bangladesh photo aesthetic" },
  { id: "oil_painting", label: "Oil Painting Classic", color: "#d4876a", desc: "Rich, warm, hand-painted feel" },
];

// TIMES OF DAY (Bangladesh-specific)
const BD_TIMES = [
  "ভোরের সোনালি আলো (Golden Dawn)",
  "দুপুরের খরতাপ (Noon Heat)",
  "বিকেলের মিষ্টি আলো (Sweet Afternoon)",
  "সন্ধ্যার ধোঁয়া (Evening Smoke)",
  "রাতের জোছনা (Moonlit Night)",
  "মধ্যরাতের নিস্তব্ধতা (Midnight Silence)",
];

// 2026 TRENDING HASHTAGS (Bangladesh-specific)
const BD_HASHTAGS_2026 = {
  base: [
    "#DeshiNostalgia", "#গ্রামবাংলা", "#BangladeshVillageLife", "#90sChildhoodBD",
    "#RuralBangladesh", "#বাংলারগ্রাম", "#NostalgicBangladesh", "#দেশিশৈশব",
    "#BanglaHeritage", "#গ্রামীণজীবন"
  ],
  ghibli: [
    "#GhibliBangladesh", "#AnimeVillage", "#GhibliStyleBD", "#বাংলাদেশীAnime",
    "#StudioGhibliAesthetic", "#AnimatedBangladesh"
  ],
  trending_may_2026: [
    "#ReelsViral", "#TikTokBangladesh", "#BDTikTok", "#ShortsViral",
    "#InstagramReelsBD", "#YouTubeShortsঢাকা", "#ViralBD2026"
  ],
  emotional: [
    "#EmotionalBangladesh", "#MissMyVillage", "#গ্রামেরটান", "#ChildhoodMemories",
    "#SimpleLivingBD", "#PureBangladesh"
  ],
  nature: [
    "#BangladeshNature", "#VillageScenery", "#বাংলারপ্রকৃতি", "#RuralBeauty",
    "#BengalDelta", "#MonsoonBangladesh"
  ],
};

// CURRENT VIRAL CAPTION STYLES (May 2026)
const CAPTION_STYLES = [
  "emotional_nostalgic",
  "question_hook",
  "relatable_pain",
  "storytelling",
];

function SceneButton({ scene, selected, onClick }) {
  return (
    <button
      onClick={() => onClick(scene.id)}
      style={{
        background: selected ? "rgba(255,200,100,0.18)" : "rgba(255,255,255,0.04)",
        border: selected ? "2px solid #f5c842" : "1.5px solid rgba(255,255,255,0.1)",
        borderRadius: "14px",
        padding: "14px 10px",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        color: selected ? "#f5c842" : "#ccc",
        fontSize: "11px",
        fontFamily: "'Hind Siliguri', sans-serif",
        textAlign: "center",
        position: "relative",
      }}
    >
      {scene.trend && (
        <span style={{ position: "absolute", top: "4px", right: "4px", fontSize: "12px" }}>
          {scene.trend}
        </span>
      )}
      <span style={{ fontSize: "24px" }}>{scene.icon}</span>
      <span style={{ fontSize: "10px", opacity: 0.9 }}>{scene.label}</span>
      <span style={{ fontSize: "9px", opacity: 0.6 }}>{scene.labelEn}</span>
    </button>
  );
}

function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      style={{
        background: copied ? "#2d6a3f" : "rgba(245,200,66,0.15)",
        border: "1px solid #f5c842",
        color: copied ? "#7ec8a0" : "#f5c842",
        borderRadius: "8px",
        padding: "8px 16px",
        cursor: "pointer",
        fontSize: "12px",
        fontFamily: "'Hind Siliguri', sans-serif",
        fontWeight: "600",
        transition: "all 0.2s",
      }}
    >
      {copied ? "✓ কপি হয়েছে!" : label}
    </button>
  );
}

export default function App() {
  const [selectedScene, setSelectedScene] = useState("90s_village_night");
  const [selectedStyle, setSelectedStyle] = useState("ghibli_bangla");
  const [selectedTime, setSelectedTime] = useState("রাতের জোছনা (Moonlit Night)");
  const [selectedRegion, setSelectedRegion] = useState("গ্রামীণ বাংলাদেশ (Rural Bangladesh)");
  const [customDetails, setCustomDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("generator");

  const generate = useCallback(() => {
    setLoading(true);
    setResult(null);

    // Simulate generation (replace with actual API call if needed)
    setTimeout(() => {
      const scene = DESHI_SCENES.find(s => s.id === selectedScene);
      const style = ART_STYLES.find(s => s.id === selectedStyle);
      
      // GENERATE VIDEO PROMPT (Optimized for Wan2.1/Veo3/Kling)
      const videoPrompt = `${style.desc}, ${scene.labelEn.toLowerCase()} scene, ${selectedRegion.match(/\(([^)]+)\)/)[1]}, ${selectedTime.match(/\(([^)]+)\)/)[1]}, 1990s Bangladesh era, no electricity, no modern technology visible, warm nostalgic atmosphere, hand-drawn animation style, cinematic composition, vertical 9:16 aspect ratio, smooth camera movement, soft lighting, peaceful countryside ambiance, cultural authenticity, emotional storytelling, high quality 4K, ${customDetails || "traditional village life details"}`;

      // GENERATE ENHANCED PROMPT (AI-optimized)
      const enhancedPrompt = `ULTRA-DETAILED VIDEO PROMPT:
Style: ${style.label} - ${style.desc}
Scene: ${scene.labelEn} (${scene.label})
Setting: ${selectedRegion}, ${selectedTime}
Era: 1980s-1990s Pre-electricity Bangladesh

VISUAL DETAILS:
- Camera: Slow pan or static wide shot, cinematic framing
- Lighting: ${selectedTime.includes("Night") ? "Soft moonlight, kerosene lamp glow, starlight" : "Golden hour sunlight, soft shadows, warm tones"}
- Characters: Traditional Bangladeshi clothing (lungi, saree, gamcha), natural expressions
- Environment: Clay houses, thatched roofs, bamboo structures, natural vegetation
- Atmosphere: Peaceful, nostalgic, emotionally warm, culturally authentic
- Color palette: Earthy browns, deep greens, warm yellows, soft blues
- Details: No modern items, authentic 90s village props, traditional lifestyle elements

TECHNICAL SPECS:
- Aspect Ratio: 9:16 (vertical for Reels/Shorts/TikTok)
- Duration: 5-10 seconds per clip
- Style: ${style.label} anime aesthetic
- Quality: 4K, smooth motion, no glitches
- Mood: Nostalgic, peaceful, emotionally resonant

${customDetails ? `CUSTOM DETAILS: ${customDetails}` : ""}

FINAL PROMPT FOR AI MODEL:
${videoPrompt}`;

      // GENERATE BANGLA CAPTION (May 2026 viral style)
      const captionBangla = generateBanglaCaption(scene, selectedTime);
      
      // GENERATE ENGLISH CAPTION
      const captionEnglish = generateEnglishCaption(scene, selectedTime);

      // GENERATE 30 TRENDING HASHTAGS
      const allHashtags = [
        ...BD_HASHTAGS_2026.base.slice(0, 7),
        ...BD_HASHTAGS_2026.ghibli.slice(0, 4),
        ...BD_HASHTAGS_2026.trending_may_2026,
        ...BD_HASHTAGS_2026.emotional.slice(0, 4),
        ...BD_HASHTAGS_2026.nature.slice(0, 4),
        "#AIArt", "#AIVideo", "#Viral2026"
      ].slice(0, 30);

      setResult({
        videoPrompt,
        enhancedPrompt,
        captionBangla,
        captionEnglish,
        hashtags: allHashtags,
        scene: scene,
        style: style,
      });
      
      setLoading(false);
    }, 1500);
  }, [selectedScene, selectedStyle, selectedTime, selectedRegion, customDetails]);

  // BANGLA CAPTION GENERATOR (2026 Viral Format)
  function generateBanglaCaption(scene, time) {
    const templates = [
      `${scene.label}... মনে পড়ে সেই দিনগুলো? 🥺\n\n${time.split("(")[0]}... যখন জীবন ছিল সহজ, মন ছিল হালকা। কোনো ফোন নাই, কোনো টেনশন নাই। শুধু আমরা আর প্রকৃতি। 🌾✨\n\nকমেন্টে লিখো তোমার কোন মেমোরি সবচেয়ে মিস করো? 💚`,
      
      `এই দৃশ্য দেখে কার চোখে পানি চলে আসলো? 😢\n\n${scene.label}... আর কখনো ফিরবে না সেই দিন। ৯০'স এর বাংলাদেশ ছিল অন্যরকম। সবকিছু ছিল সত্যিকারের। 🏡🌾\n\nTag করো যে এই জীবন মিস করে। 💔`,
      
      `${scene.label} 🌙\n\nযারা শহরে বড় হয়েছো, তারা কখনো বুঝবে না এই অনুভূতি। 🥹\n\nগ্রামের রাত মানে ছিল... শান্তি, প্রশান্তি, নিরাপত্তা। আর এখন? শুধু মিস করা। 💔\n\nDouble tap যদি তুমিও ফিরে যেতে চাও! 🌾`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  // ENGLISH CAPTION GENERATOR (2026 International audience)
  function generateEnglishCaption(scene, time) {
    return `${scene.labelEn} - A time we'll never get back 🥺\n\n${time.split("(")[1].replace(")", "")} in 1990s rural Bangladesh... Life was simple, hearts were pure, and happiness didn't need electricity. 🌾✨\n\nDo you miss these days? Comment your favorite childhood village memory! 💚\n\n---\nAI-generated nostalgic content celebrating Bengali heritage and simpler times. This is what Bangladesh looked like before the digital age. 🇧🇩`;
  }

  const tabs = ["generator", "results"];
  const tabLabels = { generator: "🎨 জেনারেটর", results: "📋 ফলাফল" };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a0d05 0%, #0d1a0a 40%, #1a1205 100%)",
      fontFamily: "'Hind Siliguri', sans-serif",
      color: "#e8dcc8",
      padding: "0",
    }}>
      {/* Grain overlay */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03, pointerEvents: "none", zIndex: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "480px", margin: "0 auto", padding: "0 0 60px" }}>

        {/* Header */}
        <div style={{
          padding: "24px 20px 16px",
          borderBottom: "1px solid rgba(245,200,66,0.15)",
          background: "linear-gradient(135deg, rgba(0,30,15,0.8), rgba(30,20,5,0.8))",
          backdropFilter: "blur(12px)",
          position: "sticky", top: 0, zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <span style={{ fontSize: "32px" }}>🇧🇩</span>
            <div>
              <div style={{ fontSize: "22px", fontWeight: "700", color: "#f5c842", letterSpacing: "-0.5px", fontFamily: "'Noto Serif Bengali', serif" }}>
                DESHI-ART
              </div>
              <div style={{ fontSize: "11px", color: "#8a7a5a", letterSpacing: "0.5px" }}>
                বাংলাদেশী নস্টালজিক কন্টেন্ট জেনারেটর 2026
              </div>
            </div>
          </div>
          
          {/* Live Stats */}
          <div style={{
            display: "flex",
            gap: "12px",
            fontSize: "10px",
            color: "#6a5a3a",
            marginTop: "8px",
            padding: "8px",
            background: "rgba(0,0,0,0.2)",
            borderRadius: "8px",
          }}>
            <span>🔥 71.9M FB Users</span>
            <span>📱 56M TikTok BD</span>
            <span>⚡ 3x Shorts Reach</span>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", marginTop: "14px" }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                flex: 1,
                background: activeTab === tab ? "rgba(245,200,66,0.15)" : "transparent",
                border: "none",
                borderBottom: activeTab === tab ? "2px solid #f5c842" : "2px solid transparent",
                color: activeTab === tab ? "#f5c842" : "#6a5a3a",
                padding: "10px 4px",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "'Hind Siliguri', sans-serif",
                fontWeight: "600",
                transition: "all 0.2s",
              }}>
                {tabLabels[tab]}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: "20px" }}>

          {/* GENERATOR TAB */}
          {activeTab === "generator" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Scene Type */}
              <div>
                <div style={{ fontSize: "14px", color: "#f5c842", marginBottom: "12px", letterSpacing: "0.3px", fontWeight: "600" }}>
                  দৃশ্য নির্বাচন করুন (Scene Type)
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                  {DESHI_SCENES.map(scene => (
                    <SceneButton key={scene.id} scene={scene} selected={selectedScene === scene.id} onClick={setSelectedScene} />
                  ))}
                </div>
              </div>

              {/* Art Style */}
              <div>
                <div style={{ fontSize: "14px", color: "#f5c842", marginBottom: "12px", letterSpacing: "0.3px", fontWeight: "600" }}>
                  শিল্প শৈলী (Art Style)
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {ART_STYLES.map(style => (
                    <button key={style.id} onClick={() => setSelectedStyle(style.id)} style={{
                      background: selectedStyle === style.id ? `${style.color}22` : "rgba(255,255,255,0.04)",
                      border: `1.5px solid ${selectedStyle === style.id ? style.color : "rgba(255,255,255,0.1)"}`,
                      color: selectedStyle === style.id ? style.color : "#999",
                      borderRadius: "12px", padding: "14px 16px", cursor: "pointer",
                      fontSize: "13px", fontFamily: "'Hind Siliguri', sans-serif",
                      transition: "all 0.2s",
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}>
                      <span style={{ fontWeight: "700" }}>{style.label}</span>
                      <span style={{ fontSize: "11px", opacity: 0.7 }}>{style.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time & Region */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "14px" }}>
                <div>
                  <div style={{ fontSize: "13px", color: "#f5c842", marginBottom: "10px", fontWeight: "600" }}>সময় (Time of Day)</div>
                  <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)} style={{
                    width: "100%", background: "#1a1205", border: "1px solid rgba(245,200,66,0.3)",
                    borderRadius: "10px", color: "#e8dcc8", padding: "12px", fontSize: "13px",
                    fontFamily: "'Hind Siliguri', sans-serif",
                  }}>
                    {BD_TIMES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "#f5c842", marginBottom: "10px", fontWeight: "600" }}>অঞ্চল (Region)</div>
                  <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)} style={{
                    width: "100%", background: "#1a1205", border: "1px solid rgba(245,200,66,0.3)",
                    borderRadius: "10px", color: "#e8dcc8", padding: "12px", fontSize: "13px",
                    fontFamily: "'Hind Siliguri', sans-serif",
                  }}>
                    {BD_REGIONS.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              {/* Custom Details */}
              <div>
                <div style={{ fontSize: "13px", color: "#f5c842", marginBottom: "10px", fontWeight: "600" }}>
                  বিশেষ বিবরণ (Optional Custom Details)
                </div>
                <textarea
                  value={customDetails}
                  onChange={e => setCustomDetails(e.target.value)}
                  placeholder="যেমন: পুকুরে পদ্ম ফুল, নারকেল গাছ, মাটির চুলা..."
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(245,200,66,0.25)", borderRadius: "12px",
                    color: "#e8dcc8", padding: "12px", fontSize: "13px",
                    fontFamily: "'Hind Siliguri', sans-serif", resize: "vertical", minHeight: "80px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={generate}
                disabled={loading}
                style={{
                  width: "100%",
                  background: loading ? "rgba(245,200,66,0.08)" : "linear-gradient(135deg, #c8960a, #f5c842)",
                  border: "none",
                  borderRadius: "16px",
                  color: loading ? "#6a5a3a" : "#1a0f00",
                  padding: "18px",
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "'Hind Siliguri', sans-serif",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s",
                  letterSpacing: "0.3px",
                  boxShadow: loading ? "none" : "0 4px 24px rgba(245,200,66,0.3)",
                }}
              >
                {loading ? "⏳ তৈরি হচ্ছে..." : "🎬 প্রম্পট জেনারেট করুন"}
              </button>

              {/* Info Box */}
              <div style={{
                background: "rgba(74,158,255,0.06)",
                border: "1px solid rgba(74,158,255,0.2)",
                borderRadius: "14px",
                padding: "16px",
                fontSize: "12px",
                color: "#9ab",
                lineHeight: "1.7",
              }}>
                <div style={{ color: "#4a9eff", fontWeight: "700", marginBottom: "8px" }}>
                  💡 বাংলাদেশ-স্পেসিফিক টিপস (May 2026)
                </div>
                • বাংলা ক্যাপশন 40-60% বেশি engagement পায়<br/>
                • Shorts/Reels স্ট্যাটিক পোস্টের চেয়ে 3x reach পায়<br/>
                • 30 সেকেন্ডের নিচে ভিডিও সবচেয়ে ভাইরাল হয়<br/>
                • Nostalgic কন্টেন্ট এখন TikTok BD তে ট্রেন্ডিং 🔥<br/>
                • সন্ধ্যা 8-11 PM পোস্ট করলে সবচেয়ে ভালো reach
              </div>

            </div>
          )}

          {/* RESULTS TAB */}
          {activeTab === "results" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {!result ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "#6a5a3a" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🇧🇩</div>
                  <div style={{ fontSize: "15px", marginBottom: "8px" }}>প্রথমে একটি প্রম্পট তৈরি করুন</div>
                  <div style={{ fontSize: "12px", opacity: 0.7 }}>Generate a prompt first from the Generator tab</div>
                  <button onClick={() => setActiveTab("generator")} style={{
                    marginTop: "20px", background: "transparent", border: "1px solid #f5c842",
                    color: "#f5c842", borderRadius: "10px", padding: "10px 24px", cursor: "pointer",
                    fontFamily: "'Hind Siliguri', sans-serif", fontSize: "13px", fontWeight: "600",
                  }}>← জেনারেটরে যান</button>
                </div>
              ) : (
                <>
                  {/* Scene Info */}
                  <div style={{
                    background: "linear-gradient(135deg, rgba(245,200,66,0.12), rgba(245,200,66,0.06))",
                    borderRadius: "14px", padding: "16px",
                    border: "1px solid rgba(245,200,66,0.3)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <span style={{ fontSize: "32px" }}>{result.scene.icon}</span>
                      <div>
                        <div style={{ fontSize: "16px", fontWeight: "700", color: "#f5c842" }}>
                          {result.scene.label}
                        </div>
                        <div style={{ fontSize: "12px", color: "#8a7a5a" }}>
                          {result.style.label} Style
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Prompt (Basic) */}
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(126,200,160,0.3)",
                    borderRadius: "14px", padding: "16px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ fontSize: "14px", color: "#7ec8a0", fontWeight: "700" }}>
                        🎥 Video Prompt (Basic)
                      </div>
                      <CopyButton text={result.videoPrompt} label="কপি করুন" />
                    </div>
                    <div style={{
                      fontSize: "12px", color: "#ccc", lineHeight: "1.7",
                      background: "rgba(0,0,0,0.3)", borderRadius: "10px", padding: "12px",
                      fontFamily: "monospace",
                    }}>
                      {result.videoPrompt}
                    </div>
                  </div>

                  {/* Enhanced Prompt */}
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(74,158,255,0.3)",
                    borderRadius: "14px", padding: "16px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ fontSize: "14px", color: "#4a9eff", fontWeight: "700" }}>
                        ✨ Enhanced Prompt (AI-Optimized)
                      </div>
                      <CopyButton text={result.enhancedPrompt} label="কপি করুন" />
                    </div>
                    <div style={{
                      fontSize: "11px", color: "#ccc", lineHeight: "1.7",
                      background: "rgba(0,0,0,0.3)", borderRadius: "10px", padding: "12px",
                      maxHeight: "300px", overflowY: "auto",
                      fontFamily: "monospace",
                      whiteSpace: "pre-wrap",
                    }}>
                      {result.enhancedPrompt}
                    </div>
                  </div>

                  {/* Bangla Caption */}
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(245,200,66,0.3)",
                    borderRadius: "14px", padding: "16px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ fontSize: "14px", color: "#f5c842", fontWeight: "700" }}>
                        🇧🇩 বাংলা ক্যাপশন (Bangla Caption)
                      </div>
                      <CopyButton text={result.captionBangla} label="কপি করুন" />
                    </div>
                    <div style={{
                      fontSize: "13px", color: "#e8dcc8", lineHeight: "1.8",
                      fontFamily: "'Noto Serif Bengali', serif",
                      whiteSpace: "pre-wrap",
                    }}>
                      {result.captionBangla}
                    </div>
                  </div>

                  {/* English Caption */}
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "14px", padding: "16px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ fontSize: "14px", color: "#ccc", fontWeight: "700" }}>
                        🌍 English Caption
                      </div>
                      <CopyButton text={result.captionEnglish} label="Copy" />
                    </div>
                    <div style={{
                      fontSize: "13px", color: "#ccc", lineHeight: "1.8",
                      whiteSpace: "pre-wrap",
                    }}>
                      {result.captionEnglish}
                    </div>
                  </div>

                  {/* Hashtags */}
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "14px", padding: "16px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ fontSize: "14px", color: "#f5c842", fontWeight: "700" }}>
                        🏷️ Trending Hashtags ({result.hashtags.length})
                      </div>
                      <CopyButton text={result.hashtags.join(" ")} label="সব কপি করুন" />
                    </div>
                    <div style={{ lineHeight: "2", fontSize: "12px" }}>
                      {result.hashtags.map((tag, i) => (
                        <span key={i} style={{
                          display: "inline-block",
                          background: i < 10 ? "rgba(245,200,66,0.15)" : "rgba(74,158,255,0.1)",
                          border: `1px solid ${i < 10 ? "#f5c84255" : "#4a9eff44"}`,
                          color: i < 10 ? "#f5c842" : "#4a9eff",
                          borderRadius: "20px",
                          padding: "4px 12px",
                          margin: "4px",
                          fontSize: "11px",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Action */}
                  <div style={{
                    background: "rgba(126,200,160,0.08)",
                    border: "1px solid rgba(126,200,160,0.3)",
                    borderRadius: "14px",
                    padding: "16px",
                  }}>
                    <div style={{ fontSize: "14px", color: "#7ec8a0", fontWeight: "700", marginBottom: "10px" }}>
                      ⚡ পরবর্তী ধাপ (Next Steps)
                    </div>
                    <div style={{ fontSize: "12px", color: "#9ab", lineHeight: "1.8" }}>
                      1️⃣ "Video Prompt" কপি করুন<br/>
                      2️⃣ Google Vids/Wan2.1/Veo3 তে paste করুন<br/>
                      3️⃣ Video generate হওয়ার পর download করুন<br/>
                      4️⃣ CapCut এ বাংলা ক্যাপশন add করুন<br/>
                      5️⃣ TikTok/Reels/Shorts এ hashtags সহ upload করুন<br/>
                      6️⃣ সন্ধ্যা 8-11 PM এ post করুন সবচেয়ে ভালো reach এর জন্য! 🚀
                    </div>
                  </div>

                  {/* Generate Another */}
                  <button onClick={() => setActiveTab("generator")} style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #7ec8a0, #4a9eff)",
                    border: "none",
                    borderRadius: "14px",
                    color: "#0a0d05",
                    padding: "16px",
                    fontSize: "15px",
                    fontWeight: "700",
                    fontFamily: "'Hind Siliguri', sans-serif",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(126,200,160,0.3)",
                  }}>
                    🔄 আরেকটি তৈরি করুন (Generate Another)
                  </button>
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
