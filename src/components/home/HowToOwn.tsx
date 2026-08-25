"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const STEPS = [
  {
    kicker: "Enquire",
    title: "Make an enquiry.",
    body: "Fill out an enquiry form — online, on-site, or at our office. It's how we learn who you are and the kind of home you're looking for.",
    footer: "Start your journey",
    icon: (
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.2 11.1c.5.35.8.9.8 1.5V16h5v-.4c0-.6.3-1.15.8-1.5A6 6 0 0 0 12 3Z" />
    ),
  },
  {
    kicker: "Experience",
    title: "Walk the grounds.",
    body: "We arrange a private site inspection, so you can experience the property and its surroundings for yourself, at your own pace.",
    footer: "See it firsthand",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r=".6" fill="currentColor" />
      </>
    ),
  },
  {
    kicker: "Disclosure",
    title: "Know the estate.",
    body: "You'll receive full copies of the estate's by-laws and governing documents — nothing left unread before you commit.",
    footer: "Read every clause",
    icon: (
      <>
        <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
        <path d="M9 12h6M9 16h6M9 8h2" />
      </>
    ),
  },
  {
    kicker: "Commit",
    title: "Choose your terms.",
    body: "Select the payment method that suits you and commence payment, guided at every step by our team.",
    footer: "Seal the agreement",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7.5v9M14.5 9.8c0-1-1-1.8-2.5-1.8s-2.5.7-2.5 1.7c0 2.6 5 1.3 5 3.9 0 1-1 1.7-2.5 1.7s-2.5-.8-2.5-1.8" />
      </>
    ),
  },
  {
    kicker: "Possess",
    title: "Take ownership.",
    body: "Receive your land documents and the keys to a home that is, at last, entirely yours.",
    footer: "It's yours",
    icon: (
      <>
        <circle cx="8" cy="15" r="3.2" />
        <path d="M10.3 12.8 18 5.1M15.5 7.6l2 2M18 5.1l2.4 2.4" />
      </>
    ),
  },
];

export function HowToOwn() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(() => new Set<number>());
  const [navVisible, setNavVisible] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  const setStepRef = useCallback((el: HTMLLIElement | null, i: number) => {
    stepRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.indexOf(entry.target as HTMLLIElement);
            if (idx !== -1) {
              setInView((prev) => {
                if (prev.has(idx)) return prev;
                const next = new Set(prev);
                next.add(idx);
                return next;
              });
            }
          }
        });
      },
      { threshold: 0.12 },
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.indexOf(entry.target as HTMLLIElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: null, rootMargin: "-46% 0px -46% 0px", threshold: 0 },
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setNavVisible(e.isIntersecting)),
      { threshold: 0.05 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const [fillProgress, setFillProgress] = useState(0);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.5;
      const raw = (viewportCenter - rect.top) / rect.height;
      setFillProgress(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navFrac = STEPS.length > 1 ? activeIndex / (STEPS.length - 1) : 0;

  const jumpTo = (i: number) => {
    stepRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <style>{CSS}</style>

      <section className="htop" ref={sectionRef}>
        <header className="htop__intro">
          <p className="htop-kicker">The Acquisition Process</p>
          <h2 className="htop-title">
            How to own <em>a property</em>
          </h2>
          <p className="htop-sub">
            Five considered steps carry you from a first enquiry to the keys in
            your hand — each one guided, nothing left to chance.
          </p>
          <div className="htop-rule">
            <span />
          </div>
        </header>

        <div className="htop-timeline">
          <nav className={`htop-nav${navVisible ? " is-visible" : ""}`} aria-label="Process steps">
            <div className="htop-nav__line">
              <div className="htop-nav__fill" style={{ transform: `scaleY(${navFrac})` }} />
            </div>
            <ol>
              {STEPS.map((s, i) => (
                <li key={s.kicker} className={i === activeIndex ? "is-active" : ""}>
                  <button type="button" onClick={() => jumpTo(i)}>
                    <span className="htop-nav-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="htop-nav-label">{s.kicker}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
          <div className="htop-rail">
            <div className="htop-track" />
            <div className="htop-rail-fill" style={{ transform: `scaleY(${fillProgress})` }} />
          </div>

          <ol className="htop-steps">
            {STEPS.map((s, i) => {
              const classes = [
                "htop-step",
                inView.has(i) ? "in-view" : "",
                i === activeIndex ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <li key={s.kicker} className={classes} ref={(el) => setStepRef(el, i)}>
                  <div className="htop-card">
                    <div className="htop-card__top">
                      <span className="htop-card__num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="htop-card__kicker">{s.kicker}</span>
                    </div>
                    <h3 className="htop-card__title">{s.title}</h3>
                    <p className="htop-card__body">{s.body}</p>
                    <div className="htop-card__footer">
                      <span>{s.footer}</span>
                      <span className="htop-card__footer-num">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                  <div className="htop-node">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}

const CSS = `
  .htop{
    position:relative;
    background:#17263A;
    color:#f4efe4;
    padding:0 0 10vh;
    -webkit-font-smoothing:antialiased;
  }
  .htop::before{
    content:"";
    position:absolute; inset:0;
    background:
      radial-gradient(ellipse 70% 50% at 82% 8%, rgba(105,157,214,.07), transparent 60%),
      radial-gradient(ellipse 60% 60% at 0% 100%, rgba(105,157,214,.05), transparent 60%);
    pointer-events:none;
  }

  .htop__intro{
    position:relative;
    max-width:640px;
    margin:0 auto;
    padding:12vh 24px 9vh;
    text-align:center;
  }
  .htop-kicker{
    font-size:12px; letter-spacing:.32em; text-transform:uppercase;
    color:#699DD6; margin:0 0 22px;
    font-family:var(--font-body);
  }
  .htop-title{
    font-family:var(--font-heading); font-weight:600;
    font-size:clamp(34px,5.4vw,58px); line-height:1.08; letter-spacing:-.01em;
    margin:0 0 20px; color:#f4efe4;
  }
  .htop-title em{ font-style:italic; font-weight:400; color:#8BB8E8; }
  .htop-sub{ font-size:16px; line-height:1.6; color:#94A3B8; margin:0 0 30px; font-family:var(--font-body); }
  .htop-rule span{ display:inline-block; width:1px; height:64px; background:linear-gradient(#699DD6, transparent); }

  .htop-nav{
    position:absolute; left:-70px; top:50%; transform:translateY(-50%); z-index:40;
    display:flex; align-items:center; gap:18px;
    opacity:0; pointer-events:none; transition:opacity .5s cubic-bezier(.16,1,.3,1);
  }
  .htop-nav.is-visible{ opacity:1; pointer-events:auto; }
  .htop-nav__line{
    position:relative; width:2px; height:210px;
    background:rgba(255,255,255,.12); border-radius:2px; overflow:hidden;
  }
  .htop-nav__fill{
    position:absolute; left:0; top:0; width:100%; height:100%;
    transform-origin:top;
    background:linear-gradient(#699DD6, #4F83BD);
    transition:transform .25s linear;
  }
  .htop-nav ol{
    list-style:none; margin:0; padding:0;
    display:flex; flex-direction:column; justify-content:space-between; height:210px;
  }
  .htop-nav li{ display:flex; }
  .htop-nav button{
    background:none; border:none; display:flex; align-items:center; gap:10px;
    padding:10px 8px; cursor:pointer; color:#94A3B8; font-family:var(--font-body);
  }
  .htop-nav button:focus-visible{ outline:1px solid #699DD6; outline-offset:4px; border-radius:3px; }
  .htop-nav-num{
    font-size:12px; letter-spacing:.06em; font-variant-numeric:tabular-nums;
    transition:color .3s cubic-bezier(.16,1,.3,1), font-size .3s cubic-bezier(.16,1,.3,1);
  }
  .htop-nav-label{
    font-size:12px; letter-spacing:.14em; text-transform:uppercase;
    opacity:0; max-width:0; overflow:hidden; white-space:nowrap;
    transition:opacity .35s cubic-bezier(.16,1,.3,1), max-width .35s cubic-bezier(.16,1,.3,1);
  }
  .htop-nav li.is-active .htop-nav-num{ color:#8BB8E8; font-size:13px; }
  .htop-nav li.is-active .htop-nav-label{ opacity:1; max-width:120px; color:#f4efe4; }
  @media (max-width:1180px){ .htop-nav{ display:none; } }

  .htop-timeline{ position:relative; max-width:900px; margin:0 auto; padding:0 24px; padding-left:94px; }
  .htop-rail{ position:absolute; top:6px; bottom:6px; left:50%; transform:translateX(-50%); width:1px; }
  .htop-track{ position:absolute; inset:0; background:rgba(255,255,255,.12); }
  .htop-rail-fill{
    position:absolute; left:0; top:0; width:100%; height:100%;
    background:linear-gradient(#8BB8E8, #699DD6);
    transform-origin:top; transition:transform .2s linear;
  }

  .htop-steps{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:6vh; }

  .htop-step{
    display:grid; grid-template-columns:1fr 40px 1fr; column-gap:26px; align-items:center;
    opacity:0; transition:opacity .7s cubic-bezier(.16,1,.3,1);
  }
  .htop-step.in-view{ opacity:1; }

  .htop-step:nth-child(odd) .htop-card{ grid-column:1; justify-self:end; text-align:right; }
  .htop-step:nth-child(even) .htop-card{ grid-column:3; justify-self:start; text-align:left; }
  .htop-step:nth-child(odd) .htop-card__top,
  .htop-step:nth-child(odd) .htop-card__footer{ flex-direction:row-reverse; }

  .htop-step:nth-child(4n+1) .htop-card{ transform:translateY(-14px) scale(1.05); }
  .htop-step:nth-child(4n+2) .htop-card{ transform:translateY(10px) scale(1.05); }
  .htop-step:nth-child(4n+3) .htop-card{ transform:translateY(-6px) scale(1.05); }
  .htop-step:nth-child(4n+4) .htop-card{ transform:translateY(16px) scale(1.05); }
  .htop-step.is-active:nth-child(4n+1) .htop-card{ transform:translateY(-14px) scale(.94); }
  .htop-step.is-active:nth-child(4n+2) .htop-card{ transform:translateY(10px) scale(.94); }
  .htop-step.is-active:nth-child(4n+3) .htop-card{ transform:translateY(-6px) scale(.94); }
  .htop-step.is-active:nth-child(4n+4) .htop-card{ transform:translateY(16px) scale(.94); }

  .htop-node{
    grid-column:2; justify-self:center; width:40px; height:40px; border-radius:50%;
    background:#17263A; border:1px solid rgba(255,255,255,.16);
    display:flex; align-items:center; justify-content:center; color:#94A3B8; z-index:2;
    transition:border-color .5s cubic-bezier(.16,1,.3,1), color .5s cubic-bezier(.16,1,.3,1), box-shadow .5s cubic-bezier(.16,1,.3,1), background .5s cubic-bezier(.16,1,.3,1);
  }
  .htop-node svg{ width:16px; height:16px; }
  .htop-step.is-active .htop-node{
    border-color:#699DD6; color:#8BB8E8; background:#1a2a3f;
    box-shadow:0 0 0 5px rgba(105,157,214,.15);
  }

  .htop-card{
    position:relative; background:#fff; color:#221d15;
    border:1px solid rgba(34,29,21,.10); padding:20px 22px 13px; width:100%; max-width:270px;
    box-shadow:0 14px 30px rgba(0,0,0,.26); opacity:.55;
    transition:opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1), box-shadow .6s cubic-bezier(.16,1,.3,1);
    border-radius:4px 30px 4px 4px;
  }
  .htop-step:nth-child(even) .htop-card{ border-radius:4px 4px 4px 30px; }
  .htop-step.is-active .htop-card{ opacity:1; box-shadow:0 20px 44px rgba(0,0,0,.38); }

  .htop-card::before{
    content:""; position:absolute; top:50%; width:26px; height:1px;
    background:rgba(34,29,21,.18); transition:background .5s cubic-bezier(.16,1,.3,1);
  }
  .htop-step:nth-child(odd) .htop-card::before{ right:-26px; }
  .htop-step:nth-child(even) .htop-card::before{ left:-26px; }
  .htop-step.is-active .htop-card::before{ background:#699DD6; }

  .htop-card__top{ display:flex; align-items:baseline; gap:10px; margin-bottom:12px; }
  .htop-card__num{ font-size:12px; font-variant-numeric:tabular-nums; color:#837a68; letter-spacing:.04em; font-family:var(--font-body); }
  .htop-card__kicker{ font-size:12px; letter-spacing:.22em; text-transform:uppercase; color:#699DD6; font-weight:600; font-family:var(--font-body); }
  .htop-card__title{ font-family:var(--font-heading); font-weight:600; font-size:19px; line-height:1.16; margin:0 0 9px; letter-spacing:-.01em; }
  .htop-card__body{ font-size:13px; line-height:1.55; color:#837a68; margin:0 0 14px; max-width:28ch; margin-left:auto; margin-right:auto; font-family:var(--font-body); }
  .htop-step:nth-child(odd) .htop-card__body{ margin-left:auto; margin-right:0; }
  .htop-step:nth-child(even) .htop-card__body{ margin-left:0; margin-right:auto; }

  .htop-card__footer{ border-top:1px solid rgba(34,29,21,.12); padding-top:11px; display:flex; align-items:center; justify-content:space-between; gap:10px; }
  .htop-card__footer span:first-child{ font-size:12px; letter-spacing:.16em; text-transform:uppercase; color:#837a68; font-family:var(--font-body); }
  .htop-card__footer-num{
    flex:none; width:20px; height:20px; border-radius:50%; border:1px solid #699DD6; color:#699DD6;
    font-size:12px; display:flex; align-items:center; justify-content:center; font-variant-numeric:tabular-nums;
  }

  @media (max-width:760px){
    .htop-timeline{ padding-left:24px; }
    .htop-step{ grid-template-columns:34px 22px 1fr; column-gap:0; }
    .htop-node{ width:34px; height:34px; grid-column:1; justify-self:start; }
    .htop-node svg{ width:14px; height:14px; }
    .htop-rail{ left:17px; transform:none; }
    .htop-step .htop-card{ grid-column:3; justify-self:start; text-align:left; max-width:none; }
    .htop-step .htop-card__top, .htop-step .htop-card__footer{ flex-direction:row; }
    .htop-step .htop-card::before{ left:-22px; right:auto; width:22px; }
    .htop-step .htop-card__body{ margin-left:0; margin-right:auto; }
    .htop-step .htop-card{ transform:none !important; }
    .htop-step.is-active .htop-card{ transform:scale(.96) !important; }
    .htop-steps{ gap:8vh; }
  }

  @media (prefers-reduced-motion:reduce){
    .htop-step, .htop-card, .htop-nav *{ transition:opacity .3s linear !important; }
  }
`;
