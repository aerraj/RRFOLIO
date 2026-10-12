'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, Plus, Minus, Pause, Play, X } from 'lucide-react';
import { featuredProjects, secondaryProjects, timeline, proof } from '@/content/portfolio';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const asset = (path: string) => `${basePath}${path}`;
const chapters = [['top','The signal'],['perspective','A different lens'],['work','Selected work'],['experiments','Explorations'],['about','The trajectory'],['contact',"What’s next"]];

function ProjectDrawing({ index }: { index: number }) {
  if(index===0) return <div className="research-drawing" aria-hidden="true"><div className="micro-orbit o1"/><div className="micro-orbit o2"/><div className="micro-orbit o3"/><div className="micro-core"/><div className="micro-cross x1"/><div className="micro-cross x2"/><span className="drawing-label dl-top">SIGNAL → FEATURES → INFERENCE</span><span className="drawing-label dl-bottom">DB44 / 9 LEVELS <i/> BIT-ACCURATE</span><svg viewBox="0 0 600 300"><path d="M0 150 Q15 95 30 150 T60 150 T90 150 T120 150 T150 150 T180 150 T210 150 T240 150 T270 150 T300 150 T330 150 T360 150 T390 150 T420 150 T450 150 T480 150 T510 150 T540 150 T570 150 T600 150"/></svg></div>;
  if(index===1) return <div className="quant-drawing" aria-hidden="true"><span className="drawing-label dl-top">PORTFOLIO ALLOCATION / EURO AREA</span><div className="quant-grid"/><svg viewBox="0 0 600 320"><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#7ac4ff" stopOpacity=".2"/><stop offset="1" stopColor="#7ac4ff" stopOpacity="0"/></linearGradient></defs><path className="chart-area" d="M30 260L70 250L110 257L150 220L190 232L230 183L270 193L310 160L350 172L390 123L430 142L470 95L510 110L570 55V290H30Z"/><path className="chart-line" d="M30 260L70 250L110 257L150 220L190 232L230 183L270 193L310 160L350 172L390 123L430 142L470 95L510 110L570 55"/><circle className="chart-dot" cx="570" cy="55" r="5"/></svg><span className="drawing-label dl-bottom">36 LISTINGS <i/> MONTHLY REBALANCE</span><span className="chart-caption">Illustrative signal</span></div>;
  return <div className="engine-drawing" aria-hidden="true"><span className="drawing-label dl-top">EVENT-DRIVEN / C++20</span><div className="engine-lanes">{['ITCH','BOOK','RISK','OUCH'].map((name,i)=><div className="engine-lane" key={name}><span>{name}</span><div>{Array.from({length:15},(_,j)=><i key={j} style={{animationDelay:`${i*.2+j*.14}s`,height:`${12+(j*17+i*13)%58}%`}}/>)}</div><code>0{i+1}</code></div>)}</div><span className="drawing-label dl-bottom">DETERMINISTIC REPLAY <i/> SIMULATION ENGINE</span></div>;
}

export default function LivingPortfolio(){
  const audio=useRef<HTMLAudioElement>(null);
  const [musicPrompt,setMusicPrompt]=useState(true);
  const [headerIntro,setHeaderIntro]=useState(true);
  const [musicError,setMusicError]=useState(false);
  const [audioReady,setAudioReady]=useState(false);
  const [soundtrack,setSoundtrack]=useState(false);
  const [active,setActive]=useState('top');
  const [expanded,setExpanded]=useState<string|null>(null);
  const [time,setTime]=useState('');
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    let scrollFrame=0;
    const updateScroll=()=>{if(scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;const max=document.documentElement.scrollHeight-innerHeight;root.current?.style.setProperty('--page-progress',String(scrollY/Math.max(1,max)));root.current?.style.setProperty('--scene-progress',String(Math.min(1,scrollY/innerHeight)));});};
    window.addEventListener('scroll',updateScroll,{passive:true});updateScroll();
    const update=()=>setTime(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'}).format(new Date())); update(); const timer=setInterval(update,60000);
    const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('in-view');});},{threshold:.08});
    root.current?.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
    const sections=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);}),{rootMargin:'-25% 0px -45% 0px'});
    root.current?.querySelectorAll('section[id]').forEach(e=>sections.observe(e));
    return()=>{clearInterval(timer);cancelAnimationFrame(scrollFrame);window.removeEventListener('scroll',updateScroll);observer.disconnect();sections.disconnect();};
  },[]);
  useEffect(()=>{
    const timer=setTimeout(()=>setHeaderIntro(false),3200);
    return()=>clearTimeout(timer);
  },[]);
  const playMusic=()=>{
    const player=audio.current;
    if(!player)return;
    setMusicError(false);
    void player.play().then(()=>setMusicPrompt(false)).catch(()=>setMusicError(true));
  };
  const chapter = Math.max(0,chapters.findIndex(([id])=>id===active));
  return <div ref={root} data-chapter={active} className="living-site">
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="world-ambience" aria-hidden="true"/><div className="page-grain" aria-hidden="true"/>
    <header className={`living-header ${headerIntro?'header-intro':''}`}><a className="living-mark" href="#top" aria-label="Rishabh Raj home"><span className="mark-symbol">rr.</span>Rishabh Raj</a><span className="chapter-counter">0{chapter} <i>/</i> 05</span><div className="header-controls">{audioReady && <button data-music-control className="header-motion" onClick={()=>{const player=audio.current;if(!player)return;if(player.paused){playMusic();}else{player.pause();}}} aria-label={soundtrack?'Pause music':'Play music'}>{soundtrack?<Pause size={12}/>:<Play size={12}/>} {soundtrack?'Pause':'Play'} music</button>}</div></header>
    {process.env.NEXT_PUBLIC_HAS_SOUNDTRACK === 'true' && <audio ref={audio} src={asset('/audio/soundtrack.mp3')} loop preload="auto" onCanPlay={()=>setAudioReady(true)} onPlay={()=>setSoundtrack(true)} onPause={()=>setSoundtrack(false)} onError={()=>setAudioReady(false)}/>}
    {musicPrompt && <aside className="music-invitation music-mini" aria-label="Background music invitation"><button className="music-mini-play" onClick={playMusic}><Play size={12}/> Tap for music</button><button className="music-mini-dismiss" onClick={()=>setMusicPrompt(false)} aria-label="Continue without sound"><X size={12}/></button>{musicError && <span role="status">Try again</span>}</aside>}
    <nav className="chapter-rail" aria-label="Chapters">{chapters.map(([id,label],i)=><a key={id} href={`#${id}`} aria-label={`0${i} ${label}`} aria-current={active===id?'location':undefined}><span>0{i}</span><b>{label}</b><i/></a>)}</nav>
    <main id="main">
      <section className="living-hero" id="top">
        <div className="hero-landscape" aria-hidden="true"><img src={asset('/images/rrfolio/crimson.jpg')} alt="" fetchPriority="high"/><div className="horizon-light"/></div>
        <div className="hero-text"><p className="eyebrow"><span className="status-light"/> RISHABH RAJ / RESEARCH × ENGINEERING</p><h1>A restless mind.<br/><span>A world of systems.</span></h1><p className="hero-description">Machine learning. Markets. The space between.<br/>I turn research ideas into things that work.</p><div className="hero-actions"><a className="pill-link primary" href="#work">Discover the work <ArrowDown size={14}/></a><a className="text-link" href={asset('/resume.pdf')} target="_blank">Résumé <ArrowUpRight size={14}/></a></div></div>
        <div className="hero-foot"><span>RRFOLIO / EST. 2026</span><span>INDIA <b>{time || 'IST'} {time && 'IST'}</b></span><a href="#perspective">THE JOURNEY BEGINS <ArrowDown size={12}/></a></div>
      </section>
      <section className="perspective-scene" id="perspective"><div className="perspective-image" aria-hidden="true"><img src={asset('/images/rrfolio/geofront.jpg')} alt="" loading="lazy"/></div><div className="perspective-copy reveal"><p className="eyebrow">01 / A DIFFERENT LENS</p><h2>Not one discipline.<br/><em>One way of seeing.</em></h2><p>A faint signal in a machine. A hidden pattern in a market.<br/>A system that needs to survive the real world.<br/><br/>Different problems. The same instinct.<br/>Understand it deeply. Then build.</p></div><span className="scene-note">CURIOSITY IS THE CONNECTIVE TISSUE.</span></section>
      <section className="work-section-new section-wrap" id="work"><div className="section-heading reveal"><p className="eyebrow">02 / SELECTED WORK</p><h2>Ideas, made<br/><span>executable.</span></h2><p>Three projects at the intersection of curiosity and rigor.<br/>Built to be inspected, not just presented.</p></div><div className="work-grid">{featuredProjects.map((project,index)=><article className={`work-piece piece-${index} reveal`} key={project.title}><a className="project-art-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}><ProjectDrawing index={index}/><span className="project-open"><ArrowUpRight size={20}/></span></a><div className="project-meta"><span>0{index+1} / {project.track.toUpperCase()}</span><span>{project.stack[0]}</span></div><div className="project-title-row"><h3><a href={project.href} target="_blank" rel="noreferrer">{project.title}</a></h3><button className="detail-toggle" aria-expanded={expanded===project.index} aria-controls={`detail-${project.index}`} aria-label={`${expanded===project.index?'Hide':'Show'} ${project.title} details`} onClick={()=>setExpanded(expanded===project.index?null:project.index)}>{expanded===project.index?<Minus size={18}/>:<Plus size={18}/>}</button></div><p className="project-short">{project.summary}</p><div className="project-expand" id={`detail-${project.index}`} hidden={expanded!==project.index}><p>{project.detail}</p><div className="stack-list">{project.stack.map(item=><span key={item}>{item}</span>)}</div></div><a className="project-source" href={project.href} target="_blank" rel="noreferrer">{project.cta} <ArrowUpRight size={13}/></a></article>)}</div></section>
      <section className="method-section section-wrap reveal"><div className="method-backdrop" aria-hidden="true"><img src={asset('/images/rrfolio/unit-01.png')} alt="" loading="lazy"/></div><span className="eyebrow">THE THROUGHLINE</span><p>From a faint signal<br/>to a <em>working system.</em></p><div className="method-route"><span>Observe</span><i/><span>Question</span><i/><span>Build</span><i/><span>Verify</span><b className="route-pulse"/></div><span className="method-note">Curiosity starts it. Evidence finishes it.</span></section>
      <section className="more-work section-wrap" id="experiments"><div className="small-heading reveal"><p className="eyebrow">03 / FURTHER EXPLORATIONS</p><h2>Range, with intent.</h2><a className="text-link" href="https://github.com/aerraj" target="_blank" rel="noreferrer">All repositories <ArrowUpRight size={14}/></a></div><div className="exploration-list">{secondaryProjects.map((p,i)=><a className="exploration-row reveal" href={p.href} target="_blank" rel="noreferrer" key={p.title}><span className="row-number">0{i+1}</span><h3>{p.title}</h3><p>{p.note}</p><span className="row-lang">{p.lang}</span><ArrowUpRight size={20}/></a>)}</div></section>
      <section className="about-new section-wrap" id="about"><div className="timeline-backdrop" aria-hidden="true"><img src={asset('/images/rrfolio/tokyo-3-sunset-4k.jpg')} alt="" loading="lazy"/></div><div className="about-intro reveal"><p className="eyebrow">04 / THE PERSON BEHIND THE WORK</p><h2>Curiosity doesn't<br/><span>stay in one lane.</span></h2><p>I'm Rishabh. An engineer drawn to problems where the signal is faint, the system is consequential, and the answer has to work outside a notebook.</p><p>Electrical engineering. Quantitative development. Production operations. Financial engineering. Different worlds, connected by the same instinct: understand it deeply, then build.</p><a className="text-link" href={asset('/resume.pdf')} target="_blank">The full story / Résumé <ArrowUpRight size={14}/></a></div><div className="experience-list">{timeline.map((item,i)=><article className="experience-item reveal" key={item.role}><span className="experience-dot"/><p className="eyebrow">{item.date}</p><h3>{item.role}</h3><span>{item.place}</span><p>{item.copy}</p></article>)}</div></section>
      <section className="proof-new section-wrap reveal"><div className="small-heading"><p className="eyebrow">A FEW INDEPENDENT SIGNALS</p><span>Each record opens its source. <ArrowUpRight size={12}/></span></div><div className="proof-grid">{proof.map(item=><a href={item.href.startsWith('/')?asset(item.href):item.href} target="_blank" rel="noreferrer" key={item.label}><span>{item.value}</span><p>{item.label}<ArrowUpRight size={12}/></p></a>)}</div></section>
      <section className="contact-new section-wrap" id="contact"><div className="contact-backdrop" aria-hidden="true"><img src={asset('/images/rrfolio/finale.png')} alt="" loading="lazy"/></div><div className="contact-glow" aria-hidden="true"/><div className="contact-top reveal"><p className="eyebrow"><span className="status-light"/> 05 / WHAT’S NEXT</p><p>Research, systems, and difficult<br/>questions worth staying up for.</p></div><a className="contact-title reveal" href="mailto:rraj09102002@gmail.com">Let's find<br/><span>what's next.</span><ArrowUpRight/></a><div className="contact-bottom reveal"><a className="text-link" href="mailto:rraj09102002@gmail.com">rraj09102002@gmail.com <ArrowUpRight size={15}/></a><div><a href="https://github.com/aerraj" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13}/></a><a href="https://linkedin.com/in/aerraj" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13}/></a></div></div></section>
    </main><footer className="living-footer"><span>© {new Date().getFullYear()} Rishabh Raj</span><span>A RESTLESS MIND. AN OPEN HORIZON.</span><a href="#top">Back to top ↑</a></footer>
  </div>;
}
