import { Link } from "react-router"
import logo from '@/assets/logo.png'
import moonSVG from '@/assets/icon/moon-20.svg'
import settingsSVG from '@/assets/icon/settings-36.svg'
import usersSVG from '@/assets/icon/users-20.svg'
import clsx from "clsx";

interface Props {
  tabs: {id: string; label: string}[];
  currentTab : string;
  onTabChange: (tabId:string) => void;
}

function Header({tabs, currentTab, onTabChange} :Props) {
  return (
    <header className="flex items-center md:flex-nowrap w-full px-5 pt-2 md:h-20 h-auto flex-wrap md: justify-between gap-2 md:gap-4 shadow-slate-200 shadow-md">
      <Link to="/" className="order-1"><img src={logo} alt="Anonimo" /></Link>
      <nav className="flex order-3 md:order-2 mx-auto gap-6 w-full h-18 md:w-auto ">
        {
          tabs.map(tab => (
            <button
            key={tab.id}
            className={clsx('text-xl flex-1 md:flex-auto' ,currentTab === tab.id ? 'font-bold border-b-2 border-b-slate-900' : '')}
            onClick={() => onTabChange(tab.id)}>
              {tab.label}
            </button>
          ))
        }
      </nav>

      <div className="flex gap-4 order-2 md:order-3">
        <button className="flex justify-center items-center w-9 h-9 rounded-full bg-secondary" aria-label="다크 모드"><img src={moonSVG} aria-hidden="true" className="w-5 h-5"/></button>
        <div className="flex justify-center items-center gap-1 min-w-20 bg-primary rounded-4xl"><img className="flex w-5 h-5" src={usersSVG} alt="" aria-hidden="true"/><output aria-live="polite" aria-label="현재 참여자 수" className="text-lg">30</output></div>
        <button aria-haspopup="true" aria-label="설정"><img src={settingsSVG} alt="" aria-hidden="true"/></button>
      </div>
    </header>
  )
}
export default Header