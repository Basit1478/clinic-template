import {Composition, Folder} from "remotion";
import {DentalPromo} from "./dental-promo";
import {DentalPromoPortrait} from "./dental-promo-portrait";
import {DentalPromoPortraitLowRes} from "./dental-promo-portrait-lowres";

export const RemotionRoot = () => (
  <Folder name="Morrow-Dental-Campaign">
    <Composition
      id="MorrowDentalPromo"
      component={DentalPromo}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="MorrowDentalPromoPortrait"
      component={DentalPromoPortrait}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="MorrowDentalPromoPortraitRender"
      component={DentalPromoPortraitLowRes}
      durationInFrames={450}
      fps={30}
      width={360}
      height={640}
    />
  </Folder>
);
