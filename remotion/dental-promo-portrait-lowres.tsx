import {AbsoluteFill} from "remotion";
import {DentalPromoPortrait} from "./dental-promo-portrait";

export const DentalPromoPortraitLowRes = () => (
  <AbsoluteFill style={{backgroundColor: "#fbfaf5", overflow: "hidden"}}>
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        transformOrigin: "top left",
        transform: "scale(0.3333333333)",
      }}
    >
      <DentalPromoPortrait />
    </div>
  </AbsoluteFill>
);
