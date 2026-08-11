"use client";

import Image from "next/image";
import { ArrowRight, CalendarDays, Check, ChevronDown, Clock3, Menu, Phone, Search, ShieldCheck, Sparkles, Siren, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import "./refinement.css";
import "./dental.css";

const services = [
  { icon: Search, number: "01", title: "Preventive care", description: "Thorough exams, gentle hygiene, and digital imaging that keep small concerns small." },
  { icon: Sparkles, number: "02", title: "Cosmetic dentistry", description: "Natural-looking whitening, bonding, and veneers designed around your features." },
  { icon: ShieldCheck, number: "03", title: "Restorative care", description: "Beautiful, durable crowns, bridges, and implants planned with digital precision." },
  { icon: Siren, number: "04", title: "Emergency visits", description: "Fast relief for tooth pain, swelling, chips, and dental concerns that cannot wait." },
];

const faqs = [
  { question: "Do you offer same-day emergency dental care?", answer: "Yes. We protect a limited number of same-day appointments for tooth pain, swelling, broken teeth, and other urgent dental concerns. Call early for the best availability." },
  { question: "Do you accept dental insurance?", answer: "We work with most major PPO dental plans. Before treatment, our team will verify your benefits and give you a clear estimate with no surprise fees." },
  { question: "What happens at my first dental visit?", answer: "We begin with a conversation, digital imaging when needed, a gentle comprehensive exam, and time to discuss your goals. You will leave with a clear, prioritized care plan." },
];

const navItems = [["Treatments", "#care"], ["Our approach", "#approach"], ["Dentists", "#team"], ["FAQs", "#faqs"]] as const;

function BrandMark() { return <span className="brand-mark" aria-hidden="true"><span /><span /></span>; }

function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(20px)" }} whileInView={{ opacity: 1, transform: "translateY(0px)" }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: [0.23, 1, 0.32, 1] }}>{children}</motion.div>;
}

export default function ClinicHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const reduceMotion = useReducedMotion();
  const heroItem = { hidden: { opacity: 0, transform: reduceMotion ? "none" : "translateY(16px)" }, show: { opacity: 1, transform: "translateY(0px)" } };

  return <main className="dental-home">
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Morrow Dental home"><BrandMark /><span>Morrow</span><small>dental</small></a>
      <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="header-actions"><a className="phone-link" href="tel:+15550142100"><Phone size={16} />(555) 014-2100</a><a className="button button-small button-dark" href="#book">Book a visit<ArrowRight size={16} /></a><button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></div>
      <AnimatePresence>{menuOpen && <motion.nav className="mobile-nav" initial={{ opacity: 0, transform: reduceMotion ? "none" : "translateY(-8px) scale(.98)" }} animate={{ opacity: 1, transform: "translateY(0) scale(1)" }} exit={{ opacity: 0, transform: reduceMotion ? "none" : "translateY(-4px) scale(.99)" }} transition={{ duration: .18, ease: [0.23, 1, 0.32, 1] }} aria-label="Mobile navigation">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowRight size={18} /></a>)}<a href="tel:+15550142100" onClick={() => setMenuOpen(false)}>Call (555) 014-2100<Phone size={18} /></a></motion.nav>}</AnimatePresence>
    </header>

    <section className="hero" id="top">
      <div className="hero-image" aria-hidden="true"><Image src="/images/dental/hero-3d.png" alt="" fill priority sizes="100vw" /><div className="hero-image-wash" /></div>
      <motion.div className="hero-content page-shell" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: reduceMotion ? 0 : .065 } } }}>
        <motion.div className="eyebrow" variants={heroItem} transition={{ duration: .5 }}><span className="pulse-dot" />Accepting new patients</motion.div>
        <motion.h1 variants={heroItem} transition={{ duration: .6, ease: [0.23, 1, 0.32, 1] }}>Dentistry, made<br /><em>beautifully simple.</em></motion.h1>
        <motion.p className="hero-copy" variants={heroItem} transition={{ duration: .6 }}>Modern preventive, cosmetic, and restorative dentistry—with a gentler touch, transparent plans, and time to listen.</motion.p>
        <motion.div className="hero-actions" variants={heroItem} transition={{ duration: .6 }}><a className="button button-primary" href="#book"><CalendarDays size={19} />Book a dental visit</a><a className="text-link" href="#care">Explore treatments <ArrowRight size={17} /></a></motion.div>
        <motion.div className="hero-proof" variants={heroItem} transition={{ duration: .6 }}><div className="avatar-stack" aria-hidden="true"><span>AM</span><span>JL</span><span>SK</span></div><div><div className="stars" aria-label="5 out of 5 stars">★★★★★</div><p>Trusted by 4,000+ smiles</p></div></motion.div>
      </motion.div>
      <div className="availability-card"><div className="availability-icon"><Clock3 size={19} /></div><div><span>Next available</span><strong>Today, 3:30 PM</strong></div><a href="#book" aria-label="Book today at 3:30 PM"><ArrowRight size={18} /></a></div>
    </section>

    <section className="trust-strip" aria-label="Dental care standards"><div className="page-shell trust-grid"><div><strong>45 min</strong><span>new patient visit</span></div><div><strong>4.9 / 5</strong><span>patient rating</span></div><div><strong>Same day</strong><span>emergency care</span></div><div><ShieldCheck size={23} /><span>digital-first dentistry</span></div></div></section>

    <section className="section services-section" id="care"><div className="page-shell"><SectionReveal className="section-heading split-heading"><div><span className="kicker">Complete dental care</span><h2>Everything your smile needs.</h2></div><p>From prevention to a full smile restoration, your care stays connected, clearly explained, and shaped around what matters to you.</p></SectionReveal><div className="service-grid">{services.map(service => { const Icon = service.icon; return <SectionReveal className="service-card" key={service.title}><div className="service-card-top"><span className="service-icon"><Icon size={22} /></span><span className="service-number">{service.number}</span></div><h3>{service.title}</h3><p>{service.description}</p><a href="#book">Explore care <ArrowRight size={17} /></a></SectionReveal>; })}</div></div></section>

    <section className="section approach-section" id="approach"><div className="page-shell approach-grid"><SectionReveal className="approach-visual"><div className="quote-card"><span className="quote-mark">“</span><p>I understood every option and never felt rushed into treatment.</p><div><strong>Marina R.</strong><span>Patient since 2022</span></div></div><div className="calm-orbit" aria-hidden="true" /></SectionReveal><SectionReveal className="approach-content"><span className="kicker">Comfort-led dentistry</span><h2>Comfort first.<br />Always clear.</h2><p className="lead">Great dentistry is precise, but it should also feel personal. We explain what we see, show you the options, and move at a pace that feels right.</p><ul className="check-list"><li><span><Check size={16} /></span>Gentle local anaesthesia</li><li><span><Check size={16} /></span>Digital scans, no messy impressions</li><li><span><Check size={16} /></span>Transparent treatment plans</li><li><span><Check size={16} /></span>Comfort and sedation options</li></ul><a className="button button-outline" href="#team">Meet your dentists <ArrowRight size={17} /></a></SectionReveal></div></section>

    <section className="section team-section" id="team"><div className="page-shell">
      <SectionReveal className="section-heading team-heading"><div><span className="kicker">The people behind your smile</span><h2>Clinical precision.<br />A genuinely gentle touch.</h2></div><p>Experienced dentists chosen for technical excellence, careful listening, and a calm chairside manner.</p></SectionReveal>
      <div className="team-grid">
        <SectionReveal className="doctor-card doctor-featured"><div className="doctor-portrait"><Image src="/images/doctors/amelia-morgan.png" alt="Dr. Amelia Morgan, cosmetic and general dentist" fill sizes="(max-width: 760px) 100vw, 55vw" /></div><div className="doctor-info"><div className="doctor-meta"><span>General & cosmetic dentistry</span><small>Accepting patients</small></div><h3>Dr. Amelia Morgan</h3><p>“Beautiful dentistry should still look completely like you.”</p><a href="#book">Meet Dr. Morgan <ArrowRight size={16} /></a></div></SectionReveal>
        <SectionReveal className="doctor-card doctor-compact"><div className="doctor-portrait"><Image src="/images/doctors/julia-lee.png" alt="Dr. Julia Lee, restorative dentist" fill sizes="(max-width: 760px) 100vw, 28vw" /></div><div className="doctor-info"><div className="doctor-meta"><span>Restorative dentistry</span><small>DDS · 12 years</small></div><h3>Dr. Julia Lee</h3><p>Conservative, natural restorations designed to last.</p><a href="#book">Meet Dr. Lee <ArrowRight size={16} /></a></div></SectionReveal>
        <SectionReveal className="doctor-card doctor-compact"><div className="doctor-portrait"><Image src="/images/doctors/samir-khan.png" alt="Dr. Samir Khan, implant dentist" fill sizes="(max-width: 760px) 100vw, 28vw" /></div><div className="doctor-info"><div className="doctor-meta"><span>Implant dentistry</span><small>DMD · 15 years</small></div><h3>Dr. Samir Khan</h3><p>Digitally planned implant care with clear, steady guidance.</p><a href="#book">Meet Dr. Khan <ArrowRight size={16} /></a></div></SectionReveal>
      </div>
    </div></section>

    <section className="section faq-section" id="faqs"><div className="page-shell faq-grid"><SectionReveal className="faq-intro"><span className="kicker">Good to know</span><h2>Your first visit, made simple.</h2><p>Still have a question? Our patient care team is happy to help.</p><a className="text-link" href="tel:+15550142100"><Phone size={17} /> Call (555) 014-2100</a></SectionReveal><div className="faq-list">{faqs.map((faq, index) => { const isOpen = openFaq === index; return <SectionReveal className="faq-item" key={faq.question}><button type="button" aria-expanded={isOpen} aria-controls={`faq-panel-${index}`} onClick={() => setOpenFaq(isOpen ? -1 : index)}>{faq.question}<ChevronDown size={20} className={isOpen ? "is-open" : ""} /></button><AnimatePresence initial={false}>{isOpen && <motion.div id={`faq-panel-${index}`} className="faq-answer" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reduceMotion ? .12 : .22, ease: [0.23, 1, 0.32, 1] }}><p>{faq.answer}</p></motion.div>}</AnimatePresence></SectionReveal>; })}</div></div></section>

    <section className="booking-section" id="book"><SectionReveal className="page-shell booking-card"><div><span className="booking-overline">A calmer dental experience</span><h2>Ready to love your smile?</h2><p>Book online in under two minutes. New patients are always welcome.</p></div><div className="booking-actions"><a className="button button-light" href="mailto:hello@morrowdental.com?subject=Dental appointment request"><CalendarDays size={19} /> Book your visit</a><span><Clock3 size={16} /> Same-day emergency care</span></div></SectionReveal></section>

    <footer>
      <div className="page-shell footer-intro"><div><a className="brand brand-light" href="#top"><BrandMark /><span>Morrow</span><small>dental</small></a><h2>A healthier smile<br /><em>starts here.</em></h2></div><a className="footer-portal" href="#book">Book your first visit <ArrowRight size={18} /></a></div>
      <div className="page-shell footer-grid"><div className="footer-brand"><span className="footer-label">Morrow Dental</span><p>Modern dental care built around comfort, clarity, and work that feels beautifully natural.</p></div><div><span className="footer-label">Explore</span><p><a href="#care">Treatments</a><br /><a href="#approach">Our approach</a><br /><a href="#team">Dentists</a><br /><a href="#faqs">FAQs</a></p></div><div><span className="footer-label">Visit</span><p>240 Willow Street<br />Brookfield, CA 90210<br /><span className="footer-muted">Mon–Fri · 8am–6pm<br />Saturday · 9am–2pm</span></p></div><div><span className="footer-label">Talk to us</span><p><a href="tel:+15550142100">(555) 014-2100</a><br /><a href="mailto:hello@morrowdental.com">hello@morrowdental.com</a><br /><a href="#book" className="footer-underlined">Patient portal</a></p></div></div>
      <div className="page-shell footer-bottom"><span>© 2026 Morrow Dental</span><div><a href="#top">Privacy</a><a href="#top">Accessibility</a><a href="#top">Terms</a></div></div>
    </footer>
  </main>;
}
