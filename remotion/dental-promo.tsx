import type {CSSProperties, ReactNode} from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";

const colors = {
  ink: "#10271f",
  forest: "#14372d",
  sage: "#b8c9b9",
  cream: "#f2efe5",
  paper: "#fbfaf5",
  gold: "#c9b984",
  muted: "#67756d",
};

const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};
const ease = Easing.bezier(0.23, 1, 0.32, 1);

const enter = (frame: number, start: number, duration = 22) =>
  interpolate(frame, [start, start + duration], [0, 1], {...clamp, easing: ease});

const exit = (frame: number, start: number, duration = 18) =>
  interpolate(frame, [start, start + duration], [1, 0], {...clamp, easing: Easing.inOut(Easing.ease)});

const sceneOpacity = (frame: number, fadeIn: number, fadeOut: number) =>
  Math.min(enter(frame, fadeIn, 18), exit(frame, fadeOut, 18));

const Mark = ({light = false}: {light?: boolean}) => (
  <div style={{display: "flex", alignItems: "center", gap: 18}}>
    <div style={{position: "relative", width: 46, height: 46, border: `1px solid ${light ? "#f2efe588" : "#14372d55"}`, borderRadius: "50%"}}>
      <span style={{position: "absolute", left: 13, top: 12, width: 9, height: 21, border: `2px solid ${light ? colors.cream : colors.forest}`, borderTop: 0, borderRadius: "0 0 50% 50%", transform: "rotate(-12deg)"}} />
      <span style={{position: "absolute", right: 13, top: 12, width: 9, height: 21, border: `2px solid ${light ? colors.cream : colors.forest}`, borderTop: 0, borderRadius: "0 0 50% 50%", transform: "rotate(12deg)"}} />
    </div>
    <span style={{fontFamily: "Georgia, serif", fontSize: 31, letterSpacing: "-.045em", color: light ? colors.cream : colors.ink}}>Morrow <i>Dental</i></span>
  </div>
);

const Label = ({children, light = false}: {children: ReactNode; light?: boolean}) => (
  <div style={{fontFamily: "Arial, sans-serif", fontSize: 17, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".2em", color: light ? "#f2efe5b8" : colors.muted}}>{children}</div>
);

const Entrance = () => {
  const frame = useCurrentFrame();
  const opening = interpolate(frame, [32, 90], [0, 1], {...clamp, easing: Easing.bezier(0.76, 0, 0.24, 1)});
  const copy = interpolate(opening, [0, 0.5], [1, 0], clamp);
  const glow = interpolate(opening, [0, 1], [0.2, 1], clamp);

  const doorBase: CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "50.1%",
    overflow: "hidden",
    background: "linear-gradient(145deg, #1b3b31, #102d25 54%, #0c241e)",
    boxShadow: "inset 0 0 0 1px #ffffff0d, 0 0 90px #00000044",
    backfaceVisibility: "hidden",
  };

  return (
    <AbsoluteFill style={{background: colors.ink, opacity: exit(frame, 86, 12)}}>
      <Img src={staticFile("images/dental/hero-3d.png")} style={{width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.08 - opening * 0.08})`, filter: `brightness(${0.48 + glow * 0.42}) saturate(.72)`}} />
      <div style={{...doorBase, left: 0, transformOrigin: "left center", transform: `perspective(1500px) translateX(${-opening * 300}px) rotateY(${opening * 86}deg)`}}>
        <DoorDetails side="left" />
      </div>
      <div style={{...doorBase, right: 0, transformOrigin: "right center", transform: `perspective(1500px) translateX(${opening * 300}px) rotateY(${-opening * 86}deg)`}}>
        <DoorDetails side="right" />
      </div>
      <div style={{position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: copy, transform: `translateY(${-opening * 30}px)`}}>
        <Label light>A calmer dental experience</Label>
        <div style={{marginTop: 30, fontFamily: "Georgia, serif", fontSize: 150, lineHeight: .83, letterSpacing: "-.065em", textAlign: "center", color: colors.cream}}>Morrow<br/><i style={{color: colors.gold}}>Dental</i></div>
        <div style={{marginTop: 60, fontFamily: "Arial, sans-serif", fontSize: 17, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#f2efe5b8"}}>Scroll to enter&nbsp;&nbsp; ↓</div>
      </div>
      <div style={{position: "absolute", right: 70, bottom: 48, left: 70, height: 2, background: "#ffffff1e"}}><div style={{width: `${opening * 100}%`, height: "100%", background: colors.gold}} /></div>
    </AbsoluteFill>
  );
};

const DoorDetails = ({side}: {side: "left" | "right"}) => (
  <>
    <Img src={staticFile("illustrations/dental-linework.svg")} style={{position: "absolute", width: 720, height: 720, top: 180, opacity: .18, ...(side === "left" ? {right: -360} : {left: -360})}} />
    <div style={{position: "absolute", inset: "76px 72px 570px", border: "1px solid #d9ddc720", borderRadius: "300px 300px 35px 35px"}} />
    <div style={{position: "absolute", inset: "570px 72px 76px", border: "1px solid #d9ddc720", borderRadius: "35px 35px 300px 300px"}} />
    <div style={{position: "absolute", top: 510, [side === "left" ? "right" : "left"]: 25, width: 8, height: 62, borderRadius: 20, background: `linear-gradient(${colors.gold}, #75633d)`, boxShadow: "0 8px 24px #0008"}} />
  </>
);

const HeroScene = () => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 78, 186);
  const a = enter(frame, 88, 25);
  const tooth = enter(frame, 102, 34);
  return (
    <AbsoluteFill style={{background: colors.paper, opacity, overflow: "hidden"}}>
      <div style={{position: "absolute", top: 70, left: 84}}><Mark /></div>
      <div style={{position: "absolute", top: 235, left: 90, width: 980}}>
        <div style={{opacity: a, transform: `translateY(${(1 - a) * 35}px)`}}><Label>Accepting new patients</Label></div>
        <div style={{marginTop: 28, fontFamily: "Georgia, serif", fontSize: 132, lineHeight: .88, letterSpacing: "-.06em", color: colors.ink, opacity: a, transform: `translateY(${(1 - a) * 55}px)`}}>Dentistry, made<br/><i style={{color: "#718878"}}>beautifully simple.</i></div>
        <div style={{marginTop: 44, width: 720, fontFamily: "Arial, sans-serif", fontSize: 28, lineHeight: 1.45, color: colors.muted, opacity: enter(frame, 108, 24)}}>Modern care, transparent plans, and time to listen—designed around how you want to feel.</div>
      </div>
      <div style={{position: "absolute", right: -80, top: -70, width: 900, height: 1140, opacity: tooth, transform: `translateX(${(1 - tooth) * 90}px) scale(${1.04 - tooth * 0.04})`}}>
        <Img src={staticFile("images/dental/hero-3d.png")} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "58% center"}} />
        <div style={{position: "absolute", inset: 0, background: "linear-gradient(90deg, #fbfaf5 0%, transparent 26%)"}} />
      </div>
      <div style={{position: "absolute", left: 90, bottom: 85, display: "flex", alignItems: "center", gap: 24, opacity: enter(frame, 125, 20)}}>
        <div style={{padding: "20px 30px", borderRadius: 999, background: colors.forest, color: colors.cream, fontFamily: "Arial, sans-serif", fontSize: 20, fontWeight: 700}}>Book a dental visit&nbsp;&nbsp; →</div>
        <div style={{fontFamily: "Arial, sans-serif", fontSize: 19, color: colors.ink}}>4.9 / 5 patient care</div>
      </div>
    </AbsoluteFill>
  );
};

const CareScene = () => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 176, 296);
  const cards = [
    {src: "images/atelier/care-patient.jpg", number: "01", title: "Preventive care"},
    {src: "images/atelier/care-treatment.jpg", number: "02", title: "Cosmetic dentistry"},
    {src: "images/atelier/care-tools.jpg", number: "03", title: "Restorative care"},
  ];
  return (
    <AbsoluteFill style={{background: colors.cream, opacity, padding: "74px 82px"}}>
      <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>
        <div><Label>Complete dental care</Label><div style={{marginTop: 16, fontFamily: "Georgia, serif", fontSize: 82, letterSpacing: "-.05em", color: colors.ink}}>Everything your smile needs.</div></div>
        <div style={{width: 510, fontFamily: "Arial, sans-serif", fontSize: 23, lineHeight: 1.5, color: colors.muted}}>Gentle prevention, natural cosmetic work, and digitally precise restorations.</div>
      </div>
      <div style={{display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 24, marginTop: 52}}>
        {cards.map((card, index) => {
          const a = enter(frame, 195 + index * 10, 28);
          const imageY = interpolate(frame, [195, 300], [-18, 18], clamp);
          return <div key={card.title} style={{height: 690, position: "relative", overflow: "hidden", borderRadius: 24, opacity: a, transform: `translateY(${(1 - a) * 48 + (index === 1 ? -22 : 0)}px)`}}>
            <Img src={staticFile(card.src)} style={{width: "100%", height: "106%", objectFit: "cover", transform: `translateY(${imageY}px) scale(1.04)`}} />
            <div style={{position: "absolute", inset: 0, background: "linear-gradient(transparent 45%, #0b211dd9)"}} />
            <div style={{position: "absolute", right: 28, bottom: 29, left: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end", color: colors.cream}}>
              <div style={{fontFamily: "Georgia, serif", fontSize: 37}}>{card.title}</div>
              <div style={{fontFamily: "Arial, sans-serif", fontSize: 15, letterSpacing: ".16em"}}>{card.number}</div>
            </div>
          </div>;
        })}
      </div>
    </AbsoluteFill>
  );
};

const ComfortScene = () => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 286, 378);
  const photo = enter(frame, 302, 28);
  const copy = enter(frame, 316, 25);
  return (
    <AbsoluteFill style={{background: "#dce4d9", opacity, overflow: "hidden"}}>
      <div style={{position: "absolute", inset: "0 52% 0 0", overflow: "hidden", opacity: photo, transform: `translateX(${(1 - photo) * -60}px)`}}>
        <Img src={staticFile("images/atelier/patient-real-v2.jpg")} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 36%", transform: `scale(${1.08 - photo * .04})`}} />
        <div style={{position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 68%, #dce4d9)"}} />
      </div>
      <div style={{position: "absolute", top: 190, right: 100, width: 780, opacity: copy, transform: `translateY(${(1 - copy) * 45}px)`}}>
        <Label>Comfort-led dentistry</Label>
        <div style={{marginTop: 25, fontFamily: "Georgia, serif", fontSize: 112, lineHeight: .9, letterSpacing: "-.06em", color: colors.ink}}>Comfort first.<br/><i style={{color: "#687f71"}}>Always clear.</i></div>
        <div style={{marginTop: 48, paddingTop: 35, borderTop: "1px solid #14372d33", fontFamily: "Georgia, serif", fontSize: 36, lineHeight: 1.35, color: colors.ink}}>“I understood every option and never felt rushed into treatment.”</div>
        <div style={{marginTop: 24, fontFamily: "Arial, sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: ".1em", color: colors.muted}}>MARINA R. · PATIENT SINCE 2022</div>
      </div>
    </AbsoluteFill>
  );
};

const FinalScene = () => {
  const frame = useCurrentFrame();
  const opacity = enter(frame, 366, 22);
  const copy = enter(frame, 382, 27);
  const orbit = interpolate(frame, [370, 450], [0, 20], clamp);
  return (
    <AbsoluteFill style={{background: colors.forest, color: colors.cream, opacity, overflow: "hidden"}}>
      <div style={{position: "absolute", width: 860, height: 860, right: -190, top: -280, border: "1px solid #f2efe51f", borderRadius: "50%", transform: `rotate(${orbit}deg)`}} />
      <div style={{position: "absolute", width: 550, height: 550, right: -60, top: -105, border: "1px solid #c9b98438", borderRadius: "50%"}} />
      <Img src={staticFile("images/dental/implant-3d.png")} style={{position: "absolute", right: 20, bottom: -290, width: 760, height: 940, objectFit: "contain", opacity: .68, transform: `translateY(${(1 - copy) * 80}px) rotate(8deg)`, filter: "saturate(.65)"}} />
      <div style={{position: "absolute", top: 75, left: 86}}><Mark light /></div>
      <div style={{position: "absolute", left: 90, top: 300, width: 1150, opacity: copy, transform: `translateY(${(1 - copy) * 45}px)`}}>
        <Label light>New patients welcome</Label>
        <div style={{marginTop: 25, fontFamily: "Georgia, serif", fontSize: 142, lineHeight: .88, letterSpacing: "-.06em"}}>A healthier smile<br/><i style={{color: colors.gold}}>starts here.</i></div>
        <div style={{display: "flex", alignItems: "center", gap: 28, marginTop: 65}}>
          <div style={{padding: "23px 34px", borderRadius: 999, background: colors.cream, color: colors.ink, fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: 21}}>Book your first visit&nbsp;&nbsp; →</div>
          <div style={{fontFamily: "Arial, sans-serif", fontSize: 20, color: "#f2efe5b8"}}>(555) 014-2100</div>
        </div>
      </div>
      <div style={{position: "absolute", right: 88, bottom: 52, fontFamily: "Arial, sans-serif", fontSize: 16, letterSpacing: ".14em", color: "#f2efe57c"}}>MORROWDENTAL.COM</div>
    </AbsoluteFill>
  );
};

const Grain = () => (
  <AbsoluteFill style={{pointerEvents: "none", opacity: .055, mixBlendMode: "multiply", backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.75'/%3E%3C/svg%3E\")"}} />
);

export const DentalPromo = () => (
  <AbsoluteFill style={{background: colors.paper}}>
    <Sequence from={0} durationInFrames={105} premountFor={30}><Entrance /></Sequence>
    <Sequence from={0} durationInFrames={220} premountFor={30}><HeroScene /></Sequence>
    <Sequence from={0} durationInFrames={330} premountFor={30}><CareScene /></Sequence>
    <Sequence from={0} durationInFrames={410} premountFor={30}><ComfortScene /></Sequence>
    <Sequence from={0} durationInFrames={450} premountFor={30}><FinalScene /></Sequence>
    <Grain />
  </AbsoluteFill>
);
