"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { faqs } from "@/data/faqs";

const CSS = `
  .faq-scope{
    --bg: #17263A;
    --bg-card: #fff;
    --bg-card-hover: #fffdf8;
    --ink: #f4efe4;
    --ink-dim: #94A3B8;
    --card-ink: #221d15;
    --card-muted: #837a68;
    --active-fill: #1a2a3f;
    --active-ink: #f4efe4;
    --active-muted: #c9bfab;
    --brand: #699DD6;
    --brand-bright: #8BB8E8;
    --brand-wash: rgba(105,157,214,.12);
    --sans: var(--font-body);
    --ease: cubic-bezier(.16,1,.3,1);
    background:var(--bg);
    color:var(--ink);
    font-family:var(--sans);
    -webkit-font-smoothing:antialiased;
  }
  .faq-scope *{box-sizing:border-box;}

  .faq{
    position:relative;
    background:var(--bg);
    padding:14vh 24px 16vh;
    overflow:hidden;
  }
  .faq::before{
    content:"";
    position:absolute; inset:0;
    background:
      radial-gradient(ellipse 60% 50% at 90% 0%, rgba(105,157,214,.07), transparent 60%),
      radial-gradient(ellipse 50% 50% at 0% 100%, rgba(105,157,214,.05), transparent 60%);
    pointer-events:none;
  }

  .faq__inner{
    position:relative;
    max-width:1180px;
    margin:0 auto;
    display:grid;
    grid-template-columns:340px 1fr;
    gap:80px;
  }

  .faq__intro{
    position:sticky;
    top:12vh;
    align-self:start;
  }
  .faq__kicker{
    font-size:11px;
    letter-spacing:.32em;
    text-transform:uppercase;
    color:var(--brand);
    margin:0 0 20px;
  }
  .faq__title{
    font-family:var(--font-heading);
    font-weight:600;
    font-size:clamp(32px,3.6vw,46px);
    line-height:1.1;
    letter-spacing:-.01em;
    margin:0 0 18px;
    color:#fff;
  }
  .faq__title em{
    font-style:italic;
    color:var(--brand-bright);
  }
  .faq__sub{
    font-size:15px;
    line-height:1.65;
    color:var(--ink-dim);
    margin:0 0 40px;
    max-width:32ch;
  }

  .faq__cta{
    border-top:1px solid rgba(255,255,255,.1);
    padding-top:28px;
  }
  .faq__cta p{
    font-size:14px;
    line-height:1.5;
    color:var(--ink);
    margin:0 0 18px;
    max-width:22ch;
  }
  .call-btn{
    display:inline-flex;
    align-items:center;
    gap:14px;
    background:transparent;
    border:1px solid var(--brand);
    color:var(--brand-bright);
    font-family:var(--sans);
    font-size:13px;
    letter-spacing:.08em;
    text-transform:uppercase;
    padding:13px 10px 13px 22px;
    border-radius:999px;
    cursor:pointer;
    text-decoration:none;
    transition:background .35s var(--ease), color .35s var(--ease);
  }
  .call-btn:hover{ background:var(--brand-wash); }
  .call-btn .ring{
    width:30px; height:30px;
    border-radius:50%;
    background:var(--brand);
    color:var(--bg);
    display:flex; align-items:center; justify-content:center;
    flex:none;
    transition:transform .35s var(--ease);
  }
  .call-btn:hover .ring{ transform:translateX(3px); }
  .call-btn .ring svg{ width:14px; height:14px; }

  .faq__list{
    list-style:none;
    margin:0; padding:0;
    display:flex;
    flex-direction:column;
    gap:8px;
  }

  .faq-item{
    background:var(--bg-card);
    border-radius:999px;
    box-shadow:0 10px 24px rgba(0,0,0,.18);
    overflow:hidden;
    opacity:0;
    transform:translateY(14px);
    transition:
      opacity .6s var(--ease), transform .6s var(--ease),
      background .45s var(--ease), border-radius .45s var(--ease), box-shadow .45s var(--ease);
  }
  .faq-item.in-view{ opacity:1; transform:translateY(0); }
  .faq-item:hover{ background:var(--bg-card-hover); }

  .faq-item__q{
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:16px;
    padding:14px 14px 14px 20px;
    background:none;
    border:none;
    cursor:pointer;
    text-align:left;
    font-family:var(--sans);
    font-weight:600;
    font-size:14.5px;
    color:var(--card-ink);
    transition:color .4s var(--ease);
  }

  .faq-item__icon{
    flex:none;
    width:26px; height:26px;
    border-radius:50%;
    border:1px solid var(--brand);
    display:flex; align-items:center; justify-content:center;
    position:relative;
    transition:background .4s var(--ease), border-color .4s var(--ease);
  }
  .faq-item__icon::before,
  .faq-item__icon::after{
    content:"";
    position:absolute;
    background:var(--brand);
    transition:transform .4s var(--ease), background .4s var(--ease);
  }
  .faq-item__icon::before{ width:10px; height:1.2px; }
  .faq-item__icon::after{ width:1.2px; height:10px; }

  .faq-item__a{
    max-height:0;
    opacity:0;
    padding:0 20px;
    transition:max-height .5s var(--ease), opacity .4s var(--ease), padding .5s var(--ease);
  }
  .faq-item__a p{
    margin:0 0 16px;
    font-size:12.5px;
    line-height:1.6;
    color:var(--card-muted);
    max-width:62ch;
  }

  .faq-item.is-active{
    background:var(--active-fill);
    border-radius:24px;
    box-shadow:0 18px 40px rgba(0,0,0,.4);
  }
  .faq-item.is-active .faq-item__q{ color:var(--active-ink); }
  .faq-item.is-active .faq-item__a{ opacity:1; }
  .faq-item.is-active .faq-item__a p{ color:var(--active-muted); }
  .faq-item.is-active .faq-item__icon{ background:var(--brand); }
  .faq-item.is-active .faq-item__icon::before,
  .faq-item.is-active .faq-item__icon::after{ background:var(--active-fill); }
  .faq-item.is-active .faq-item__icon::before{ transform:rotate(45deg); }
  .faq-item.is-active .faq-item__icon::after{ transform:rotate(45deg); }
  .faq-item:not(.is-active) .faq-item__icon::after{ transform:rotate(90deg); }

  @media (max-width:900px){
    .faq__inner{ grid-template-columns:1fr; gap:52px; }
    .faq__intro{ position:static; }
    .faq-item__q{ font-size:14px; padding:13px 13px 13px 18px; }
    .faq-item__a{ padding:0 18px; }
  }

  @media (prefers-reduced-motion:reduce){
    .faq-item, .faq-item__a, .call-btn .ring{ transition:opacity .3s linear !important; }
  }
`;

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(faqs.length - 1);
  const [inView, setInView] = useState<boolean[]>(() => faqs.map(() => false));

  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getMaxHeight = useCallback(
    (index: number) => {
      if (index !== activeIndex) return "0px";
      const el = answerRefs.current[index];
      return el ? el.scrollHeight + "px" : "0px";
    },
    [activeIndex],
  );

  const [heights, setHeights] = useState<string[]>(() => faqs.map(() => "0px"));

  const recalcHeights = useCallback(() => {
    setHeights(faqs.map((_, i) => getMaxHeight(i)));
  }, [getMaxHeight]);

  useEffect(() => {
    recalcHeights();
  }, [activeIndex, recalcHeights]);

  useEffect(() => {
    const onResize = () => recalcHeights();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recalcHeights]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.indexOf(entry.target as HTMLLIElement);
            if (idx !== -1) {
              setInView((prev) => {
                if (prev[idx]) return prev;
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }
          }
        });
      },
      { threshold: 0.15 },
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleToggle = (index: number) => {
    setActiveIndex((current) => (current === index ? -1 : index));
  };

  return (
    <div className="faq-scope">
      <style>{CSS}</style>

      <section className="faq" id="faq">
        <div className="faq__inner">
          <div className="faq__intro">
            <p className="faq__kicker">Support</p>
            <h2 className="faq__title">
              Answers, <em>before</em> you ask.
            </h2>
            <p className="faq__sub">
              Everything prospective owners usually want to know about buying, financing, and settling into a property with us.
            </p>

            <div className="faq__cta">
              <p>Still have a question we haven&apos;t covered?</p>
              <a className="call-btn" href="tel:">
                Call an advisor
                <span className="ring">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <ol className="faq__list">
            {faqs.map((faq, index) => {
              const isActive = index === activeIndex;
              return (
                <li
                  key={index}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className={`faq-item${isActive ? " is-active" : ""}${inView[index] ? " in-view" : ""}`}
                >
                  <button
                    className="faq-item__q"
                    aria-expanded={isActive}
                    onClick={() => handleToggle(index)}
                  >
                    {faq.question}
                    <span className="faq-item__icon" />
                  </button>
                  <div
                    className="faq-item__a"
                    ref={(el) => { answerRefs.current[index] = el; }}
                    style={{ maxHeight: heights[index] }}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}
