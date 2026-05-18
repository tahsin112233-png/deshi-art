import { useState, useCallback, useEffect } from "react";

// LANGUAGE SYSTEM
const LANG = {
  en: {
    title: "DESHI-ART",
    subtitle: "Bangladesh Nostalgic Content Generator 2026",
    tabs: {
      generator: "🎨 Generator",
      apiKeys: "🔑 API Keys",
      results: "📋 Results"
    },
    sceneType: "Scene Type",
    artStyle: "Art Style",
    timeOfDay: "Time of Day",
    region: "Region",
    customDetails: "Custom Details (Optional)",
    customPlaceholder: "e.g., lotus flowers in pond, coconut trees, clay stove...",
    generateBtn: "🎬 Generate Advanced Prompts",
    generating: "⏳ Generating with AI...",
    apiKeyTitle: "API Key Configuration",
    apiKeySaved: "✅ API key saved!",
    apiKeyPlaceholder: "Enter your API key...",
    saveKey: "Save Key",
    statsLabel: "Bangladesh Social Media Stats (2026)",
    tipsTitle: "💡 Bangladesh-Specific Tips (May 2026)",
    tips: [
      "Bangla captions get 40-60% more engagement",
      "Shorts/Reels get 3x reach vs static posts",
      "Videos under 30 seconds go viral fastest",
      "Nostalgic content is trending on TikTok BD 🔥",
      "Post between 8-11 PM for best reach"
    ],
    videoPrompt: "🎥 Video Prompt (AI-Generated)",
    enhancedPrompt: "✨ Enhanced Prompt (Ultra-Detailed)",
    banglaCaptionLabel: "🇧🇩 Bangla Caption",
    englishCaptionLabel: "🌍 English Caption",
    hashtagsLabel: "🏷️ Trending Hashtags",
    nextSteps: "⚡ Next Steps",
    steps: [
      "Copy the 'Video Prompt'",
      "Paste into Google Vids/Wan2.1/Veo3",
      "Generate and download video",
      "Add Bangla captions in CapCut",
      "Upload to TikTok/Reels/Shorts with hashtags",
      "Post between 8-11 PM for best reach! 🚀"
    ],
    generateAnother: "🔄 Generate Another",
    noResults: "Generate a prompt first",
    goToGenerator: "← Go to Generator",
    copy: "Copy",
    copied: "✓ Copied!",
    copyAll: "Copy All"
  },
  bn: {
    title: "DESHI-ART",
    subtitle: "বাংলাদেশী নস্টালজিক কন্টেন্ট জেনারেটর ২০২৬",
    tabs: {
      generator: "🎨 জেনারেটর",
      apiKeys: "🔑 API কী",
      results: "📋 ফলাফল"
    },
    sceneType: "দৃশ্য নির্বাচন করুন",
    artStyle: "শিল্প শৈলী",
    timeOfDay: "সময়",
    region: "অঞ্চল",
    customDetails: "বিশেষ বিবরণ (ঐচ্ছিক)",
    customPlaceholder: "যেমন: পুকুরে পদ্ম ফুল, নারকেল গাছ, মাটির চুলা...",
    generateBtn: "🎬 প্রম্পট জেনারেট করুন",
    generating: "⏳ তৈরি হচ্ছে...",
    apiKeyTitle: "API কী সেটআপ",
    apiKeySaved: "✅ API কী সেভ হয়েছে!",
    apiKeyPlaceholder: "আপনার API কী লিখুন...",
    saveKey: "সেভ করুন",
    statsLabel: "বাংলাদেশ সোশ্যাল মিডিয়া পরিসংখ্যান (২০২৬)",
    tipsTitle: "💡 বাংলাদেশ-স্পেসিফিক টিপস (মে ২০২৬)",
    tips: [
      "বাংলা ক্যাপশন ৪০-৬০% বেশি engagement পায়",
      "Shorts/Reels স্ট্যাটিক পোস্টের চেয়ে ৩x reach পায়",
      "৩০ সেকেন্ডের নিচে ভিডিও সবচেয়ে ভাইরাল হয়",
      "Nostalgic কন্টেন্ট এখন TikTok BD তে ট্রেন্ডিং 🔥",
      "সন্ধ্যা ৮-১১ PM পোস্ট করলে সবচেয়ে ভালো reach"
    ],
    videoPrompt: "🎥 ভিডিও প্রম্পট (AI-জেনারেটেড)",
    enhancedPrompt: "✨ উন্নত প্রম্পট (আল্ট্রা-বিস্তারিত)",
    banglaCaptionLabel: "🇧🇩 বাংলা ক্যাপশন",
    englishCaptionLabel: "🌍 ইংরেজি ক্যাপশন",
    hashtagsLabel: "🏷️ ট্রেন্ডিং হ্যাশট্যাগ",
    nextSteps: "⚡ পরবর্তী ধাপ",
    steps: [
      "'Video Prompt' কপি করুন",
      "Google Vids/Wan2.1/Veo3 তে paste করুন",
      "Video generate হওয়ার পর download করুন",
      "CapCut এ বাংলা ক্যাপশন add করুন",
      "TikTok/Reels/Shorts এ hashtags সহ upload করুন",
      "সন্ধ্যা ৮-১১ PM এ post করুন সবচেয়ে ভালো reach এর জন্য! 🚀"
    ],
    generateAnother: "🔄 আরেকটি তৈরি করুন",
    noResults: "প্রথমে একটি প্রম্পট তৈরি করুন",
    goToGenerator: "← জেনারেটরে যান",
    copy: "কপি করুন",
    copied: "✓ কপি হয়েছে!",
    copyAll: "সব কপি করুন"
  }
};

// SCENE TYPES (Bilingual)
const DESHI_SCENES = [
  { id: "90s_village_night", bn: "৯০'স গ্রামের রাত", en: "90s Village Night", icon: "🌙", trend: "🔥" },
  { id: "monsoon_nostalgia", bn: "বর্ষার নস্টালজিয়া", en: "Monsoon Nostalgia", icon: "🌧️", trend: "🔥" },
  { id: "pond_childhood", bn: "পুকুরপাড়ের শৈশব", en: "Pond Childhood", icon: "🐟", trend: "✨" },
  { id: "khas_land_farming", bn: "খাস জমিতে চাষ", en: "Village Farming", icon: "🌾", trend: "✨" },
  { id: "clay_house_life", bn: "মাটির ঘরের জীবন", en: "Clay House Life", icon: "🏡", trend: "🔥" },
  { id: "kerosene_lamp", bn: "কেরোসিন বাতি রাত", en: "Kerosene Lamp Night", icon: "🪔", trend: "✨" },
  { id: "village_market", bn: "হাটবাজার দৃশ্য", en: "Village Market", icon: "🧺", trend: "" },
  { id: "boat_journey", bn: "নৌকা ভ্রমণ", en: "Boat Journey", icon: "⛵", trend: "" },
  { id: "harvesting_paddy", bn: "ধান কাটা মৌসুম", en: "Harvesting Season", icon: "🌾", trend: "✨" },
  { id: "rooftop_stargazing", bn: "ছাদে তারা দেখা", en: "Rooftop Stargazing", icon: "⭐", trend: "🔥" },
  { id: "hand_fan_summer", bn: "হাতপাখা গরম", en: "Hand Fan Summer", icon: "🪭", trend: "" },
  { id: "village_wedding", bn: "গ্রামীণ বিয়ে", en: "Village Wedding", icon: "💐", trend: "" },
];

// ART STYLES
const ART_STYLES = [
  { id: "ghibli_bangla", en: "Ghibli Bengali Style", bn: "গিবলি বাংলা স্টাইল", color: "#4a9eff", desc: "Studio Ghibli meets rural Bangladesh" },
  { id: "watercolor_nostalgic", en: "Nostalgic Watercolor", bn: "নস্টালজিক ওয়াটারকালার", color: "#7ec8a0", desc: "Soft, dreamy village memories" },
  { id: "vintage_postcard", en: "Vintage Postcard", bn: "ভিন্টেজ পোস্টকার্ড", color: "#e8a045", desc: "1980s Bangladesh photo aesthetic" },
  { id: "oil_painting", en: "Oil Painting Classic", bn: "অয়েল পেইন্টিং ক্লাসিক", color: "#d4876a", desc: "Rich, warm, hand-painted feel" },
];

// TIMES
const BD_TIMES = [
  { bn: "ভোরের সোনালি আলো", en: "Golden Dawn" },
  { bn: "দুপুরের খরতাপ", en: "Noon Heat" },
  { bn: "বিকেলের মিষ্টি আলো", en: "Sweet Afternoon" },
  { bn: "সন্ধ্যার ধোঁয়া", en: "Evening Smoke" },
  { bn: "রাতের জোছনা", en: "Moonlit Night" },
  { bn: "মধ্যরাতের নিস্তব্ধতা", en: "Midnight Silence" },
];

// REGIONS
const BD_REGIONS = [
  { bn: "গ্রামীণ বাংলাদেশ", en: "Rural Bangladesh" },
  { bn: "সিলেট অঞ্চল", en: "Sylhet Region" },
  { bn: "চট্টগ্রাম পাহাড়ী এলাকা", en: "Chittagong Hills" },
  { bn: "কুষ্টিয়া-যশোর", en: "Kushtia-Jessore" },
  { bn: "ময়মনসিংহ", en: "Mymensingh" },
  { bn: "বরিশাল নদী এলাকা", en: "Barisal River Region" },
  { bn: "রংপুর-দিনাজপুর", en: "Rangpur-Dinajpur" },
  { bn: "বেঙ্গল ডেল্টা", en: "Bengal Delta" },
];

// HASHTAGS
const BD_HASHTAGS_2026 = {
  base: ["#DeshiNostalgia", "#গ্রামবাংলা", "#BangladeshVillageLife", "#90sChildhoodBD", "#RuralBangladesh", "#বাংলারগ্রাম", "#NostalgicBangladesh", "#দেশিশৈশব", "#BanglaHeritage", "#গ্রামীণজীবন"],
  ghibli: ["#GhibliBangladesh", "#AnimeVillage", "#GhibliStyleBD", "#বাংলাদেশীAnime", "#StudioGhibliAesthetic", "#AnimatedBangladesh"],
  trending_may_2026: ["#ReelsViral", "#TikTokBangladesh", "#BDTikTok", "#ShortsViral", "#InstagramReelsBD", "#YouTubeShortsঢাকা", "#ViralBD2026"],
  emotional: ["#EmotionalBangladesh", "#MissMyVillage", "#গ্রামেরটান", "#ChildhoodMemories", "#SimpleLivingBD", "#PureBangladesh"],
  nature: ["#BangladeshNature", "#VillageScenery", "#বাংলারপ্রকৃতি", "#RuralBeauty", "#BengalDelta", "#MonsoonBangladesh"],
};

// COMPONENTS
function CopyButton({ text, label, lang }) {
  const [copied, setCopied] = useState(false);
  const t = LANG[lang];
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
        fontWeight: "600",
        transition: "all 0.2s",
        fontFamily: lang === "bn" ? "'Hind Siliguri', sans-serif" : "'Inter', sans-serif",
      }}
    >
      {copied ? t.copied : (label || t.copy)}
    </button>
  );
}

function SceneButton({ scene, selected, onClick, lang }) {
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
        fontFamily: lang === "bn" ? "'Hind Siliguri', sans-serif" : "'Inter', sans-serif",
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
      <span style={{ fontSize: "10px", opacity: 0.9 }}>{scene[lang]}</span>
    </button>
  );
}

// MAIN APP
export default function App() {
  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState("generator");
  
  // API Keys
  const [claudeApiKey, setClaudeApiKey] = useState(localStorage.getItem("claude_api_key") || "");
  const [hfApiKey, setHfApiKey] = useState(localStorage.getItem("hf_api_key") || "");
  const [falApiKey, setFalApiKey] = useState(localStorage.getItem("fal_api_key") || "");
  
  // Form state
  const [selectedScene, setSelectedScene] = useState("90s_village_night");
  const [selectedStyle, setSelectedStyle] = useState("ghibli_bangla");
  const [selectedTime, setSelectedTime] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [customDetails, setCustomDetails] = useState("");
  
  // Generation state
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const t = LANG[lang];

  const saveApiKeys = () => {
    localStorage.setItem("claude_api_key", claudeApiKey);
    localStorage.setItem("hf_api_key", hfApiKey);
    localStorage.setItem("fal_api_key", falApiKey);
    alert(t.apiKeySaved);
  };

  // CLAUDE API CALL for advanced prompt generation
  const callClaude = async (systemPrompt, userPrompt) => {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": claudeApiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Claude API call failed");
    }

    const data = await response.json();
    return data.content[0].text;
  };

  // GENERATE ADVANCED PROMPTS
  const generate = useCallback(async () => {
    if (!claudeApiKey.trim()) {
      setError("Please add your Claude API key in the API Keys tab first!");
      setActiveTab("apiKeys");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const scene = DESHI_SCENES.find(s => s.id === selectedScene);
      const style = ART_STYLES.find(s => s.id === selectedStyle);
      const time = BD_TIMES[selectedTime];
      const region = BD_REGIONS[selectedRegion];

      const systemPrompt = `You are an expert AI video prompt engineer and content strategist specializing in Bangladesh nostalgic content for TikTok, Instagram Reels, and YouTube Shorts. You understand:
- Studio Ghibli anime aesthetics applied to Bengali culture
- 1980s-1990s rural Bangladesh village life authenticity
- Viral social media caption psychology (emotional hooks, relatability, nostalgia)
- Current May 2026 Bangladesh social media trends (71.9M FB users, 56M TikTok users)
- Bangla language nuances for maximum engagement
- Technical video generation requirements for Wan2.1, Veo 3.1, Kling AI models

You create cinematic, emotionally resonant, culturally authentic prompts that go viral.

ALWAYS respond with valid JSON only, no markdown formatting, no extra text.`;

      const userPrompt = `Create an ULTRA-ADVANCED, highly detailed video content package for:

SCENE: ${scene.en} (${scene.bn})
ART STYLE: ${style.desc}
TIME: ${time.en} (${time.bn})
REGION: ${region.en} (${region.bn})
CUSTOM DETAILS: ${customDetails || "None provided - use your expertise to add authentic Bangladesh village details"}

Generate this exact JSON structure:

{
  "video_prompt_basic": "60-80 word optimized prompt for AI video models (Wan2.1/Veo3/Kling). Include: style, scene, setting, era, atmosphere, technical specs (9:16, smooth motion, 4K)",
  
  "video_prompt_enhanced": "200-250 word ULTRA-DETAILED cinematic prompt with: camera angles, specific lighting details, character descriptions, environmental details, color palette, emotional atmosphere, cultural authenticity markers, technical requirements. This should be cinema-quality direction.",
  
  "caption_bangla": "Viral Bangla caption (3-4 sentences). Use emotional hooks, nostalgic language, question to audience for engagement. Natural conversational Bangla. Include relevant emojis.",
  
  "caption_english": "Viral English caption (3-4 sentences). Emotional, nostalgic, includes question to audience. For international viewers who love Bangladesh culture.",
  
  "scene_breakdown": [
    {
      "second": "0-3",
      "visual": "What happens visually in first 3 seconds (hook)",
      "audio_suggestion": "Background sound suggestion (rain, birds, village sounds, etc.)"
    },
    {
      "second": "4-7",
      "visual": "What happens in middle section",
      "audio_suggestion": "Audio continuation"
    },
    {
      "second": "8-10",
      "visual": "Final shot (emotional payoff)",
      "audio_suggestion": "Audio fade or climax"
    }
  ],
  
  "cultural_authenticity_notes": "3-4 specific authentic Bangladesh details to include (traditional clothing, props, architecture, daily life activities from 1980s-90s)",
  
  "mood_keywords": ["5-7", "emotional", "mood", "keywords"],
  
  "viral_potential_score": "8.5/10 with brief explanation why this will go viral in Bangladesh market",
  
  "posting_strategy": "Best time to post, target audience, platform-specific tips for TikTok BD/Instagram Reels BD/YouTube Shorts"
}`;

      console.log("Calling Claude API...");
      const rawResponse = await callClaude(systemPrompt, userPrompt);
      console.log("Claude response:", rawResponse);

      // Parse Claude's JSON response
      const cleanResponse = rawResponse.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanResponse);

      // Generate hashtags
      const allHashtags = [
        ...BD_HASHTAGS_2026.base.slice(0, 7),
        ...BD_HASHTAGS_2026.ghibli.slice(0, 4),
        ...BD_HASHTAGS_2026.trending_may_2026,
        ...BD_HASHTAGS_2026.emotional.slice(0, 4),
        ...BD_HASHTAGS_2026.nature.slice(0, 4),
        "#AIArt", "#AIVideo", "#Viral2026"
      ].slice(0, 30);

      setResult({
        ...parsed,
        hashtags: allHashtags,
        scene: scene,
        style: style,
        time: time,
        region: region,
      });

      setActiveTab("results");
    } catch (err) {
      console.error("Generation error:", err);
      setError(err.message || "Generation failed. Check your Claude API key and try again.");
    } finally {
      setLoading(false);
    }
  }, [claudeApiKey, selectedScene, selectedStyle, selectedTime, selectedRegion, customDetails]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a0d05 0%, #0d1a0a 40%, #1a1205 100%)",
      fontFamily: lang === "bn" ? "'Hind Siliguri', sans-serif" : "'Inter', sans-serif",
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "32px" }}>🇧🇩</span>
              <div>
                <div style={{ fontSize: "22px", fontWeight: "700", color: "#f5c842", letterSpacing: "-0.5px" }}>
                  {t.title}
                </div>
                <div style={{ fontSize: "10px", color: "#8a7a5a", letterSpacing: "0.3px" }}>
                  {t.subtitle}
                </div>
              </div>
            </div>
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              style={{
                background: "rgba(245,200,66,0.15)",
                border: "1px solid #f5c842",
                color: "#f5c842",
                borderRadius: "8px",
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: "600",
              }}
            >
              {lang === "en" ? "বাংলা" : "English"}
            </button>
          </div>
          
          {/* Stats */}
          <div style={{
            display: "flex",
            gap: "8px",
            fontSize: "9px",
            color: "#6a5a3a",
            marginTop: "8px",
            padding: "8px",
            background: "rgba(0,0,0,0.2)",
            borderRadius: "8px",
            flexWrap: "wrap",
          }}>
            <span>🔥 71.9M FB</span>
            <span>📱 56M TikTok</span>
            <span>⚡ 3x Shorts</span>
            <span>🤖 AI-Powered</span>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", marginTop: "14px" }}>
            {["generator", "apiKeys", "results"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                flex: 1,
                background: activeTab === tab ? "rgba(245,200,66,0.15)" : "transparent",
                border: "none",
                borderBottom: activeTab === tab ? "2px solid #f5c842" : "2px solid transparent",
                color: activeTab === tab ? "#f5c842" : "#6a5a3a",
                padding: "10px 4px",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: "600",
                transition: "all 0.2s",
              }}>
                {t.tabs[tab]}
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
                <div style={{ fontSize: "14px", color: "#f5c842", marginBottom: "12px", fontWeight: "600" }}>
                  {t.sceneType}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                  {DESHI_SCENES.map(scene => (
                    <SceneButton key={scene.id} scene={scene} selected={selectedScene === scene.id} onClick={setSelectedScene} lang={lang} />
                  ))}
                </div>
              </div>

              {/* Art Style */}
              <div>
                <div style={{ fontSize: "14px", color: "#f5c842", marginBottom: "12px", fontWeight: "600" }}>
                  {t.artStyle}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {ART_STYLES.map(style => (
                    <button key={style.id} onClick={() => setSelectedStyle(style.id)} style={{
                      background: selectedStyle === style.id ? `${style.color}22` : "rgba(255,255,255,0.04)",
                      border: `1.5px solid ${selectedStyle === style.id ? style.color : "rgba(255,255,255,0.1)"}`,
                      color: selectedStyle === style.id ? style.color : "#999",
                      borderRadius: "12px", padding: "14px 16px", cursor: "pointer",
                      fontSize: "13px",
                      transition: "all 0.2s",
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}>
                      <span style={{ fontWeight: "700" }}>{style[lang]}</span>
                      <span style={{ fontSize: "11px", opacity: 0.7 }}>{style.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time & Region */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <div style={{ fontSize: "13px", color: "#f5c842", marginBottom: "10px", fontWeight: "600" }}>{t.timeOfDay}</div>
                  <select value={selectedTime} onChange={e => setSelectedTime(Number(e.target.value))} style={{
                    width: "100%", background: "#1a1205", border: "1px solid rgba(245,200,66,0.3)",
                    borderRadius: "10px", color: "#e8dcc8", padding: "12px", fontSize: "12px",
                  }}>
                    {BD_TIMES.map((time, i) => <option key={i} value={i}>{time[lang]}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "#f5c842", marginBottom: "10px", fontWeight: "600" }}>{t.region}</div>
                  <select value={selectedRegion} onChange={e => setSelectedRegion(Number(e.target.value))} style={{
                    width: "100%", background: "#1a1205", border: "1px solid rgba(245,200,66,0.3)",
                    borderRadius: "10px", color: "#e8dcc8", padding: "12px", fontSize: "12px",
                  }}>
                    {BD_REGIONS.map((region, i) => <option key={i} value={i}>{region[lang]}</option>)}
                  </select>
                </div>
              </div>

              {/* Custom Details */}
              <div>
                <div style={{ fontSize: "13px", color: "#f5c842", marginBottom: "10px", fontWeight: "600" }}>
                  {t.customDetails}
                </div>
                <textarea
                  value={customDetails}
                  onChange={e => setCustomDetails(e.target.value)}
                  placeholder={t.customPlaceholder}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(245,200,66,0.25)", borderRadius: "12px",
                    color: "#e8dcc8", padding: "12px", fontSize: "13px",
                    resize: "vertical", minHeight: "80px",
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
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s",
                  boxShadow: loading ? "none" : "0 4px 24px rgba(245,200,66,0.3)",
                }}
              >
                {loading ? t.generating : t.generateBtn}
              </button>

              {error && (
                <div style={{
                  background: "rgba(255,80,80,0.1)",
                  border: "1px solid #ff5050",
                  borderRadius: "12px",
                  padding: "14px",
                  color: "#ff9090",
                  fontSize: "13px",
                }}>
                  ⚠️ {error}
                </div>
              )}

              {/* Tips */}
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
                  {t.tipsTitle}
                </div>
                {t.tips.map((tip, i) => <div key={i}>• {tip}</div>)}
              </div>

            </div>
          )}

          {/* API KEYS TAB */}
          {activeTab === "apiKeys" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              
              <div style={{
                background: "rgba(74,158,255,0.08)",
                border: "1px solid rgba(74,158,255,0.3)",
                borderRadius: "14px",
                padding: "16px",
                fontSize: "13px",
                color: "#9ab",
                lineHeight: "1.7",
              }}>
                <div style={{ color: "#4a9eff", fontWeight: "700", marginBottom: "8px" }}>
                  🤖 {lang === "en" ? "Why API Keys?" : "API কী কেন প্রয়োজন?"}
                </div>
                {lang === "en" ? (
                  <>
                    <strong style={{ color: "#e8dcc8" }}>Claude API</strong> - Generates ultra-advanced, cinema-quality video prompts using AI. This is what makes DESHI-ART's prompts 10x better than generic templates!<br/><br/>
                    <strong style={{ color: "#e8dcc8" }}>HuggingFace/FAL.ai</strong> (Optional) - For future video generation features.<br/><br/>
                    <a href="https://console.anthropic.com/settings/keys" target="_blank" style={{ color: "#f5c842" }}>Get Claude API key →</a>
                  </>
                ) : (
                  <>
                    <strong style={{ color: "#e8dcc8" }}>Claude API</strong> - AI দিয়ে অত্যন্ত উন্নত, সিনেমা-কোয়ালিটি ভিডিও প্রম্পট তৈরি করে। এটাই DESHI-ART এর প্রম্পট ১০x ভালো করে!<br/><br/>
                    <strong style={{ color: "#e8dcc8" }}>HuggingFace/FAL.ai</strong> (ঐচ্ছিক) - ভবিষ্যতে ভিডিও জেনারেশন ফিচারের জন্য।<br/><br/>
                    <a href="https://console.anthropic.com/settings/keys" target="_blank" style={{ color: "#f5c842" }}>Claude API কী পান →</a>
                  </>
                )}
              </div>

              {/* Claude API Key */}
              <div>
                <div style={{ fontSize: "13px", color: "#f5c842", marginBottom: "10px", fontWeight: "600" }}>
                  🤖 Claude API Key {lang === "en" ? "(Required)" : "(আবশ্যক)"}
                </div>
                <input
                  type="password"
                  value={claudeApiKey}
                  onChange={e => setClaudeApiKey(e.target.value)}
                  placeholder="sk-ant-api03-..."
                  style={{
                    width: "100%",
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(245,200,66,0.3)",
                    borderRadius: "10px",
                    padding: "12px",
                    color: "#e8dcc8",
                    fontSize: "13px",
                    marginBottom: "8px",
                    boxSizing: "border-box",
                    fontFamily: "monospace",
                  }}
                />
              </div>

              {/* HuggingFace API Key */}
              <div>
                <div style={{ fontSize: "13px", color: "#7ec8a0", marginBottom: "10px", fontWeight: "600" }}>
                  🤗 HuggingFace API Key {lang === "en" ? "(Optional)" : "(ঐচ্ছিক)"}
                </div>
                <input
                  type="password"
                  value={hfApiKey}
                  onChange={e => setHfApiKey(e.target.value)}
                  placeholder="hf_..."
                  style={{
                    width: "100%",
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(126,200,160,0.3)",
                    borderRadius: "10px",
                    padding: "12px",
                    color: "#e8dcc8",
                    fontSize: "13px",
                    marginBottom: "8px",
                    boxSizing: "border-box",
                    fontFamily: "monospace",
                  }}
                />
              </div>

              {/* FAL.ai API Key */}
              <div>
                <div style={{ fontSize: "13px", color: "#4a9eff", marginBottom: "10px", fontWeight: "600" }}>
                  ⚡ FAL.ai API Key {lang === "en" ? "(Optional)" : "(ঐচ্ছিক)"}
                </div>
                <input
                  type="password"
                  value={falApiKey}
                  onChange={e => setFalApiKey(e.target.value)}
                  placeholder="fal_..."
                  style={{
                    width: "100%",
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(74,158,255,0.3)",
                    borderRadius: "10px",
                    padding: "12px",
                    color: "#e8dcc8",
                    fontSize: "13px",
                    marginBottom: "8px",
                    boxSizing: "border-box",
                    fontFamily: "monospace",
                  }}
                />
              </div>

              {/* Save Button */}
              <button
                onClick={saveApiKeys}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #7ec8a0, #4a9eff)",
                  border: "none",
                  borderRadius: "14px",
                  color: "#0a0d05",
                  padding: "16px",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(126,200,160,0.3)",
                }}
              >
                {t.saveKey}
              </button>

            </div>
          )}

          {/* RESULTS TAB */}
          {activeTab === "results" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {!result ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "#6a5a3a" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🇧🇩</div>
                  <div style={{ fontSize: "15px", marginBottom: "8px" }}>{t.noResults}</div>
                  <button onClick={() => setActiveTab("generator")} style={{
                    marginTop: "20px", background: "transparent", border: "1px solid #f5c842",
                    color: "#f5c842", borderRadius: "10px", padding: "10px 24px", cursor: "pointer",
                    fontSize: "13px", fontWeight: "600",
                  }}>{t.goToGenerator}</button>
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
                          {result.scene[lang]}
                        </div>
                        <div style={{ fontSize: "12px", color: "#8a7a5a" }}>
                          {result.style[lang]} · {result.time[lang]} · {result.region[lang]}
                        </div>
                      </div>
                    </div>
                    {result.viral_potential_score && (
                      <div style={{ fontSize: "11px", color: "#4a9eff", marginTop: "8px", fontStyle: "italic" }}>
                        🔥 Viral Score: {result.viral_potential_score}
                      </div>
                    )}
                  </div>

                  {/* Basic Video Prompt */}
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(126,200,160,0.3)",
                    borderRadius: "14px", padding: "16px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ fontSize: "14px", color: "#7ec8a0", fontWeight: "700" }}>
                        {t.videoPrompt}
                      </div>
                      <CopyButton text={result.video_prompt_basic} lang={lang} />
                    </div>
                    <div style={{
                      fontSize: "12px", color: "#ccc", lineHeight: "1.7",
                      background: "rgba(0,0,0,0.3)", borderRadius: "10px", padding: "12px",
                    }}>
                      {result.video_prompt_basic}
                    </div>
                  </div>

                  {/* Enhanced Video Prompt */}
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(74,158,255,0.3)",
                    borderRadius: "14px", padding: "16px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ fontSize: "14px", color: "#4a9eff", fontWeight: "700" }}>
                        {t.enhancedPrompt}
                      </div>
                      <CopyButton text={result.video_prompt_enhanced} lang={lang} />
                    </div>
                    <div style={{
                      fontSize: "11px", color: "#ccc", lineHeight: "1.7",
                      background: "rgba(0,0,0,0.3)", borderRadius: "10px", padding: "12px",
                      maxHeight: "300px", overflowY: "auto",
                      whiteSpace: "pre-wrap",
                    }}>
                      {result.video_prompt_enhanced}
                    </div>
                  </div>

                  {/* Scene Breakdown */}
                  {result.scene_breakdown && (
                    <div style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(232,160,69,0.3)",
                      borderRadius: "14px", padding: "16px",
                    }}>
                      <div style={{ fontSize: "14px", color: "#e8a045", fontWeight: "700", marginBottom: "12px" }}>
                        🎬 {lang === "en" ? "Scene Breakdown" : "দৃশ্য বিভাজন"}
                      </div>
                      {result.scene_breakdown.map((scene, i) => (
                        <div key={i} style={{
                          background: "rgba(0,0,0,0.2)",
                          borderRadius: "8px",
                          padding: "10px",
                          marginBottom: "8px",
                          fontSize: "12px",
                          color: "#ccc",
                        }}>
                          <div style={{ color: "#e8a045", fontWeight: "600", marginBottom: "4px" }}>
                            {scene.second}
                          </div>
                          <div style={{ marginBottom: "4px" }}>{scene.visual}</div>
                          <div style={{ fontSize: "11px", opacity: 0.7, fontStyle: "italic" }}>
                            🔊 {scene.audio_suggestion}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Cultural Notes */}
                  {result.cultural_authenticity_notes && (
                    <div style={{
                      background: "rgba(212,135,106,0.08)",
                      border: "1px solid rgba(212,135,106,0.3)",
                      borderRadius: "14px",
                      padding: "14px",
                      fontSize: "12px",
                      color: "#d4876a",
                    }}>
                      <div style={{ fontWeight: "700", marginBottom: "6px" }}>
                        🏛️ {lang === "en" ? "Cultural Authenticity" : "সাংস্কৃতিক সত্যতা"}
                      </div>
                      {result.cultural_authenticity_notes}
                    </div>
                  )}

                  {/* Mood Keywords */}
                  {result.mood_keywords && (
                    <div style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "14px",
                      padding: "14px",
                    }}>
                      <div style={{ fontSize: "13px", color: "#f5c842", fontWeight: "700", marginBottom: "8px" }}>
                        🎭 {lang === "en" ? "Mood Keywords" : "মুড কীওয়ার্ড"}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {result.mood_keywords.map((keyword, i) => (
                          <span key={i} style={{
                            background: "rgba(245,200,66,0.12)",
                            border: "1px solid rgba(245,200,66,0.3)",
                            color: "#f5c842",
                            borderRadius: "20px",
                            padding: "4px 12px",
                            fontSize: "11px",
                          }}>
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bangla Caption */}
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(245,200,66,0.3)",
                    borderRadius: "14px", padding: "16px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ fontSize: "14px", color: "#f5c842", fontWeight: "700" }}>
                        {t.banglaCaptionLabel}
                      </div>
                      <CopyButton text={result.caption_bangla} lang={lang} />
                    </div>
                    <div style={{
                      fontSize: "13px", color: "#e8dcc8", lineHeight: "1.8",
                      fontFamily: "'Noto Serif Bengali', serif",
                      whiteSpace: "pre-wrap",
                    }}>
                      {result.caption_bangla}
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
                        {t.englishCaptionLabel}
                      </div>
                      <CopyButton text={result.caption_english} lang={lang} />
                    </div>
                    <div style={{
                      fontSize: "13px", color: "#ccc", lineHeight: "1.8",
                      whiteSpace: "pre-wrap",
                    }}>
                      {result.caption_english}
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
                        {t.hashtagsLabel} ({result.hashtags.length})
                      </div>
                      <CopyButton text={result.hashtags.join(" ")} label={t.copyAll} lang={lang} />
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

                  {/* Posting Strategy */}
                  {result.posting_strategy && (
                    <div style={{
                      background: "rgba(126,200,160,0.08)",
                      border: "1px solid rgba(126,200,160,0.3)",
                      borderRadius: "14px",
                      padding: "16px",
                    }}>
                      <div style={{ fontSize: "14px", color: "#7ec8a0", fontWeight: "700", marginBottom: "10px" }}>
                        {t.nextSteps}
                      </div>
                      <div style={{ fontSize: "12px", color: "#9ab", lineHeight: "1.8" }}>
                        {result.posting_strategy}
                      </div>
                    </div>
                  )}

                  {/* Generate Another */}
                  <button onClick={() => { setActiveTab("generator"); setResult(null); }} style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #7ec8a0, #4a9eff)",
                    border: "none",
                    borderRadius: "14px",
                    color: "#0a0d05",
                    padding: "16px",
                    fontSize: "15px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(126,200,160,0.3)",
                  }}>
                    {t.generateAnother}
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
