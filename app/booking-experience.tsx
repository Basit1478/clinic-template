"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Phone, ShieldCheck, Sparkles, X } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";

const treatments = [
  { name: "Preventive care", detail: "Exam, hygiene, or routine check-up", icon: ShieldCheck },
  { name: "Cosmetic dentistry", detail: "Whitening, bonding, or veneers", icon: Sparkles },
  { name: "Restorative care", detail: "Crowns, bridges, or implants", icon: Check },
  { name: "Urgent dental care", detail: "Pain, swelling, or a broken tooth", icon: Clock3 },
];

const timings = [
  { value: "Today", detail: "For urgent concerns" },
  { value: "This week", detail: "Choose the earliest suitable visit" },
  { value: "Next available", detail: "Most flexible option" },
];

const focusableSelector = "button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";
const easeOut = [0.23, 1, 0.32, 1] as const;

export default function BookingExperience() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [treatment, setTreatment] = useState("");
  const [timing, setTiming] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const emailHref = useMemo(() => {
    const subject = encodeURIComponent("Dental appointment request");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nTreatment: ${treatment}\nPreferred timing: ${timing}`);
    return `mailto:hello@morrowdental.com?subject=${subject}&body=${body}`;
  }, [email, name, phone, timing, treatment]);

  function openBooking(trigger?: HTMLElement | null) {
    triggerRef.current = trigger ?? document.activeElement as HTMLElement;
    setOpen(true);
  }

  function closeBooking() {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 80);
  }

  useEffect(() => {
    function interceptBooking(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>('a[href="#book"]');
      if (!link) return;
      event.preventDefault();
      openBooking(link);
    }
    document.addEventListener("click", interceptBooking);
    return () => document.removeEventListener("click", interceptBooking);
  }, []);

  useEffect(() => {
    if (!open) return;
    const main = document.querySelector<HTMLElement>(".dental-home");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (main) main.inert = true;
    window.setTimeout(() => closeRef.current?.focus(), 30);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeBooking();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const elements = Array.from(panelRef.current.querySelectorAll<HTMLElement>(focusableSelector));
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (main) main.inert = false;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function resetFlow() {
    setStep(0);
    setTreatment("");
    setTiming("");
    setSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  const stepMotion = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, transform: "translateX(14px)" }, animate: { opacity: 1, transform: "translateX(0px)" }, exit: { opacity: 0, transform: "translateX(-8px)" } };

  return (
    <>
      <button className="mobile-booking-bar" type="button" onClick={(event) => openBooking(event.currentTarget)}>
        <CalendarDays size={18} />
        <span><strong>Book a dental visit</strong><small>New patients welcome</small></span>
        <ArrowRight size={18} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="booking-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? .12 : .2, ease: easeOut }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) closeBooking(); }}
          >
            <motion.aside
              ref={panelRef}
              className="booking-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-title"
              initial={{ transform: reduceMotion ? "none" : "translateX(100%)", opacity: reduceMotion ? 0 : 1 }}
              animate={{ transform: "translateX(0%)", opacity: 1 }}
              exit={{ transform: reduceMotion ? "none" : "translateX(100%)", opacity: reduceMotion ? 0 : 1 }}
              transition={reduceMotion ? { duration: .16 } : { type: "spring", duration: .42, bounce: 0 }}
            >
              <header className="booking-drawer-header">
                <a href="#top" className="drawer-brand" onClick={(event) => { event.preventDefault(); closeBooking(); }}><span aria-hidden="true">M</span>Morrow Dental</a>
                <button ref={closeRef} className="drawer-close" type="button" onClick={closeBooking} aria-label="Close appointment booking"><X size={20} /></button>
              </header>

              {!submitted && (
                <div className="booking-progress" aria-label={`Step ${step + 1} of 3`}>
                  <span>Step {step + 1} of 3</span>
                  <div aria-hidden="true"><i style={{ transform: `scaleX(${(step + 1) / 3})` }} /></div>
                </div>
              )}

              <div className="booking-drawer-body">
                <AnimatePresence mode="wait" initial={false}>
                  {submitted ? (
                    <motion.div className="booking-success" key="success" {...stepMotion} transition={{ duration: .2, ease: easeOut }}>
                      <span className="success-mark"><Check size={28} /></span>
                      <p className="drawer-kicker">Request prepared</p>
                      <h2 id="booking-title">You’re one step away.</h2>
                      <p>Your appointment details are ready. Send the request and our team will confirm the exact time with you.</p>
                      <div className="booking-summary">
                        <span><small>Treatment</small>{treatment}</span>
                        <span><small>Preferred time</small>{timing}</span>
                      </div>
                      <a className="drawer-primary" href={emailHref}>Send appointment request <ArrowRight size={18} /></a>
                      <button className="drawer-secondary" type="button" onClick={resetFlow}>Start again</button>
                      <small className="template-note">This template uses email for requests. Connect your clinic booking system before launch.</small>
                    </motion.div>
                  ) : step === 0 ? (
                    <motion.section key="treatment" {...stepMotion} transition={{ duration: .2, ease: easeOut }}>
                      <p className="drawer-kicker">Let’s find the right visit</p>
                      <h2 id="booking-title">How can we help?</h2>
                      <p className="drawer-intro">Choose the closest option. Your dentist will confirm what you need after a careful exam.</p>
                      <div className="drawer-options">
                        {treatments.map(({ name: option, detail, icon: Icon }) => (
                          <button type="button" key={option} aria-pressed={treatment === option} className={treatment === option ? "selected" : ""} onClick={() => setTreatment(option)}>
                            <span className="option-icon"><Icon size={19} /></span>
                            <span><strong>{option}</strong><small>{detail}</small></span>
                            <span className="option-check"><Check size={15} /></span>
                          </button>
                        ))}
                      </div>
                      <button className="drawer-primary" type="button" disabled={!treatment} onClick={() => setStep(1)}>Choose a time <ArrowRight size={18} /></button>
                    </motion.section>
                  ) : step === 1 ? (
                    <motion.section key="timing" {...stepMotion} transition={{ duration: .2, ease: easeOut }}>
                      <p className="drawer-kicker">Your preferred timing</p>
                      <h2 id="booking-title">When works for you?</h2>
                      <p className="drawer-intro">We’ll match your preference with the closest available appointment.</p>
                      <div className="drawer-options timing-options">
                        {timings.map(({ value, detail }) => (
                          <button type="button" key={value} aria-pressed={timing === value} className={timing === value ? "selected" : ""} onClick={() => setTiming(value)}>
                            <span className="option-icon"><CalendarDays size={19} /></span>
                            <span><strong>{value}</strong><small>{detail}</small></span>
                            <span className="option-check"><Check size={15} /></span>
                          </button>
                        ))}
                      </div>
                      <div className="drawer-nav"><button className="drawer-back" type="button" onClick={() => setStep(0)}><ArrowLeft size={17} /> Back</button><button className="drawer-primary" type="button" disabled={!timing} onClick={() => setStep(2)}>Your details <ArrowRight size={18} /></button></div>
                    </motion.section>
                  ) : (
                    <motion.form key="details" {...stepMotion} transition={{ duration: .2, ease: easeOut }} onSubmit={handleSubmit}>
                      <p className="drawer-kicker">Last step</p>
                      <h2 id="booking-title">Where should we reach you?</h2>
                      <p className="drawer-intro">Our care coordinator will confirm availability and explain any next steps.</p>
                      <div className="drawer-fields">
                        <label htmlFor="booking-name">Full name<input id="booking-name" name="name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required /></label>
                        <label htmlFor="booking-email">Email address<input id="booking-email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label>
                        <label htmlFor="booking-phone">Phone <small>Optional</small><input id="booking-phone" name="phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" /></label>
                      </div>
                      <div className="drawer-assurances"><span><ShieldCheck size={16} />Private and secure</span><span><Clock3 size={16} />Usually confirmed same day</span></div>
                      <div className="drawer-nav"><button className="drawer-back" type="button" onClick={() => setStep(1)}><ArrowLeft size={17} /> Back</button><button className="drawer-primary" type="submit">Review request <ArrowRight size={18} /></button></div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              <footer className="booking-drawer-footer"><span><Phone size={15} />Prefer to call?</span><a href="tel:+15550142100">(555) 014-2100</a></footer>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
