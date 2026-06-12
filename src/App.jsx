import { useState } from "react";

// Features from Truepeer's actual website use cases
const FEATURES = [
  { val: "Product Demo Videos", desc: "Turn screen recordings into polished product demos" },
  { val: "Customer Onboarding", desc: "Create step-by-step onboarding guides instantly" },
  { val: "Internal SOPs & Wikis", desc: "Auto-generate SOPs from any workflow recording" },
  { val: "Sales Enablement", desc: "Build sales decks and walkthroughs from recordings" },
  { val: "Employee Training", desc: "Create training videos and documentation at scale" },
  { val: "Customer Support Guides", desc: "Turn support responses into reusable how-to videos" },
];

const HOOKS = [
  { val: "Problem-first", label: 'Problem-first — "I used to spend 3 hours on every doc..."' },
  { val: "Stat-led", label: 'Stat-led — "80% of SOPs are never actually read..."' },
  { val: "Story-led", label: 'Story — "My manager asked me to document everything..."' },
  { val: "Bold claim", label: 'Bold claim — "This replaced my entire documentation workflow..."' }
];

const TONES = [
  { val: "Casual and relatable", label: "Casual & relatable — feels like a real person talking" },
  { val: "Punchy and energetic", label: "Punchy & energetic — fast-paced, hooks every line" },
  { val: "Dry and witty", label: "Dry & witty — subtle humour, deadpan delivery" },
  { val: "Authoritative and credible", label: "Authoritative — confident, data-backed, credible" }
];

const VARIANT_COLORS = ["#7c6af7", "#f76a9a"];

function Chip({ label, sublabel, selected, onClick }) {
  return (
    <div onClick={onClick} style={{
      padding: sublabel ? "10px 16px" : "7px 16px",
      borderRadius: "10px",
      border: `1px solid ${selected ? "#7c6af7" : "#1e1e2e"}`,
      background: selected ? "#1a1535" : "#0a0a0f",
      color: selected ? "#a89af7" : "#6a6888",
      fontSize: "13px",
      cursor: "pointer",
      transition: "all 0.15s",
      userSelect: "none",
      lineHeight: "1.4"
    }}>
      <div style={{ color: selected ? "#c8c4e0" : "#9a98b0", fontWeight: 500 }}>{label}</div>
      {sublabel && <div style={{ fontSize: "11px", color: selected ? "#7c6af7" : "#4a4868", marginTop: "2px" }}>{sublabel}</div>}
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{
      fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
      textTransform: "uppercase", color: "#3a3858", marginBottom: "8px",
      display: "flex", alignItems: "center", gap: "8px"
    }}>
      {text}
      <div style={{ flex: 1, height: "1px", background: "#1e1e2e" }} />
    </div>
  );
}

function ScriptCard({ variant, index, demoLink, demoName, uploadedFile, demoTab, demoDescription }) {
  const [showRaw, setShowRaw] = useState(false);
  const color = VARIANT_COLORS[index];

  const heygenScript = variant.heygen_script || "";

  const handleSelectAll = (e) => {
    e.target.select();
  };

  return (
    <div style={{
      background: "#111118",
      border: "1px solid #1e1e2e",
      borderRadius: "12px",
      marginBottom: "16px",
      overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{
        padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #1e1e2e"
      }}>
        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color }}>
          Version {variant.id} — {variant.angle}
        </span>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: "#5a5870" }}>{variant.word_count} words · {variant.estimated_duration}</span>
          <button onClick={() => setShowRaw(r => !r)} style={{
            padding: "4px 14px",
            background: showRaw ? "#0f1a15" : "#1a1535",
            border: `1px solid ${showRaw ? "#2a5040" : "#3a3060"}`,
            borderRadius: "6px",
            color: showRaw ? "#6af7c8" : "#a89af7",
            fontSize: "11px", fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit"
          }}>
            {showRaw ? "Hide script ↑" : "Copy for HeyGen ↓"}
          </button>
        </div>
      </div>

      {/* Raw script panel — click to select all */}
      {showRaw && (
        <div style={{ padding: "0 20px 16px" }}>
          <div style={{ fontSize: "11px", color: "#5a5870", padding: "12px 0 6px" }}>
            Click inside the box → <kbd style={{ background: "#1e1e2e", border: "1px solid #2e2e3e", borderRadius: "4px", padding: "1px 5px", fontSize: "10px", color: "#a89af7" }}>Ctrl+A</kbd> / <kbd style={{ background: "#1e1e2e", border: "1px solid #2e2e3e", borderRadius: "4px", padding: "1px 5px", fontSize: "10px", color: "#a89af7" }}>Cmd+A</kbd> then copy — paste directly into HeyGen
          </div>
          <textarea
            readOnly
            onClick={handleSelectAll}
            value={heygenScript}
            rows={14}
            style={{
              width: "100%",
              background: "#0a0a0f",
              border: "1px solid #2a2545",
              borderRadius: "8px",
              color: "#c8c4e0",
              fontSize: "12px",
              padding: "12px 14px",
              fontFamily: "monospace",
              lineHeight: 1.7,
              resize: "none",
              outline: "none",
              cursor: "text",
              boxSizing: "border-box"
            }}
          />
        </div>
      )}

      <div style={{ padding: "20px" }}>

        {/* Hook */}
        <div style={{ marginBottom: "18px" }}>
          <SectionLabel text="Hook — Creator speaks" />
          <div style={{
            background: "#0a0a0f", border: "1px solid #1e1e2e",
            borderRadius: "8px", padding: "12px 16px"
          }}>
            <div style={{ fontSize: "13px", color: "#7c6af7", fontWeight: 600, marginBottom: "6px" }}>🎙 DIALOG</div>
            <div style={{ fontSize: "14px", color: "#e8e6f0", lineHeight: 1.7, fontStyle: "italic" }}>"{variant.hook}"</div>
            <div style={{ fontSize: "11px", color: "#4a4865", marginTop: "8px" }}>💡 HeyGen: Avatar on-screen, full frame, no overlay. Facial expression: engaged.</div>
          </div>
        </div>

        {/* Problem */}
        <div style={{ marginBottom: "18px" }}>
          <SectionLabel text="Problem — Creator speaks" />
          <div style={{
            background: "#0a0a0f", border: "1px solid #1e1e2e",
            borderRadius: "8px", padding: "12px 16px"
          }}>
            <div style={{ fontSize: "13px", color: "#7c6af7", fontWeight: 600, marginBottom: "6px" }}>🎙 DIALOG</div>
            <div style={{ fontSize: "14px", color: "#e8e6f0", lineHeight: 1.7, fontStyle: "italic" }}>"{variant.problem}"</div>
            <div style={{ fontSize: "11px", color: "#4a4865", marginTop: "8px" }}>💡 HeyGen: Avatar small (bottom-left pip), fade in B-roll of someone looking frustrated at laptop.</div>
          </div>
        </div>

        {/* Demo Insert */}
        <div style={{ marginBottom: "18px" }}>
          <SectionLabel text="Demo — Product clip" />
          <div style={{
            background: "#0f0f1a", border: "1px dashed #3a3060",
            borderRadius: "8px", padding: "14px 16px",
            display: "flex", alignItems: "flex-start", gap: "12px"
          }}>
            <div style={{ fontSize: "22px" }}>🎬</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "12px", color: "#a89af7", fontWeight: 600, marginBottom: "6px" }}>
                INSERT DEMO CLIP HERE
              </div>
              {demoTab === "upload" && uploadedFile ? (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "12px", color: "#6af7c8" }}>✅</span>
                  <span style={{ fontSize: "12px", color: "#6af7c8", fontWeight: 600 }}>{uploadedFile.name}</span>
                  <span style={{ fontSize: "11px", color: "#4a4865" }}>({(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB)</span>
                </div>
              ) : demoTab === "drive" && demoLink ? (
                <a href={demoLink} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: "12px", color: "#6af7c8", textDecoration: "none",
                  borderBottom: "1px solid #2a5040", paddingBottom: "1px"
                }}>
                  📁 {demoName || "Open demo from Google Drive →"}
                </a>
              ) : (
                <div style={{ fontSize: "12px", color: "#4a4865" }}>No demo added — skip or go back to Step 2</div>
              )}
              {demoDescription && (
                <div style={{ fontSize: "11px", color: "#5a5870", marginTop: "8px", marginBottom: "4px", fontStyle: "italic", lineHeight: 1.5 }}>
                  📋 "{demoDescription}"
                </div>
              )}
              <div style={{ fontSize: "11px", color: "#4a4865", marginTop: "10px" }}>
                💡 HeyGen: No avatar during demo. Full-screen product recording. Add voiceover narration below:
              </div>
              <div style={{ fontSize: "14px", color: "#c8c4e0", lineHeight: 1.7, marginTop: "6px", fontStyle: "italic" }}>
                "{variant.demo_cue}"
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginBottom: "4px" }}>
          <SectionLabel text="CTA — Creator speaks" />
          <div style={{
            background: "#0a0a0f", border: "1px solid #1e1e2e",
            borderRadius: "8px", padding: "12px 16px"
          }}>
            <div style={{ fontSize: "13px", color: "#7c6af7", fontWeight: 600, marginBottom: "6px" }}>🎙 DIALOG</div>
            <div style={{ fontSize: "14px", color: "#e8e6f0", lineHeight: 1.7, fontStyle: "italic" }}>"{variant.cta}"</div>
            <div style={{ fontSize: "11px", color: "#4a4865", marginTop: "8px" }}>💡 HeyGen: Avatar back full-frame. Add text overlay with CTA link at bottom of screen. Upbeat ending expression.</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState({
    feature: "", pain: "", hook: "", demoLink: "", demoName: "",
    uploadedFile: null, demoTab: "drive", demoDescription: "", tone: "", extra: ""
  });
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Writing your scripts...");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const set = (key, val) => setState(s => ({ ...s, [key]: val }));

  const loadingMsgs = ["Crafting your hooks...", "Writing creator dialogs...", "Adding HeyGen instructions...", "Almost there..."];

  const generate = async () => {
    setError("");
    setLoading(true);
    setResults(null);
    let mi = 0;
    const interval = setInterval(() => {
      mi = (mi + 1) % loadingMsgs.length;
      setLoadingMsg(loadingMsgs[mi]);
    }, 1800);

    const prompt = `You are a UGC video script writer for B2B SaaS, specialising in HeyGen avatar video production.

Generate exactly 2 script variants for a UGC-style video promoting Truepeer (a tool that converts screen recordings into polished videos and step-by-step documentation).

Brief:
- Use case / feature: ${state.feature}
- Core pain point of the audience: ${state.pain}
- Hook style: ${state.hook}
- Tone: ${state.tone}
${state.demoDescription ? `- Demo clip contents: ${state.demoDescription}` : ""}
${state.extra ? `- Extra instructions: ${state.extra}` : ""}

Each script has 4 sections: HOOK, PROBLEM, DEMO_CUE, CTA.

Rules:
- HOOK: 15-25 words. Grabs attention instantly. First person.
- PROBLEM: 25-40 words. Makes the pain feel real and specific. First person.
- DEMO_CUE: 40-60 words. Narrated walkthrough of what is happening on screen during the demo clip. ${state.demoDescription ? `Use the demo contents provided above — reference the actual actions, UI elements, and moments described. Be specific, not generic.` : `Write descriptive narration of what a typical Truepeer demo would show.`} Written in present tense, third person.
- CTA: 15-20 words. Clear, specific, action-oriented. First person. End with "Try Truepeer free" or similar.
- Total words (hook + problem + cta, excluding demo_cue): 55-85 words.
- Conversational, slightly imperfect. NOT polished ad-copy.
- Variant 1: follows the hook style closely, relatable everyday moment.
- Variant 2: more surprising or bold take — unexpected angle, makes you stop scrolling.

For each variant also build a heygen_script — the full HeyGen production script as a plain multi-line string. Use this exact format:

SCENE 1 - HOOK
Type: Avatar dialog
Avatar: Full frame, engaged expression
Dialog: [hook text here]

SCENE 2 - PROBLEM
Type: Avatar dialog
Avatar: Small pip bottom-left, B-roll overlay suggested
Dialog: [problem text here]

SCENE 3 - DEMO
Type: Product screen recording
Avatar: Hidden
Voiceover: [full demo_cue narration here]
Note: Insert demo clip here

SCENE 4 - CTA
Type: Avatar dialog
Avatar: Full frame, upbeat expression
Text overlay: Add CTA link at bottom of screen
Dialog: [cta text here]

Return a JSON object with this exact structure. All string values must be plain text with no nested quotes or special characters that would break JSON parsing:
{
  "variants": [
    {
      "id": 1,
      "angle": "short 4-6 word description",
      "hook": "hook text",
      "problem": "problem text",
      "demo_cue": "demo cue narration",
      "cta": "cta text",
      "word_count": 70,
      "estimated_duration": "46s",
      "heygen_script": "SCENE 1 - HOOK\\nType: Avatar dialog\\nAvatar: Full frame, engaged expression\\nDialog: hook text here\\n\\nSCENE 2 - PROBLEM\\nType: Avatar dialog\\nAvatar: Small pip bottom-left\\nDialog: problem text here\\n\\nSCENE 3 - DEMO\\nType: Product screen recording\\nAvatar: Hidden\\nVoiceover: demo cue here\\nNote: Insert demo clip here\\n\\nSCENE 4 - CTA\\nType: Avatar dialog\\nAvatar: Full frame, upbeat expression\\nText overlay: Add CTA link at bottom\\nDialog: cta text here"
    },
    {
      "id": 2,
      "angle": "short 4-6 word description",
      "hook": "hook text",
      "problem": "problem text",
      "demo_cue": "demo cue narration",
      "cta": "cta text",
      "word_count": 68,
      "estimated_duration": "44s",
      "heygen_script": "SCENE 1 - HOOK\\nType: Avatar dialog\\nAvatar: Full frame, engaged expression\\nDialog: hook text here\\n\\nSCENE 2 - PROBLEM\\nType: Avatar dialog\\nAvatar: Small pip bottom-left\\nDialog: problem text here\\n\\nSCENE 3 - DEMO\\nType: Product screen recording\\nAvatar: Hidden\\nVoiceover: demo cue here\\nNote: Insert demo clip here\\n\\nSCENE 4 - CTA\\nType: Avatar dialog\\nAvatar: Full frame, upbeat expression\\nText overlay: Add CTA link at bottom\\nDialog: cta text here"
    }
  ]
}

Respond with ONLY the JSON object. No explanation, no markdown fences, no preamble.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2500,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await response.json();
      clearInterval(interval);

      if (data.error) {
        throw new Error(data.error.message || "API error");
      }

      const raw = data.content.map(b => b.text || "").join("");
      // Strip any markdown fences and trim
      const clean = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
      const parsed = JSON.parse(clean);
      setResults(parsed.variants);
      setLoading(false);
    } catch (e) {
      clearInterval(interval);
      setLoading(false);
      setError("Something went wrong generating scripts. Please try again.");
    }
  };

  const totalSteps = 3;
  const stepLabels = ["Feature & Pain", "Hook & Demo", "Tone"];
  const canNext = [
    !!(state.feature && state.pain.trim()),
    !!(state.hook),
    !!state.tone
  ];

  const s = {
    app: { maxWidth: "800px", margin: "0 auto", fontFamily: "'Inter', -apple-system, sans-serif", color: "#e8e6f0", padding: "24px 16px" },
    header: { marginBottom: "28px", paddingBottom: "20px", borderBottom: "1px solid #1e1e2e" },
    h1: { fontSize: "15px", fontWeight: 600, color: "#e8e6f0", letterSpacing: "0.04em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" },
    dot: { width: "8px", height: "8px", background: "#7c6af7", borderRadius: "50%", boxShadow: "0 0 8px #7c6af7", flexShrink: 0 },
    sub: { fontSize: "13px", color: "#5a5870", marginTop: "4px" },
    stepBar: { display: "flex", gap: "6px", marginBottom: "28px" },
    qBlock: { background: "#111118", border: "1px solid #1e1e2e", borderRadius: "12px", padding: "20px 24px", marginBottom: "14px" },
    qLabel: { fontSize: "11px", color: "#5a5870", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" },
    qTitle: { fontSize: "14px", color: "#c8c4e0", marginBottom: "14px", lineHeight: 1.5 },
    chipGroup: { display: "flex", flexWrap: "wrap", gap: "8px" },
    chipCol: { display: "flex", flexDirection: "column", gap: "8px" },
    input: {
      width: "100%", background: "#0a0a0f", border: "1px solid #1e1e2e",
      borderRadius: "8px", color: "#e8e6f0", fontSize: "14px",
      padding: "10px 14px", outline: "none", fontFamily: "inherit",
      resize: "vertical", lineHeight: 1.6
    },
    inputInline: {
      width: "100%", background: "#0a0a0f", border: "1px solid #1e1e2e",
      borderRadius: "8px", color: "#e8e6f0", fontSize: "14px",
      padding: "10px 14px", outline: "none", fontFamily: "inherit",
      lineHeight: 1.6
    },
    btnRow: { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" },
    btnGhost: {
      padding: "10px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
      cursor: "pointer", background: "transparent", color: "#5a5870",
      border: "1px solid #1e1e2e", fontFamily: "inherit"
    },
    btnPrimary: (disabled) => ({
      padding: "10px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
      cursor: disabled ? "not-allowed" : "pointer",
      background: disabled ? "#2a2545" : "#7c6af7",
      color: disabled ? "#4a4865" : "#fff",
      border: "none", fontFamily: "inherit"
    })
  };

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh" }}>
      <div style={s.app}>
        <div style={s.header}>
          <div style={s.h1}><div style={s.dot} /> Truepeer UGC Script Generator</div>
          <div style={s.sub}>3 quick questions → 2 HeyGen-ready scripts with creator dialogs</div>
        </div>

        {/* Step bar */}
        {!results && !loading && (
          <div style={s.stepBar}>
            {stepLabels.map((label, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{
                  height: "3px", borderRadius: "2px", marginBottom: "6px",
                  background: i < step ? "#4a3fa8" : i === step ? "#7c6af7" : "#1e1e2e",
                  transition: "background 0.3s"
                }} />
                <div style={{ fontSize: "10px", color: i <= step ? "#7c6af7" : "#3a3858", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "70px 0" }}>
            <div style={{
              width: "36px", height: "36px", border: "2px solid #1e1e2e",
              borderTopColor: "#7c6af7", borderRadius: "50%",
              animation: "spin 0.8s linear infinite", margin: "0 auto 16px"
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ fontSize: "14px", color: "#c8c4e0" }}>{loadingMsg}</div>
            <div style={{ fontSize: "12px", color: "#3a3858", marginTop: "6px" }}>Claude is writing 2 HeyGen-ready scripts</div>
          </div>
        )}

        {/* STEP 0: Feature + Pain */}
        {!loading && !results && step === 0 && (
          <div>
            <div style={s.qBlock}>
              <div style={s.qLabel}>Step 1 of 3</div>
              <div style={s.qTitle}>Which Truepeer use case are you promoting?</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {FEATURES.map(f => (
                  <Chip key={f.val} label={f.val} sublabel={f.desc}
                    selected={state.feature === f.val}
                    onClick={() => set("feature", f.val)} />
                ))}
              </div>
            </div>
            <div style={{ ...s.qBlock }}>
              <div style={s.qLabel}>Pain point</div>
              <div style={s.qTitle}>What's the core frustration of the target audience?</div>
              <textarea style={s.input} rows={2}
                placeholder="e.g. Spends hours making SOPs manually, nobody reads them anyway..."
                value={state.pain}
                onChange={e => set("pain", e.target.value)} />
            </div>
            <div style={s.btnRow}>
              <button style={s.btnPrimary(!canNext[0])} disabled={!canNext[0]} onClick={() => setStep(1)}>Next →</button>
            </div>
          </div>
        )}

        {/* STEP 1: Hook + Demo Link */}
        {!loading && !results && step === 1 && (
          <div>
            <div style={s.qBlock}>
              <div style={s.qLabel}>Step 2 of 3</div>
              <div style={s.qTitle}>What hook style should the script open with?</div>
              <div style={s.chipCol}>
                {HOOKS.map(h => (
                  <Chip key={h.val} label={h.label} selected={state.hook === h.val} onClick={() => set("hook", h.val)} />
                ))}
              </div>
            </div>
            <div style={s.qBlock}>
              <div style={s.qLabel}>Demo clip — optional</div>
              <div style={s.qTitle}>Add the product demo you want inserted into this video</div>

              {/* Tab switcher */}
              <div style={{ display: "flex", gap: "0", marginBottom: "14px", border: "1px solid #1e1e2e", borderRadius: "8px", overflow: "hidden" }}>
                {[{ id: "drive", label: "🔗 Google Drive" }, { id: "upload", label: "⬆ Upload video" }].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => set("demoTab", tab.id)}
                    style={{
                      flex: 1, padding: "8px 0", border: "none",
                      background: state.demoTab === tab.id ? "#1a1535" : "#0a0a0f",
                      color: state.demoTab === tab.id ? "#a89af7" : "#5a5870",
                      fontSize: "12px", fontWeight: 600, cursor: "pointer",
                      fontFamily: "inherit", borderRight: tab.id === "drive" ? "1px solid #1e1e2e" : "none",
                      transition: "all 0.15s"
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Drive tab */}
              {state.demoTab === "drive" && (
                <div>
                  <input
                    type="url"
                    style={s.inputInline}
                    placeholder="https://drive.google.com/file/d/..."
                    value={state.demoLink}
                    onChange={e => set("demoLink", e.target.value)}
                  />
                  {state.demoLink && (
                    <div style={{ marginTop: "10px" }}>
                      <div style={{ fontSize: "11px", color: "#5a5870", marginBottom: "4px" }}>Label this clip (optional)</div>
                      <input
                        type="text"
                        style={{ ...s.inputInline, fontSize: "13px" }}
                        placeholder="e.g. Screen → Video demo (0:28)"
                        value={state.demoName}
                        onChange={e => set("demoName", e.target.value)}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Upload tab */}
              {state.demoTab === "upload" && (
                <div>
                  <label style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", gap: "8px",
                    border: "1px dashed #2a2545", borderRadius: "8px",
                    padding: "24px 16px", cursor: "pointer",
                    background: state.uploadedFile ? "#0f0f1a" : "#0a0a0f",
                    transition: "all 0.2s"
                  }}>
                    <input
                      type="file"
                      accept="video/*"
                      style={{ display: "none" }}
                      onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                          set("uploadedFile", file);
                          set("demoName", file.name);
                        }
                      }}
                    />
                    {state.uploadedFile ? (
                      <>
                        <div style={{ fontSize: "22px" }}>✅</div>
                        <div style={{ fontSize: "13px", color: "#6af7c8", fontWeight: 600 }}>{state.uploadedFile.name}</div>
                        <div style={{ fontSize: "11px", color: "#4a4865" }}>
                          {(state.uploadedFile.size / (1024 * 1024)).toFixed(1)} MB · Click to replace
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ fontSize: "22px" }}>🎬</div>
                        <div style={{ fontSize: "13px", color: "#7a7890" }}>Click to upload a video file</div>
                        <div style={{ fontSize: "11px", color: "#3a3858" }}>MP4, MOV, WebM — any size</div>
                      </>
                    )}
                  </label>
                </div>
              )}

              <div style={{ fontSize: "11px", color: "#3a3858", marginTop: "10px" }}>
                💡 The script will include a dedicated demo scene. You can add this now or later.
              </div>

              {/* Demo description — always shown */}
              <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #1e1e2e" }}>
                <div style={{ fontSize: "11px", color: "#7c6af7", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>
                  What happens in this demo? ✦
                </div>
                <div style={{ fontSize: "12px", color: "#5a5870", marginBottom: "8px" }}>
                  Describe what the viewer will see — step by step. Claude will use this to write the voiceover narration directly into the script.
                </div>
                <textarea
                  style={{ ...s.input, fontSize: "13px" }}
                  rows={3}
                  placeholder="e.g. The screen shows someone pasting a raw Loom link into Truepeer. Within 3 seconds, a polished video appears with captions, branding, and chapters auto-generated. Then it shows the one-click share link being copied."
                  value={state.demoDescription}
                  onChange={e => set("demoDescription", e.target.value)}
                />
              </div>
            </div>
            <div style={s.btnRow}>
              <button style={s.btnGhost} onClick={() => setStep(0)}>← Back</button>
              <button style={s.btnPrimary(!canNext[1])} disabled={!canNext[1]} onClick={() => setStep(2)}>Next →</button>
            </div>
          </div>
        )}

        {/* STEP 2: Tone + Extra */}
        {!loading && !results && step === 2 && (
          <div>
            <div style={s.qBlock}>
              <div style={s.qLabel}>Step 3 of 3</div>
              <div style={s.qTitle}>What tone should the creator use?</div>
              <div style={s.chipCol}>
                {TONES.map(t => (
                  <Chip key={t.val} label={t.label} selected={state.tone === t.val} onClick={() => set("tone", t.val)} />
                ))}
              </div>
            </div>
            <div style={s.qBlock}>
              <div style={s.qLabel}>Optional</div>
              <div style={s.qTitle}>Anything else to include? (CTA preference, things to avoid…)</div>
              <textarea style={s.input} rows={2}
                placeholder="e.g. End with link to free trial. Don't mention competitors by name."
                value={state.extra}
                onChange={e => set("extra", e.target.value)} />
            </div>
            {error && (
              <div style={{ background: "#1a0f0f", border: "1px solid #3a1a1a", borderRadius: "8px", padding: "14px 18px", color: "#f76a6a", fontSize: "13px", marginTop: "14px" }}>
                {error}
              </div>
            )}
            <div style={s.btnRow}>
              <button style={s.btnGhost} onClick={() => setStep(1)}>← Back</button>
              <button style={s.btnPrimary(!canNext[2])} disabled={!canNext[2]} onClick={generate}>Generate Scripts ✦</button>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && results && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#e8e6f0" }}>2 HeyGen-Ready Scripts</div>
              <div style={{ fontSize: "12px", color: "#5a5870" }}>{state.feature} · {state.tone}</div>
            </div>

            {results.map((v, i) => (
              <ScriptCard key={v.id} variant={v} index={i}
                demoLink={state.demoLink} demoName={state.demoName}
                uploadedFile={state.uploadedFile} demoTab={state.demoTab}
                demoDescription={state.demoDescription} />
            ))}

            <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "24px", borderTop: "1px solid #1e1e2e" }}>
              <div style={{ fontSize: "12px", color: "#3a3858", marginBottom: "12px" }}>Want different angles? Regenerate or start over.</div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button style={s.btnGhost} onClick={() => { setResults(null); setStep(0); setState({ feature: "", pain: "", hook: "", demoLink: "", demoName: "", uploadedFile: null, demoTab: "drive", demoDescription: "", tone: "", extra: "" }); }}>
                  Start over
                </button>
                <button style={s.btnPrimary(false)} onClick={generate}>Regenerate ↺</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
