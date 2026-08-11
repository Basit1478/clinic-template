import BookingExperience from "./booking-experience";
import ClinicHome from "./clinic-home";
import EntranceExperience from "./entrance-experience";
import "./gallery.css";
import "./alignment.css";
import "./alignment-v2.css";
import "./alignment-v3.css";
import "./booking-experience.css";
import "./booking-polish.css";
import "./entrance-experience.css";

export default function Home() {
  return (
    <>
      <EntranceExperience />
      <ClinicHome />
      <BookingExperience />
    </>
  );
}
