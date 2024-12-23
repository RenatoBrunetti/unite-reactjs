import uniteIcon from "../assets/unite-icon.svg";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2">
      <img src={uniteIcon} />
      <nav className="flex items-center gap-5">
        <NavLink href="/events">Events</NavLink>
        <NavLink href="/attendees">Attendees</NavLink>
      </nav>
    </div>
  );
}
