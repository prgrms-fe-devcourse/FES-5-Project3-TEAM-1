import nimo from '@/assets/nimo/nimo-sm.png';
import { Link } from 'react-router';

function Footer() {
  return (
    <footer className="flex flex-col justify-between gap-2 md:gap-0 px-5 py-3 h-25 md:h-22 min-h-22 border-t-gray border-t-1">
      <Link to="/" className="hidden md:block">
        <img src={nimo} alt="Anónimo" aria-hidden="true" className="w-8 h-8" />
      </Link>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-1">
        <address className="flex flex-col md:flex-row gap-1 md:gap-3 not-italic">
          <div className="flex gap-2">
            <strong className="pr-1 relative after:content-[''] after:block after:absolute after:right-0 after:top-2.5 after:w-0.25 after:h-2 after:bg-slate-900">
              Contact
            </strong>
            <a
              href="https://github.com/prgrms-fe-devcourse/FES-5-Project3-TEAM-1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-dark underline"
            >
              GitHub anonimo
            </a>
          </div>
          <div className="flex gap-2">
            <strong className="pr-1 relative after:content-[''] after:block after:absolute after:right-0 after:top-2.5 after:w-0.25 after:h-2 after:bg-slate-900">
              Made by
            </strong>
            <a
              href="https://github.com/prgrms-fe-devcourse/FES-5-Project3-TEAM-1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-dark"
            >
              Whysmile
            </a>
          </div>
        </address>

        <small className="text-base text-gray-dark">
          &copy; 2025 Anónimo. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
export default Footer;
