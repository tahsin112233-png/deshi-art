import { useState, useCallback } from "react";

// LANGUAGE SYSTEM
const LANG = {
  en: {
    title: "DESHI-ART",
    subtitle: "Bangladesh Nostalgic Content Generator 2026 • GOD MODE",
    tabs: {
      generator: "🎨 Generator",
      apiKeys: "🔑 API Keys",
      results: "📋 Results"
    },
    sceneType: "Scene Type",
    artStyle: "Art Style",
    timeOfDay: "Time of Day",
    region: "Region",
    apiProvider: "AI Provider",
    customDetails: "Custom Details (Optional)",
    customPlaceholder: "e.g., lotus flowers in pond, coconut trees, clay stove...",
    generateBtn: "🎬 Generate MASTER Prompts",
    generating: "⏳ Generating with AI...",
    apiKeyTitle: "API Key Configuration",
    apiKeySaved: "✅ API keys saved!",
    saveKey: "Save Keys",
    copy: "Copy",
    copied: "✓ Copied!",
    copyAll: "Copy All",
    generateAnother: "🔄 Generate Another",
    noResults: "Generate a prompt first",
    goToGenerator: "← Go to Generator",
  },
  bn: {
    title: "DESHI-ART",
    subtitle: "বাংলাদেশী নস্টালজিক কন্টেন্ট জেনারেটর ২০২৬ • গড মোড",
    tabs: {
      generator: "🎨 জেনারেটর",
      apiKeys: "🔑 API কী",
      results: "📋 ফলাফল"
    },
    sceneType: "দৃশ্য নির্বাচন করুন",
    artStyle: "শিল্প শৈলী",
    timeOfDay: "সময়",
    region: "অঞ্চল",
    apiProvider: "AI প্রোভাইডার",
    customDetails: "বিশেষ বিবরণ (ঐচ্ছিক)",
    customPlaceholder: "যেমন: পুকুরে পদ্ম ফুল, নারকেল গাছ, মাটির চুলা...",
    generateBtn: "🎬 মাস্টার প্রম্পট জেনারেট করুন",
    generating: "⏳ তৈরি হচ্ছে...",
    apiKeyTitle: "API কী সেটআপ",
    apiKeySaved: "✅ API কী সেভ হয়েছে!",
    saveKey: "সেভ করুন",
    copy: "কপি করুন",
    copied: "✓ কপি হয়েছে!",
    copyAll: "সব কপি করুন",
    generateAnother: "🔄 আরেকটি তৈরি করুন",
    noResults: "প্রথমে একটি প্রম্পট তৈরি করুন",
    goToGenerator: "← জেনারেটরে যান",
  }
};

// SCENE TYPES
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

// API PROVIDERS
const API_PROVIDERS = [
  { 
    id: "agentrouter", 
    name: "AgentRouter", 
    color: "#00d4ff",
    icon: "🤖",
    desc: "Best quality, auto-routes to top models",
    endpoint: "https://api.agentrouter.ai/v1/chat/completions",
    model: "gpt-4o",
    keyPlaceholder: "agentrouter_..."
  },
  { 
    id: "openrouter", 
    name: "OpenRouter", 
    color: "#9333ea",
    icon: "🔀",
    desc: "Access to 100+ models",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    model: "anthropic/claude-3.5-sonnet",
    keyPlaceholder: "sk-or-v1-..."
  },
  { 
    id: "gemini", 
    name: "Gemini", 
    color: "#4285f4",
    icon: "✨",
    desc: "Google's advanced AI",
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
    model: "gemini-2.0-flash-exp",
    keyPlaceholder: "AIza..."
  },
  { 
    id: "openai", 
    name: "ChatGPT", 
    color: "#10a37f",
    icon: "💬",
    desc: "OpenAI GPT-4",
    endpoint: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4o",
    keyPlaceholder: "sk-proj-..."
  },
  { 
    id: "claude", 
    name: "Claude", 
    color: "#f5c842",
    icon: "🧠",
    desc: "Anthropic Claude Sonnet",
    endpoint: "https://api.anthropic.com/v1/messages",
    model: "claude-sonnet-4-20250514",
    keyPlaceholder: "sk-ant-api03-..."
  },
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
  
  // API Keys (stored as object with provider IDs as keys)
  const [apiKeys, setApiKeys] = useState(() => {
    const stored = localStorage.getItem("deshi_art_api_keys");
    return stored ? JSON.parse(stored) : {};
  });
  
  const [selectedProvider, setSelectedProvider] = useState("agentrouter");
  
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
    localStorage.setItem("deshi_art_api_keys", JSON.stringify(apiKeys));
    alert(t.apiKeySaved);
  };

  const updateApiKey = (providerId, value) => {
    setApiKeys(prev => ({ ...prev, [providerId]: value }));
  };

  // GOD MODE SYSTEM PROMPT - ULTRA ADVANCED
  const getSystemPrompt = () => {
    return `You are a MASTER AI video prompt engineer and viral content strategist with expertise in:

1. CINEMATOGRAPHY: Professional camera work, lighting design, shot composition, color grading
2. ANIMATION DIRECTION: Studio Ghibli aesthetics, anime production techniques, frame-by-frame storytelling
3. CULTURAL ANTHROPOLOGY: Deep knowledge of 1980s-1990s rural Bangladesh life, traditions, architecture, daily routines, social dynamics
4. VIRAL CONTENT PSYCHOLOGY: Emotional hooks, nostalgia triggers, engagement patterns, TikTok/Reels/Shorts optimization
5. AI VIDEO MODEL EXPERTISE: Technical requirements for Wan2.1, Veo 3.1, Kling AI, Runway Gen-3 - optimal prompt structures, token usage, style triggers
6. BENGALI LANGUAGE & CULTURE: Authentic Bangla emotional expression, cultural nuances, social media behavior of Bangladesh users (71.9M Facebook, 56M TikTok users as of May 2026)

Your prompts are NOT generic templates. They are CINEMA-LEVEL direction that would be given to a professional film crew.

CRITICAL RULES:
- Every visual detail must be specific (not "a house" but "a three-room mud-brick house with corrugated tin roof, faded blue wooden shutters, and jasmine vines climbing the bamboo trellis")
- Lighting must be described like a cinematographer (angle, quality, color temperature, shadows, highlights)
- Characters must have authentic 1980s-90s Bangladesh appearance (clothing, hairstyles, body language, age-appropriate features)
- Zero modern technology visible (no phones, LED lights, plastic furniture, modern clothing)
- Camera movements must be technically feasible for AI video generation (smooth, simple, intentional)
- Emotional atmosphere must be SHOWN not told (through lighting, expressions, environment)
- Cultural authenticity is NON-NEGOTIABLE - every detail must be historically accurate to the era

ALWAYS respond with valid JSON only. No markdown formatting, no extra text.`;
  };

  // GOD MODE USER PROMPT
  const getUserPrompt = (scene, style, time, region) => {
    return `Generate an ULTRA-ADVANCED, MASTER-LEVEL video content package for viral Bangladesh nostalgic content.

CREATIVE BRIEF:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scene Theme: ${scene.en} (${scene.bn})
Art Direction: ${style.desc}
Time Setting: ${time.en} (${time.bn})
Geographic Location: ${region.en} (${region.bn})
Era: 1980-1995 (Pre-digital Bangladesh)
Target Platforms: TikTok BD, Instagram Reels BD, YouTube Shorts
Target Audience: 25-45 year old Bangladeshis (diaspora + local), nostalgic millennials
Content Goal: Maximum emotional engagement, viral sharing, comments about childhood memories
${customDetails ? `\nDIRECTOR'S NOTES: ${customDetails}` : ""}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate this EXACT JSON structure (be extremely detailed):

{
  "master_video_prompt": "400-500 word CINEMA-LEVEL prompt for AI video generation. Write this as if directing a professional film crew. Include: establishing shot details, lighting design with exact sources and temperatures, detailed 3D environment description, character details if present, foreground/midground/background elements, atmospheric effects, camera movement specifications, color palette with specific tones, technical specs (9:16, 4K, 24fps), and AI model optimization keywords.",

  "short_video_prompt": "60-80 word condensed version for quick generation. Maintains key visual elements and style but streamlined.",

  "scene_breakdown_10sec": [
    {
      "timestamp": "0.0-2.5s",
      "shot_type": "Establishing wide shot / Close-up / Medium shot / etc.",
      "visual_action": "Extremely detailed description of what happens in this exact 2.5 second window",
      "camera_movement": "Static / Slow pan right / Dolly in / etc.",
      "lighting_change": "Any lighting transitions",
      "emotional_beat": "What emotion this moment should evoke",
      "audio_suggestion": "Diegetic sounds that would be present"
    },
    {
      "timestamp": "2.5-5.0s",
      "shot_type": "...",
      "visual_action": "...",
      "camera_movement": "...",
      "lighting_change": "...",
      "emotional_beat": "...",
      "audio_suggestion": "..."
    },
    {
      "timestamp": "5.0-7.5s",
      "shot_type": "...",
      "visual_action": "...",
      "camera_movement": "...",
      "lighting_change": "...",
      "emotional_beat": "...",
      "audio_suggestion": "..."
    },
    {
      "timestamp": "7.5-10.0s",
      "shot_type": "...",
      "visual_action": "...",
      "camera_movement": "...",
      "lighting_change": "...",
      "emotional_beat": "Final emotional payoff",
      "audio_suggestion": "..."
    }
  ],

  "caption_bangla_viral": "Viral-optimized Bangla caption (4-5 sentences). Include powerful emotional hook, specific sensory detail, universal relatable statement, direct question to audience, and 3-5 relevant emojis. Use conversational Dhaka Bangla.",

  "caption_english_international": "English caption for diaspora/international audience (4-5 sentences). Explain cultural context briefly while maintaining emotional impact.",

  "cultural_authenticity_checklist": [
    "List 8-10 SPECIFIC authentic details that MUST be visible in the video. Each item should be an exact object, clothing item, architectural element, or cultural practice from 1980s-90s rural Bangladesh with materials, colors, and placement."
  ],

  "lighting_technical_notes": "Professional cinematographer-level lighting notes: exact sun/moon angle in degrees, Kelvin temperature of light sources, shadow softness, contrast ratio, how to achieve the mood through lighting alone",

  "color_grading_preset": "Specific color grading instructions: which colors to boost, which to desaturate, LUT-style description (e.g., 'Fujifilm Superia 400 film stock emulation')",

  "ai_model_optimization_tags": [
    "List of 15-20 style trigger words/phrases that work best for AI video models. Include technical, style, quality, and mood terms."
  ],

  "viral_psychology_analysis": "2-3 sentence analysis of WHY this specific scene/framing/moment will trigger emotional response and sharing behavior in Bangladesh audience.",

  "posting_strategy_2026": {
    "best_time_bd": "Exact time to post in Bangladesh timezone with reasoning",
    "caption_length": "Optimal character count for each platform",
    "hashtag_strategy": "Which hashtags to use first, which are trending NOW in May 2026",
    "engagement_tactics": "Specific call-to-action, comment baiting question, share trigger",
    "cross_platform_adaptation": "How to slightly modify for TikTok vs Reels vs Shorts"
  },

  "music_suggestions": [
    "List 3-4 specific Bengali songs from 1980s-90s that would pair perfectly with artist names and why"
  ],

  "viral_score_prediction": "X.X/10 score with detailed breakdown of viral potential factors"
}`;
  };

  // MULTI-API CALL FUNCTION
  const callAI = async (provider, systemPrompt, userPrompt) => {
    const apiKey = apiKeys[provider.id];
    
    if (!apiKey) {
      throw new Error(`No API key found for ${provider.name}`);
    }

    // Gemini has different API structure
    if (provider.id === "gemini") {
      const response = await fetch(`${provider.endpoint}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${systemPrompt}\n\n${userPrompt}`
            }]
          }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 8192,
          }
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || `${provider.name} API call failed`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    }

    // Claude has different structure
    if (provider.id === "claude") {
      const response = await fetch(provider.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: provider.model,
          max_tokens: 4000,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || `${provider.name} API call failed`);
      }

      const data = await response.json();
      return data.content[0].text;
    }

    // OpenAI-compatible (AgentRouter, OpenRouter, OpenAI)
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    };

    // OpenRouter needs HTTP-Referer
    if (provider.id === "openrouter") {
      headers["HTTP-Referer"] = window.location.origin;
      headers["X-Title"] = "DESHI-ART";
    }

    const response = await fetch(provider.endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: provider.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.9,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || `${provider.name} API call failed`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  // GENERATE MASTER PROMPTS
  const generate = useCallback(async () => {
    const provider = API_PROVIDERS.find(p => p.id === selectedProvider);
    
    if (!apiKeys[selectedProvider]) {
      setError(`Please add your ${provider.name} API key in the API Keys tab first!`);
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

      const systemPrompt = getSystemPrompt();
      const userPrompt = getUserPrompt(scene, style, time, region);

      console.log(`Calling ${provider.name} API...`);
      const rawResponse = await callAI(provider, systemPrompt, userPrompt);
      console.log(`${provider.name} response:`, rawResponse);

      // Parse JSON response
      const cleanResponse = rawResponse.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanResponse);

      // Generate hashtags
      const allHashtags = [
        ...BD_HASHTAGS_2026.base.slice(0, 7),
        ...BD_HASHTAGS_2026.ghibli.slice(0, 4),
        ...BD_HASHTAGS_2026.trending_may_2026,
        ...BD_HASHTAGS_2026.emotional.slice(0, 4),
        ...BD_HASHTAGS_2026.nature.slice(0, 4),
        "#AIArt", "#AIVideo", "#Viral2026", "#GodMode"
      ].slice(0, 30);

      setResult({
        ...parsed,
        hashtags: allHashtags,
        scene: scene,
        style: style,
        time: time,
        region: region,
        generatedBy: provider.name,
      });

      setActiveTab("results");
    } catch (err) {
      console.error("Generation error:", err);
      setError(`${err.message || "Generation failed"}. Try another AI provider or check your API key.`);
    } finally {
      setLoading(false);
    }
  }, [apiKeys, selectedProvider, selectedScene, selectedStyle, selectedTime, selectedRegion, customDetails]);

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
            <span>🔥 Multi-API</span>
            <span>⚡ God Mode</span>
            <span>🎬 Cinema-Level</span>
            <span>💰 $280 Credit</span>
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

              {/* API Provider Selection */}
              <div>
                <div style={{ fontSize: "14px", color: "#f5c842", marginBottom: "12px", fontWeight: "600" }}>
                  {t.apiProvider}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {API_PROVIDERS.map(provider => (
                    <button 
                      key={provider.id} 
                      onClick={() => setSelectedProvider(provider.id)}
                      disabled={!apiKeys[provider.id]}
                      style={{
                        background: selectedProvider === provider.id ? `${provider.color}22` : "rgba(255,255,255,0.04)",
                        border: `1.5px solid ${selectedProvider === provider.id ? provider.color : "rgba(255,255,255,0.1)"}`,
                        color: selectedProvider === provider.id ? provider.color : (apiKeys[provider.id] ? "#999" : "#555"),
                        borderRadius: "12px", 
                        padding: "14px 16px", 
                        cursor: apiKeys[provider.id] ? "pointer" : "not-allowed",
                        fontSize: "13px",
                        transition: "all 0.2s",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        opacity: apiKeys[provider.id] ? 1 : 0.5,
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>{provider.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "700", marginBottom: "2px" }}>
                          {provider.name}
                          {!apiKeys[provider.id] && <span style={{ fontSize: "10px", opacity: 0.7, marginLeft: "8px" }}>(No API key)</span>}
                        </div>
                        <div style={{ fontSize: "11px", opacity: 0.7 }}>{provider.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

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
                disabled={loading || !apiKeys[selectedProvider]}
                style={{
                  width: "100%",
                  background: loading ? "rgba(245,200,66,0.08)" : "linear-gradient(135deg, #ff6b35, #f5c842, #00d4ff)",
                  border: "none",
                  borderRadius: "16px",
                  color: loading ? "#6a5a3a" : "#0a0d05",
                  padding: "18px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: (loading || !apiKeys[selectedProvider]) ? "not-allowed" : "pointer",
                  transition: "all 0.3s",
                  boxShadow: loading ? "none" : "0 4px 24px rgba(245,200,66,0.4), 0 0 60px rgba(0,212,255,0.2)",
                  opacity: !apiKeys[selectedProvider] ? 0.5 : 1,
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

              {/* Info */}
              <div style={{
                background: "rgba(0,212,255,0.06)",
                border: "1px solid rgba(0,212,255,0.2)",
                borderRadius: "14px",
                padding: "16px",
                fontSize: "12px",
                color: "#9ab",
                lineHeight: "1.7",
              }}>
                <div style={{ color: "#00d4ff", fontWeight: "700", marginBottom: "8px" }}>
                  🚀 {lang === "en" ? "GOD MODE Features" : "গড মোড ফিচার"}
                </div>
                {lang === "en" ? (
                  <>
                    • 400-500 word cinema-level prompts<br/>
                    • Professional cinematography direction<br/>
                    • Frame-by-frame 10-second breakdowns<br/>
                    • Cultural authenticity checklists<br/>
                    • Professional lighting & color grading notes<br/>
                    • AI model optimization tags<br/>
                    • Viral psychology analysis<br/>
                    • 2026 posting strategy<br/>
                  </>
                ) : (
                  <>
                    • ৪০০-৫০০ শব্দের সিনেমা-লেভেল প্রম্পট<br/>
                    • প্রফেশনাল সিনেমাটোগ্রাফি ডিরেকশন<br/>
                    • ফ্রেম-বাই-ফ্রেম ১০-সেকেন্ড ব্রেকডাউন<br/>
                    • সাংস্কৃতিক সত্যতা চেকলিস্ট<br/>
                    • প্রফেশনাল লাইটিং ও কালার গ্রেডিং নোট<br/>
                    • AI মডেল অপটিমাইজেশন ট্যাগ<br/>
                    • ভাইরাল সাইকোলজি অ্যানালাইসিস<br/>
                    • ২০২৬ পোস্টিং স্ট্র্যাটেজি<br/>
                  </>
                )}
              </div>

            </div>
          )}

          {/* API KEYS TAB */}
          {activeTab === "apiKeys" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              
              <div style={{
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.3)",
                borderRadius: "14px",
                padding: "16px",
                fontSize: "13px",
                color: "#9ab",
                lineHeight: "1.7",
              }}>
                <div style={{ color: "#00d4ff", fontWeight: "700", marginBottom: "8px" }}>
                  🔑 {lang === "en" ? "Multi-API Power" : "মাল্টি-API পাওয়ার"}
                </div>
                {lang === "en" ? (
                  <>
                    Add API keys for one or more providers. The tool will use your selected provider.<br/><br/>
                    <strong style={{ color: "#e8dcc8" }}>Recommended:</strong> AgentRouter (you have $280 credit!) - auto-routes to best models<br/><br/>
                    All keys are stored locally in your browser. Never sent to our servers.
                  </>
                ) : (
                  <>
                    এক বা একাধিক প্রোভাইডারের জন্য API কী যোগ করুন। টুল আপনার সিলেক্ট করা প্রোভাইডার ব্যবহার করবে।<br/><br/>
                    <strong style={{ color: "#e8dcc8" }}>সুপারিশকৃত:</strong> AgentRouter (আপনার $২৮০ ক্রেডিট আছে!) - সেরা মডেলে অটো-রাউট করে<br/><br/>
                    সকল কী আপনার ব্রাউজারে লোকালি সংরক্ষিত। কখনো আমাদের সার্ভারে পাঠানো হয় না।
                  </>
                )}
              </div>

              {/* API Key Inputs */}
              {API_PROVIDERS.map(provider => (
                <div key={provider.id}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <span style={{ fontSize: "20px" }}>{provider.icon}</span>
                    <div>
                      <div style={{ fontSize: "13px", color: provider.color, fontWeight: "600" }}>
                        {provider.name}
                        {provider.id === "agentrouter" && <span style={{ marginLeft: "8px", fontSize: "11px", background: "rgba(0,212,255,0.2)", padding: "2px 8px", borderRadius: "10px" }}>💰 $280 credit</span>}
                      </div>
                      <div style={{ fontSize: "11px", color: "#6a5a3a", marginTop: "2px" }}>{provider.desc}</div>
                    </div>
                  </div>
                  <input
                    type="password"
                    value={apiKeys[provider.id] || ""}
                    onChange={e => updateApiKey(provider.id, e.target.value)}
                    placeholder={provider.keyPlaceholder}
                    style={{
                      width: "100%",
                      background: "rgba(0,0,0,0.3)",
                      border: `1px solid ${provider.color}55`,
                      borderRadius: "10px",
                      padding: "12px",
                      color: "#e8dcc8",
                      fontSize: "12px",
                      boxSizing: "border-box",
                      fontFamily: "monospace",
                    }}
                  />
                </div>
              ))}

              {/* Save Button */}
              <button
                onClick={saveApiKeys}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #00d4ff, #9333ea, #10a37f)",
                  border: "none",
                  borderRadius: "14px",
                  color: "#fff",
                  padding: "16px",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(0,212,255,0.3)",
                }}
              >
                {t.saveKey}
              </button>

              {/* API Links */}
              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px",
                padding: "14px",
                fontSize: "11px",
                color: "#8a7a5a",
                lineHeight: "1.8",
              }}>
                <div style={{ color: "#f5c842", fontWeight: "600", marginBottom: "8px" }}>
                  {lang === "en" ? "Get API Keys:" : "API কী পান:"}
                </div>
                • AgentRouter: <a href="https://agentrouter.ai" target="_blank" rel="noopener noreferrer" style={{ color: "#00d4ff" }}>agentrouter.ai</a><br/>
                • OpenRouter: <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" style={{ color: "#9333ea" }}>openrouter.ai/keys</a><br/>
                • Gemini: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: "#4285f4" }}>aistudio.google.com/app/apikey</a><br/>
                • ChatGPT: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style={{ color: "#10a37f" }}>platform.openai.com/api-keys</a><br/>
                • Claude: <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" style={{ color: "#f5c842" }}>console.anthropic.com/settings/keys</a>
              </div>

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
                    background: "linear-gradient(135deg, rgba(245,200,66,0.12), rgba(0,212,255,0.08))",
                    borderRadius: "14px", padding: "16px",
                    border: "1px solid rgba(245,200,66,0.3)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <span style={{ fontSize: "32px" }}>{result.scene.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "16px", fontWeight: "700", color: "#f5c842" }}>
                          {result.scene[lang]}
                        </div>
                        <div style={{ fontSize: "11px", color: "#8a7a5a", marginTop: "2px" }}>
                          {result.style[lang]} · {result.time[lang]} · {result.region[lang]}
                        </div>
                      </div>
                      <div style={{ fontSize: "10px", color: "#00d4ff", textAlign: "right" }}>
                        🤖 {result.generatedBy}
                      </div>
                    </div>
                    {result.viral_score_prediction && (
                      <div style={{ fontSize: "11px", color: "#00d4ff", marginTop: "8px", fontStyle: "italic" }}>
                        🔥 {result.viral_score_prediction}
                      </div>
                    )}
                  </div>

                  {/* Master Video Prompt */}
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "2px solid rgba(0,212,255,0.4)",
                    borderRadius: "14px", padding: "16px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ fontSize: "14px", color: "#00d4ff", fontWeight: "700" }}>
                        🎬 {lang === "en" ? "MASTER Video Prompt (Cinema-Level)" : "মাস্টার ভিডিও প্রম্পট (সিনেমা-লেভেল)"}
                      </div>
                      <CopyButton text={result.master_video_prompt} lang={lang} />
                    </div>
                    <div style={{
                      fontSize: "11px", color: "#ccc", lineHeight: "1.8",
                      background: "rgba(0,0,0,0.4)", borderRadius: "10px", padding: "14px",
                      maxHeight: "400px", overflowY: "auto",
                      whiteSpace: "pre-wrap",
                      border: "1px solid rgba(0,212,255,0.2)",
                    }}>
                      {result.master_video_prompt}
                    </div>
                  </div>

                  {/* Short Video Prompt */}
                  {result.short_video_prompt && (
                    <div style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(126,200,160,0.3)",
                      borderRadius: "14px", padding: "16px",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <div style={{ fontSize: "14px", color: "#7ec8a0", fontWeight: "700" }}>
                          ⚡ {lang === "en" ? "Short Prompt (Quick Gen)" : "শর্ট প্রম্পট (দ্রুত জেন)"}
                        </div>
                        <CopyButton text={result.short_video_prompt} lang={lang} />
                      </div>
                      <div style={{
                        fontSize: "12px", color: "#ccc", lineHeight: "1.7",
                        background: "rgba(0,0,0,0.3)", borderRadius: "10px", padding: "12px",
                      }}>
                        {result.short_video_prompt}
                      </div>
                    </div>
                  )}

                  {/* Scene Breakdown */}
                  {result.scene_breakdown_10sec && (
                    <div style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(232,160,69,0.3)",
                      borderRadius: "14px", padding: "16px",
                    }}>
                      <div style={{ fontSize: "14px", color: "#e8a045", fontWeight: "700", marginBottom: "12px" }}>
                        🎞️ {lang === "en" ? "10-Second Breakdown" : "১০-সেকেন্ড ব্রেকডাউন"}
                      </div>
                      {result.scene_breakdown_10sec.map((scene, i) => (
                        <div key={i} style={{
                          background: "rgba(0,0,0,0.3)",
                          borderRadius: "10px",
                          padding: "12px",
                          marginBottom: "10px",
                          fontSize: "12px",
                          color: "#ccc",
                          border: "1px solid rgba(232,160,69,0.2)",
                        }}>
                          <div style={{ 
                            color: "#e8a045", 
                            fontWeight: "700", 
                            marginBottom: "6px", 
                            display: "flex", 
                            justifyContent: "space-between" 
                          }}>
                            <span>{scene.timestamp}</span>
                            <span style={{ fontSize: "10px", opacity: 0.8 }}>{scene.shot_type}</span>
                          </div>
                          <div style={{ marginBottom: "6px", lineHeight: "1.6" }}>{scene.visual_action}</div>
                          <div style={{ 
                            fontSize: "11px", 
                            opacity: 0.7, 
                            display: "grid", 
                            gridTemplateColumns: "1fr 1fr", 
                            gap: "6px", 
                            marginTop: "6px", 
                            paddingTop: "6px", 
                            borderTop: "1px solid rgba(255,255,255,0.1)" 
                          }}>
                            <div>📹 {scene.camera_movement}</div>
                            <div>🎭 {scene.emotional_beat}</div>
                          </div>
                          {scene.lighting_change && (
                            <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "4px" }}>
                              💡 {scene.lighting_change}
                            </div>
                          )}
                          <div style={{ fontSize: "11px", opacity: 0.7, fontStyle: "italic", marginTop: "6px" }}>
                            🔊 {scene.audio_suggestion}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Cultural Authenticity */}
                  {result.cultural_authenticity_checklist && (
                    <div style={{
                      background: "rgba(212,135,106,0.08)",
                      border: "1px solid rgba(212,135,106,0.3)",
                      borderRadius: "14px",
                      padding: "16px",
                    }}>
                      <div style={{ fontSize: "14px", color: "#d4876a", fontWeight: "700", marginBottom: "10px" }}>
                        🏛️ {lang === "en" ? "Cultural Authenticity Checklist" : "সাংস্কৃতিক সত্যতা চেকলিস্ট"}
                      </div>
                      <div style={{ fontSize: "12px", color: "#d4876a", lineHeight: "1.8" }}>
                        {result.cultural_authenticity_checklist.map((item, i) => (
                          <div key={i} style={{ marginBottom: "6px", paddingLeft: "12px", position: "relative" }}>
                            <span style={{ position: "absolute", left: 0 }}>✓</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lighting & Color Grading */}
                  {result.lighting_technical_notes && (
                    <div style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,200,100,0.3)",
                      borderRadius: "14px",
                      padding: "16px",
                    }}>
                      <div style={{ fontSize: "14px", color: "#f5c842", fontWeight: "700", marginBottom: "8px" }}>
                        💡 {lang === "en" ? "Professional Lighting Notes" : "প্রফেশনাল লাইটিং নোট"}
                      </div>
                      <div style={{ fontSize: "12px", color: "#ccc", lineHeight: "1.7", marginBottom: "12px" }}>
                        {result.lighting_technical_notes}
                      </div>
                      {result.color_grading_preset && (
                        <>
                          <div style={{ fontSize: "14px", color: "#f5c842", fontWeight: "700", marginBottom: "8px", marginTop: "12px" }}>
                            🎨 {lang === "en" ? "Color Grading Preset" : "কালার গ্রেডিং প্রিসেট"}
                          </div>
                          <div style={{ fontSize: "12px", color: "#ccc", lineHeight: "1.7" }}>
                            {result.color_grading_preset}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* AI Optimization Tags */}
                  {result.ai_model_optimization_tags && (
                    <div style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(147,51,234,0.3)",
                      borderRadius: "14px",
                      padding: "16px",
                    }}>
                      <div style={{ fontSize: "14px", color: "#9333ea", fontWeight: "700", marginBottom: "10px" }}>
                        🤖 {lang === "en" ? "AI Model Optimization Tags" : "AI মডেল অপটিমাইজেশন ট্যাগ"}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {result.ai_model_optimization_tags.map((tag, i) => (
                          <span key={i} style={{
                            background: "rgba(147,51,234,0.15)",
                            border: "1px solid rgba(147,51,234,0.3)",
                            color: "#9333ea",
                            borderRadius: "16px",
                            padding: "4px 10px",
                            fontSize: "11px",
                          }}>
                            {tag}
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
                        🇧🇩 {lang === "en" ? "Bangla Caption (Viral)" : "বাংলা ক্যাপশন (ভাইরাল)"}
                      </div>
                      <CopyButton text={result.caption_bangla_viral} lang={lang} />
                    </div>
                    <div style={{
                      fontSize: "13px", color: "#e8dcc8", lineHeight: "1.8",
                      fontFamily: "'Noto Serif Bengali', serif",
                      whiteSpace: "pre-wrap",
                    }}>
                      {result.caption_bangla_viral}
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
                        🌍 {lang === "en" ? "English Caption" : "ইংরেজি ক্যাপশন"}
                      </div>
                      <CopyButton text={result.caption_english_international} lang={lang} />
                    </div>
                    <div style={{
                      fontSize: "13px", color: "#ccc", lineHeight: "1.8",
                      whiteSpace: "pre-wrap",
                    }}>
                      {result.caption_english_international}
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
                        🏷️ {lang === "en" ? "Trending Hashtags" : "ট্রেন্ডিং হ্যাশট্যাগ"} ({result.hashtags.length})
                      </div>
                      <CopyButton text={result.hashtags.join(" ")} label={t.copyAll} lang={lang} />
                    </div>
                    <div style={{ lineHeight: "2", fontSize: "12px" }}>
                      {result.hashtags.map((tag, i) => (
                        <span key={i} style={{
                          display: "inline-block",
                          background: i < 10 ? "rgba(245,200,66,0.15)" : "rgba(0,212,255,0.1)",
                          border: `1px solid ${i < 10 ? "#f5c84255" : "#00d4ff44"}`,
                          color: i < 10 ? "#f5c842" : "#00d4ff",
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
                  {result.posting_strategy_2026 && (
                    <div style={{
                      background: "rgba(126,200,160,0.08)",
                      border: "1px solid rgba(126,200,160,0.3)",
                      borderRadius: "14px",
                      padding: "16px",
                    }}>
                      <div style={{ fontSize: "14px", color: "#7ec8a0", fontWeight: "700", marginBottom: "10px" }}>
                        📱 {lang === "en" ? "2026 Posting Strategy" : "২০২৬ পোস্টিং স্ট্র্যাটেজি"}
                      </div>
                      <div style={{ fontSize: "12px", color: "#9ab", lineHeight: "1.8" }}>
                        <strong>Best Time:</strong> {result.posting_strategy_2026.best_time_bd}<br/>
                        <strong>Caption Length:</strong> {result.posting_strategy_2026.caption_length}<br/>
                        <strong>Hashtag Strategy:</strong> {result.posting_strategy_2026.hashtag_strategy}<br/>
                        <strong>Engagement:</strong> {result.posting_strategy_2026.engagement_tactics}<br/>
                        <strong>Platform Adaptation:</strong> {result.posting_strategy_2026.cross_platform_adaptation}
                      </div>
                    </div>
                  )}

                  {/* Music Suggestions */}
                  {result.music_suggestions && (
                    <div style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "14px",
                      padding: "16px",
                    }}>
                      <div style={{ fontSize: "14px", color: "#f5c842", fontWeight: "700", marginBottom: "10px" }}>
                        🎵 {lang === "en" ? "Music Suggestions" : "মিউজিক সাজেশন"}
                      </div>
                      <div style={{ fontSize: "12px", color: "#ccc", lineHeight: "1.8" }}>
                        {result.music_suggestions.map((music, i) => (
                          <div key={i} style={{ marginBottom: "6px" }}>• {music}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Viral Psychology */}
                  {result.viral_psychology_analysis && (
                    <div style={{
                      background: "rgba(255,100,100,0.06)",
                      border: "1px solid rgba(255,100,100,0.3)",
                      borderRadius: "14px",
                      padding: "16px",
                      fontSize: "12px",
                      color: "#ffaaaa",
                      lineHeight: "1.7",
                    }}>
                      <div style={{ fontWeight: "700", marginBottom: "6px" }}>
                        🧠 {lang === "en" ? "Viral Psychology Analysis" : "ভাইরাল সাইকোলজি অ্যানালাইসিস"}
                      </div>
                      {result.viral_psychology_analysis}
                    </div>
                  )}

                  {/* Generate Another */}
                  <button onClick={() => { setActiveTab("generator"); setResult(null); }} style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #00d4ff, #9333ea)",
                    border: "none",
                    borderRadius: "14px",
                    color: "#fff",
                    padding: "16px",
                    fontSize: "15px",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(0,212,255,0.3)",
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
