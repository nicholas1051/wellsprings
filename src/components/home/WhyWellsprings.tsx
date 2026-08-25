"use client";

import { useState } from "react";

const PANELS = [
  {
    num: "01",
    title: "Prime Location",
    desc: "Situated in Jericho, one of Ibadan's most established and connected residential neighbourhoods.",
    gradient: "linear-gradient(140deg,#1c2a1a,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Gated Community",
    desc: "A secured, gated estate with controlled access at two entry points — privacy and safety built into the design.",
    gradient: "linear-gradient(140deg,#191919,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 21V9l8-6 8 6v12M4 21h16M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Quality Build",
    desc: "Premium materials, professional finishes, and construction standards that stand the test of time.",
    gradient: "linear-gradient(140deg,#2a1a12,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Clear Title",
    desc: "Transparent documentation with Governor's Consent title — every purchase comes with full legal backing.",
    gradient: "linear-gradient(140deg,#12242c,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
        <path d="M9 12h6M9 16h6M9 8h2" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Flexible Payment",
    desc: "Outright purchase with discount, structured instalments over 6 to 12 months, or mortgage facilitation.",
    gradient: "linear-gradient(140deg,#0d232a,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7.5v9M14.5 9.8c0-1-1-1.8-2.5-1.8s-2.5.7-2.5 1.7c0 2.6 5 1.3 5 3.9 0 1-1 1.7-2.5 1.7s-2.5-.8-2.5-1.8" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Modern Design",
    desc: "Contemporary architecture with thoughtful layouts — from spacious duplexes to elegant apartments.",
    gradient: "linear-gradient(140deg,#2a1a24,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M3 21h18M5 21V7l8-4 8 4v14" />
        <path d="M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
      </svg>
    ),
  },
  {
    num: "07",
    title: "Estate Management",
    desc: "Professional facility management keeps the estate maintained, secure, and running smoothly year-round.",
    gradient: "linear-gradient(140deg,#182c17,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
      </svg>
    ),
  },
  {
    num: "08",
    title: "Strong Investment",
    desc: "Jericho's property values continue to grow — a solid long-term asset for owner-occupiers and investors alike.",
    gradient: "linear-gradient(140deg,#2a2312,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

const CSS = `
  .whyw-scope{
    background:#17263A;
    color:#f4efe4;
    font-family:var(--font-body);
    -webkit-font-smoothing:antialiased;
  }
  .whyw-scope *{box-sizing:border-box;}

  .whyw{
    position:relative;
    background:#17263A;
    padding:12vh 24px 14vh;
    overflow:hidden;
  }
  .whyw::before{
    content:"";
    position:absolute; inset:0;
    background:
      radial-gradient(ellipse 60% 50% at 10% 0%, rgba(105,157,214,.06), transparent 60%),
      radial-gradient(ellipse 50% 50% at 100% 100%, rgba(105,157,214,.05), transparent 60%);
    pointer-events:none;
  }

  .whyw__inner{ position:relative; max-width:1180px; margin:0 auto; }

  .whyw__head{
    max-width:520px;
    margin:0 0 52px;
  }
  .whyw-kicker{
    font-size:11px;
    letter-spacing:.32em;
    text-transform:uppercase;
    color:#699DD6;
    margin:0 0 18px;
  }
  .whyw__title{
    font-family:var(--font-heading);
    font-weight:600;
    font-size:clamp(30px,3.6vw,44px);
    line-height:1.12;
    letter-spacing:-.01em;
    margin:0 0 16px;
  }
  .whyw__title em{ font-style:italic; color:#8BB8E8; }
  .whyw__sub{
    font-size:15px;
    line-height:1.65;
    color:#94A3B8;
    margin:0;
    max-width:44ch;
  }

  .whyw-rail{
    display:flex;
    align-items:stretch;
    gap:6px;
    height:460px;
    width:100%;
  }

  .whyw-panel{
    position:relative;
    flex:1 1 0;
    min-width:58px;
    border-radius:16px;
    overflow:hidden;
    cursor:pointer;
    background-size:cover;
    background-position:center;
    transition:flex-grow .65s cubic-bezier(.16,1,.3,1);
    outline:none;
  }
  .whyw-rail:hover .whyw-panel{ flex-grow:.55; }
  .whyw-panel:hover{ flex-grow:7 !important; }
  .whyw-panel.is-expanded{ flex-grow:7 !important; }
  .whyw-panel:focus-visible{ box-shadow:inset 0 0 0 2px #8BB8E8; }

  .whyw-panel::after{
    content:"";
    position:absolute; inset:0;
    background:linear-gradient(to top, rgba(10,8,6,.92) 0%, rgba(10,8,6,.35) 46%, rgba(10,8,6,.55) 100%);
    transition:background .5s cubic-bezier(.16,1,.3,1);
  }

  .whyw-num{
    position:absolute;
    top:18px; left:18px;
    font-size:11px;
    letter-spacing:.08em;
    color:#8BB8E8;
    font-variant-numeric:tabular-nums;
    z-index:2;
    opacity:.9;
  }

  .whyw-icon{
    position:absolute;
    top:16px; right:16px;
    width:34px; height:34px;
    border-radius:50%;
    border:1px solid #699DD6;
    background:rgba(23,38,58,.55);
    display:flex; align-items:center; justify-content:center;
    color:#8BB8E8;
    z-index:2;
  }
  .whyw-icon svg{ width:16px; height:16px; }

  .whyw-ptitle{
    position:absolute;
    left:18px; bottom:20px;
    right:18px;
    font-family:var(--font-heading);
    font-style:italic;
    font-weight:600;
    color:#f4efe4;
    font-size:17px;
    line-height:1.15;
    writing-mode:vertical-rl;
    transform:rotate(180deg);
    white-space:nowrap;
    z-index:2;
    transition:font-size .3s cubic-bezier(.16,1,.3,1);
  }

  .whyw-pdesc{
    position:absolute;
    left:22px; right:22px; bottom:20px;
    z-index:2;
    opacity:0;
    max-height:0;
    overflow:hidden;
    transition:opacity .35s cubic-bezier(.16,1,.3,1) .1s;
  }
  .whyw-pdesc p{
    margin:0;
    font-family:var(--font-body);
    font-size:13px;
    line-height:1.6;
    color:#94A3B8;
    max-width:36ch;
  }

  .whyw-panel.is-expanded .whyw-ptitle,
  .whyw-panel:hover .whyw-ptitle{
    writing-mode:horizontal-tb;
    transform:none;
    font-size:24px;
    white-space:normal;
    margin-bottom:8px;
  }
  .whyw-panel.is-expanded .whyw-pdesc,
  .whyw-panel:hover .whyw-pdesc{
    opacity:1;
    max-height:120px;
  }
  .whyw-panel.is-expanded .whyw-ptitle{ position:static; margin:0 0 8px; }
  .whyw-panel.is-expanded .whyw-pdesc{ position:static; }
  .whyw-panel.is-expanded{ display:flex; flex-direction:column; justify-content:flex-end; padding:22px; }
  .whyw-panel.is-expanded .whyw-num,
  .whyw-panel.is-expanded .whyw-icon{ position:absolute; }

  @media (hover:hover){
    .whyw-panel:hover{ display:flex; flex-direction:column; justify-content:flex-end; padding:22px; }
    .whyw-panel:hover .whyw-ptitle,
    .whyw-panel:hover .whyw-pdesc{ position:static; margin:0; }
    .whyw-panel:hover .whyw-ptitle{ margin-bottom:8px; }
  }

  .whyw-hint{
    margin:18px 2px 0;
    font-size:11px;
    letter-spacing:.14em;
    text-transform:uppercase;
    color:#94A3B8;
    opacity:.7;
  }

  @media (max-width:760px){
    .whyw-rail{
      flex-direction:column;
      height:auto;
      max-height:640px;
      overflow:hidden;
      gap:5px;
    }
    .whyw-panel{ min-width:0; min-height:52px; flex:1 1 0; }
    .whyw-rail:hover .whyw-panel{ flex-grow:1; }
    .whyw-panel:hover{ flex-grow:1 !important; }
    .whyw-panel.is-expanded{ flex-grow:6 !important; }
    .whyw-ptitle{
      writing-mode:horizontal-tb;
      transform:none;
      font-size:15px;
      bottom:auto; top:50%;
    }
    .whyw-panel:not(.is-expanded) .whyw-ptitle{ transform:translateY(-50%); }
    .whyw-panel.is-expanded .whyw-ptitle{
      position:static; transform:none; top:auto; font-size:20px;
    }
    .whyw-panel:not(.is-expanded) .whyw-pdesc{ display:none; }
    @media (hover:hover){ .whyw-panel:hover{ display:block; padding:0; } }
    .whyw-panel.is-expanded{ display:flex; flex-direction:column; justify-content:flex-end; padding:18px; }
  }

  @media (prefers-reduced-motion:reduce){
    .whyw-panel{ transition:none; }
  }
`;

export function WhyWellsprings() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle(index);
    }
  };

  return (
    <div className="whyw-scope">
      <style>{CSS}</style>

      <section className="whyw" id="whywellsprings">
        <div className="whyw__inner">
          <div className="whyw__head">
            <p className="whyw-kicker">Why Wellsprings</p>
            <h2 className="whyw__title">
              Live well, <em>right where you live.</em>
            </h2>
            <p className="whyw__sub">
              Eight reasons Wellsprings stands apart — hover or tap a panel to explore.
            </p>
          </div>

          <div className="whyw-rail">
            {PANELS.map((panel, index) => (
              <div
                key={panel.num}
                className={`whyw-panel${activeIndex === index ? " is-expanded" : ""}`}
                tabIndex={0}
                style={{ backgroundImage: panel.gradient }}
                onClick={() => handleToggle(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                <span className="whyw-num">{panel.num}</span>
                <span className="whyw-icon">{panel.icon}</span>
                <h3 className="whyw-ptitle">{panel.title}</h3>
                <div className="whyw-pdesc">
                  <p>{panel.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="whyw-hint">Hover to explore · tap on mobile</p>
        </div>
      </section>
    </div>
  );
}
