"use client";

import { useState } from "react";

const PANELS = [
  {
    num: "01",
    title: "Football Pitch",
    desc: "A 5-a-side pitch designed for fitness, fun, and friendly competition — stay active while connecting with your community.",
    gradient: "linear-gradient(140deg,#1c2a1a,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 6.5 15 9l-1 3.7-4 0L9 9zM12 6.5V3.5M9 12.7l-3 2.3M15 12.7l3 2.3M9.6 15.7 8.8 19M14.4 15.7l.8 3.3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Tennis Court",
    desc: "Take a break from your routine and enjoy a game on our tennis court, made for relaxation, fitness, and quality time.",
    gradient: "linear-gradient(140deg,#12242c,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" />
        <path d="M12 15v6M9 21h6M4.5 9h15" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Basketball Court",
    desc: "Step onto the court whenever you like for a quick game — sharpen your skills, connect, and stay active.",
    gradient: "linear-gradient(140deg,#2a1a12,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M4 8.5h16M4 15.5h16M12 3.5v17M8 6c1.5 2.4 1.5 9.6 0 12M16 6c-1.5 2.4-1.5 9.6 0 12" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Swimming Pool",
    desc: "Experience resort-style living with a pool that offers the perfect setting for relaxation and family time.",
    gradient: "linear-gradient(140deg,#0d232a,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M3 17c1.3 1 2.6 1 4 0s2.7-1 4 0 2.6 1 4 0 2.7-1 4 0M3 12.5c1.3 1 2.6 1 4 0s2.7-1 4 0 2.6 1 4 0 2.7-1 4 0M6 8V5.5M18 8V5.5M9 8V6M15 8V6" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Green Area",
    desc: "Peaceful green spaces designed for fresh air and quiet moments — enjoy the beauty of nature every day.",
    gradient: "linear-gradient(140deg,#182c17,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 21c0-6 4-8 4-13a4 4 0 0 0-8 0c0 5 4 7 4 13Z" />
        <path d="M12 13c-2-1-3-3-2-6M12 13c2-1 3-3 2-6" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Children Park",
    desc: "A secure playground built for endless fun, giving children the freedom to play while parents enjoy peace of mind.",
    gradient: "linear-gradient(140deg,#2a2312,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M6 20V6a2 2 0 0 1 2-2h1l7 7-7 7H8a2 2 0 0 1-2-2Z" />
        <circle cx="9" cy="8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    num: "07",
    title: "Creche",
    desc: "A warm, welcoming childcare centre where young children are cared for and prepared for every stage of growth.",
    gradient: "linear-gradient(140deg,#2a1a24,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="8" r="3.2" />
        <path d="M6 20c0-3.5 2.7-6 6-6s6 2.5 6 6" />
      </svg>
    ),
  },
  {
    num: "08",
    title: "Gated Access",
    desc: "Controlled gated access that enhances security while ensuring your family's comfort, privacy, and confidence.",
    gradient: "linear-gradient(140deg,#191919,#0d0b08 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 21V9l8-6 8 6v12M4 21h16M9 21v-6h6v6" />
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
