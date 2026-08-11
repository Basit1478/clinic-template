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

const ink = "#10271f";
const forest = "#14372d";
const cream = "#f2efe5";
const paper = "#fbfaf5";
const gold = "#c9b984";
const muted = "#67756d";
const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};

const reveal = (frame: number, start: number, duration = 22) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.23, 1, 0.32, 1),
  });

const fadeOut = (frame: number, start: number, duration = 18) =>
  interpolate(frame, [start, start + duration], [1, 0], {
    ...clamp,
    easing: Easing.inOut(Easing.ease),
  });

const sceneOpacity = (frame: number, fadeIn: number, fadeAt: number) =>
  Math.min(reveal(frame, fadeIn, 18), fadeOut(frame, fadeAt, 18));

const Label = ({children, light = false}: {children: ReactNode; light?: boolean}) => (
  <div style={{fontFamily: "Arial, sans-serif", fontSize: 22, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".19em", color: light ? "#f2efe5b8" : muted}}>{children}</div>
);

const Mark = ({light = false}: {light?: boolean}) => (
  <div style={{display: "flex", alignItems: "center", gap: 18}}>
    <div style={{position: "relative", width: 56, height: 56, border: `1px solid ${light ? "#f2efe588" : "#14372d55"}`, borderRadius: "50%"}}>
      <span style={{position: "absolute", left: 16, top: 14, width: 11, height: 26, border: `2px solid ${light ? cream : forest}`, borderTop: 0, borderRadius: "0 0 50% 50%", rotate: "-12deg"}} />
      <span style={{position: "absolute", right: 16, top: 14, width: 11, height: 26, border: `2px solid ${light ? cream : forest}`, borderTop: 0, borderRadius: "0 0 50% 50%", rotate: "12deg"}} />
    </div>
    <span style={{fontFamily: "Georgia, serif", fontSize: 38, letterSpacing: "-.045em", color: light ? cream : ink}}>Morrow <i>Dental</i></span>
  </div>
);

const PortraitDoor = ({side}: {side: "left" | "right"}) => {
  const frame = useCurrentFrame();
  const opening = interpolate(frame, [32, 90], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.76, 0, 0.24, 1),
  });
  const style: CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "50.1%",
    overflow: "hidden",
    background: "linear-gradient(145deg, #1b3b31, #102d25 54%, #0c241e)",
    boxShadow: "inset 0 0 0 1px #ffffff0d, 0 0 90px #00000044",
    backfaceVisibility: "hidden",
    transformOrigin: side === "left" ? "left center" : "right center",
    transform: side === "left"
      ? `perspective(1500px) translateX(${-opening * 170}px) rotateY(${opening * 86}deg)`
      : `perspective(1500px) translateX(${opening * 170}px) rotateY(${-opening * 86}deg)`,
    ...(side === "left" ? {left: 0} : {right: 0}),
  };
  return (
    <div style={style}>
      <Img src={staticFile("illustrations/dental-linework.svg")} style={{position: "absolute", width: 820, height: 820, top: 520, opacity: .19, ...(side === "left" ? {right: -410} : {left: -410})}} />
      <div style={{position: "absolute", inset: "110px 42px 1080px", border: "1px solid #d9ddc720", borderRadius: "360px 360px 38px 38px"}} />
      <div style={{position: "absolute", inset: "1080px 42px 110px", border: "1px solid #d9ddc720", borderRadius: "38px 38px 360px 360px"}} />
      <div style={{position: "absolute", top: 930, [side === "left" ? "right" : "left"]: 20, width: 8, height: 72, borderRadius: 20, background: `linear-gradient(${gold}, #75633d)`, boxShadow: "0 8px 24px #0008"}} />
    </div>
  );
};

const PortraitEntrance = () => {
  const frame = useCurrentFrame();
  const opening = interpolate(frame, [32, 90], [0, 1], {...clamp, easing: Easing.bezier(0.76, 0, 0.24, 1)});
  return (
    <AbsoluteFill style={{background: ink, opacity: fadeOut(frame, 86, 12)}}>
      <Img src={staticFile("images/dental/hero-3d.png")} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "58% center", scale: 1.16 - opening * .1, filter: `brightness(${.5 + opening * .38}) saturate(.72)`}} />
      <PortraitDoor side="left" />
      <PortraitDoor side="right" />
      <div style={{position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: interpolate(opening, [0, .52], [1, 0], clamp), translate: `0px ${-opening * 38}px`}}>
        <Label light>A calmer dental experience</Label>
        <div style={{marginTop: 34, fontFamily: "Georgia, serif", fontSize: 148, lineHeight: .84, letterSpacing: "-.065em", textAlign: "center", color: cream}}>Morrow<br/><i style={{color: gold}}>Dental</i></div>
        <div style={{marginTop: 78, fontFamily: "Arial, sans-serif", fontSize: 21, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#f2efe5b8"}}>Scroll to enter&nbsp;&nbsp; ↓</div>
      </div>
      <div style={{position: "absolute", right: 70, bottom: 90, left: 70, height: 2, background: "#ffffff1e"}}><div style={{width: `${opening * 100}%`, height: "100%", background: gold}} /></div>
    </AbsoluteFill>
  );
};

const PortraitHero = () => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 78, 186);
  const copy = reveal(frame, 88, 26);
  const image = reveal(frame, 106, 32);
  return (
    <AbsoluteFill style={{background: paper, opacity, overflow: "hidden"}}>
      <div style={{position: "absolute", top: 92, left: 72}}><Mark /></div>
      <div style={{position: "absolute", top: 300, right: 72, left: 72, zIndex: 2}}>
        <div style={{opacity: copy, translate: `0px ${(1 - copy) * 38}px`}}><Label>Accepting new patients</Label></div>
        <div style={{marginTop: 32, fontFamily: "Georgia, serif", fontSize: 120, lineHeight: .88, letterSpacing: "-.06em", color: ink, opacity: copy, translate: `0px ${(1 - copy) * 58}px`}}>Dentistry,<br/>made <i style={{color: "#718878"}}>beautifully</i><br/>simple.</div>
        <div style={{marginTop: 42, width: 820, fontFamily: "Arial, sans-serif", fontSize: 31, lineHeight: 1.45, color: muted, opacity: reveal(frame, 108, 24)}}>Modern care, transparent plans, and time to listen—designed around how you want to feel.</div>
      </div>
      <div style={{position: "absolute", right: -155, bottom: -100, width: 1000, height: 1060, opacity: image, translate: `${(1 - image) * 100}px 0px`, scale: 1.04 - image * .04}}>
        <Img src={staticFile("images/dental/hero-3d.png")} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "58% center"}} />
        <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg, #fbfaf5 0%, transparent 22%)"}} />
      </div>
      <div style={{position: "absolute", left: 72, bottom: 106, zIndex: 3, padding: "26px 38px", borderRadius: 999, background: forest, color: cream, fontFamily: "Arial, sans-serif", fontSize: 24, fontWeight: 700, opacity: reveal(frame, 126, 20)}}>Book a dental visit&nbsp;&nbsp; →</div>
    </AbsoluteFill>
  );
};

const PortraitCare = () => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 176, 296);
  const cards = [
    {src: "images/atelier/care-patient.jpg", number: "01", title: "Preventive care"},
    {src: "images/atelier/care-treatment.jpg", number: "02", title: "Cosmetic dentistry"},
    {src: "images/atelier/care-tools.jpg", number: "03", title: "Restorative care"},
  ];
  return (
    <AbsoluteFill style={{background: cream, opacity, padding: "90px 64px"}}>
      <Label>Complete dental care</Label>
      <div style={{marginTop: 20, fontFamily: "Georgia, serif", fontSize: 86, lineHeight: .94, letterSpacing: "-.05em", color: ink}}>Everything your<br/>smile needs.</div>
      <div style={{display: "grid", gap: 24, marginTop: 54}}>
        {cards.map((card, index) => {
          const animation = reveal(frame, 195 + index * 10, 27);
          return (
            <div key={card.title} style={{height: 395, position: "relative", overflow: "hidden", borderRadius: 28, background: ink, opacity: animation, translate: `0px ${(1 - animation) * 50}px`}}>
              <Img src={staticFile(card.src)} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: index === 2 ? "center 62%" : "center", scale: 1.04}} />
              <div style={{position: "absolute", inset: 0, background: "linear-gradient(90deg, #0b211ddd 0%, #0b211d55 54%, transparent)"}} />
              <div style={{position: "absolute", top: 42, left: 40, color: cream, fontFamily: "Arial, sans-serif", fontSize: 18, letterSpacing: ".15em"}}>{card.number}</div>
              <div style={{position: "absolute", right: 38, bottom: 42, left: 40, color: cream, fontFamily: "Georgia, serif", fontSize: 47}}>{card.title}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const PortraitComfort = () => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 286, 378);
  const photo = reveal(frame, 300, 28);
  const quote = reveal(frame, 316, 25);
  return (
    <AbsoluteFill style={{background: "#dce4d9", opacity, overflow: "hidden"}}>
      <Img src={staticFile("images/atelier/patient-real-v2.jpg")} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 36%", opacity: photo, scale: 1.09 - photo * .04}} />
      <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 36%, #10271ff0 79%, #10271f)"}} />
      <div style={{position: "absolute", right: 68, bottom: 120, left: 68, color: cream, opacity: quote, translate: `0px ${(1 - quote) * 48}px`}}>
        <Label light>Comfort-led dentistry</Label>
        <div style={{marginTop: 25, fontFamily: "Georgia, serif", fontSize: 103, lineHeight: .9, letterSpacing: "-.06em"}}>Comfort first.<br/><i style={{color: gold}}>Always clear.</i></div>
        <div style={{marginTop: 45, paddingTop: 34, borderTop: "1px solid #f2efe545", fontFamily: "Georgia, serif", fontSize: 39, lineHeight: 1.35}}>“I understood every option and never felt rushed into treatment.”</div>
        <div style={{marginTop: 26, fontFamily: "Arial, sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: ".1em", color: "#f2efe5a8"}}>MARINA R. · PATIENT SINCE 2022</div>
      </div>
    </AbsoluteFill>
  );
};

const PortraitFinal = () => {
  const frame = useCurrentFrame();
  const opacity = reveal(frame, 366, 22);
  const copy = reveal(frame, 382, 27);
  return (
    <AbsoluteFill style={{background: forest, color: cream, opacity, overflow: "hidden"}}>
      <div style={{position: "absolute", top: 88, left: 70}}><Mark light /></div>
      <div style={{position: "absolute", width: 900, height: 900, right: -300, top: 160, border: "1px solid #f2efe51f", borderRadius: "50%", rotate: `${interpolate(frame, [370, 450], [0, 18], clamp)}deg`}} />
      <Img src={staticFile("images/dental/implant-3d.png")} style={{position: "absolute", top: 230, right: -210, width: 920, height: 1020, objectFit: "contain", opacity: .76, translate: `${(1 - copy) * 90}px 0px`, rotate: "8deg", filter: "saturate(.65)"}} />
      <div style={{position: "absolute", right: 70, bottom: 130, left: 70, opacity: copy, translate: `0px ${(1 - copy) * 48}px`}}>
        <Label light>New patients welcome</Label>
        <div style={{marginTop: 28, fontFamily: "Georgia, serif", fontSize: 116, lineHeight: .89, letterSpacing: "-.06em"}}>A healthier<br/>smile <i style={{color: gold}}>starts here.</i></div>
        <div style={{marginTop: 58, display: "inline-block", padding: "27px 38px", borderRadius: 999, background: cream, color: ink, fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: 24}}>Book your first visit&nbsp;&nbsp; →</div>
        <div style={{marginTop: 32, fontFamily: "Arial, sans-serif", fontSize: 21, color: "#f2efe5a8"}}>(555) 014-2100&nbsp;&nbsp; · &nbsp;&nbsp;MORROWDENTAL.COM</div>
      </div>
    </AbsoluteFill>
  );
};

export const DentalPromoPortrait = () => (
  <AbsoluteFill style={{background: paper}}>
    <Sequence name="Entrance" from={0} durationInFrames={105} premountFor={30}><PortraitEntrance /></Sequence>
    <Sequence name="Hero" from={0} durationInFrames={220} premountFor={30}><PortraitHero /></Sequence>
    <Sequence name="Treatments" from={0} durationInFrames={330} premountFor={30}><PortraitCare /></Sequence>
    <Sequence name="Comfort" from={0} durationInFrames={410} premountFor={30}><PortraitComfort /></Sequence>
    <Sequence name="Call to action" from={0} durationInFrames={450} premountFor={30}><PortraitFinal /></Sequence>
    <AbsoluteFill style={{pointerEvents: "none", opacity: .055, mixBlendMode: "multiply", backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.75'/%3E%3C/svg%3E\")"}} />
  </AbsoluteFill>
);
