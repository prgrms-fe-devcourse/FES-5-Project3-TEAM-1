import { useAuth } from '@/shared/utils/AuthProvider';
import { useModal } from '@/shared/utils/ModalProvider';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother, ScrollTrigger } from 'gsap/all';
import HeroSection01 from './component/HeroSection01';
import settingsSVG from '@/assets/icon/settings-32.svg';
import type { HeroSectionProps } from './type/Hero';
import ScrollSvg from '@/assets/icon/scroll-24.svg?react';
import HeroSection02 from './component/HeroSection02';
import SettingsMenu from '@/shared/components/header/SettingsMenu';
import useLogout from '@/features/login/hooks/useLogout';
import { useCloseOnOutsideOrEsc } from '@/shared/hook/useCloseOnOutsideOrEsc';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const Home = () => {
  const login = useAuth();
  const modal = useModal();
  useEffect(() => {
    if (login.isFirstLogin) {
      modal.openModal('welcome');
      login.firstLogin();
    }
  }, [login.isFirstLogin]);

  // const modal = useModal();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const section01Ref = useRef<HeroSectionProps>(null);
  const section02Ref = useRef<HeroSectionProps>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const scrollRef = useRef<HTMLButtonElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const settingsMenuRef = useRef<HTMLDivElement>(null);
  const loginAuth = useAuth();
  const logout = useLogout();

  const isLoginUser = !!loginAuth.userId;

  // Section01 progress 안전하게 적용
  useEffect(() => {
    let rafId: number;

    const updateProgress = () => {
      if (!smootherRef.current) return;

      const scrollTop = smootherRef.current.scrollTop(); // SMOOTHER 기준
      const vh = window.innerHeight;

      if (section01Ref.current?.tl) {
        const progress = Math.min(scrollTop / vh, 1);
        section01Ref.current.tl.progress(progress);
      }

      rafId = requestAnimationFrame(updateProgress);
    };

    rafId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // 버튼 둥둥 애니메이션
  useEffect(() => {
    if (!buttonRef.current) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(buttonRef.current, { y: -6, duration: 1, ease: 'power1.inOut' });
    return () => {
      tl.kill();
    };
  }, []);

  // ScrollSmoother 생성
  useEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: '#wrapper',
      content: '#content',
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    return () => {
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

  // scroll 버튼
  useEffect(() => {
    if (!scrollRef.current) return;

    const tl = gsap.to(scrollRef.current, {
      y: 12,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [showScrollBtn]);

  useEffect(() => {
    const updateScrollBtn = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setShowScrollBtn(scrollTop < maxScroll - 5);
    };

    updateScrollBtn(); // 초기 체크
    window.addEventListener('scroll', updateScrollBtn);
    window.addEventListener('resize', updateScrollBtn);

    return () => {
      window.removeEventListener('scroll', updateScrollBtn);
      window.removeEventListener('resize', updateScrollBtn);
    };
  }, []);

  /* 훅 이용 (esc or 밖 클릭 시 settingsMenu 닫힘) xl일 시는 안함*/
  useCloseOnOutsideOrEsc<HTMLDivElement>({
    ref: settingsMenuRef,
    onClose: () => setIsOpen(false),
  });

  return (
    <div id="wrapper" className="relative home-font">
      <div id="content">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(https://mehfhzgjbfywylancalx.supabase.co/storage/v1/object/public/assets/cloude.webp)`,
          }}
        />

        <HeroSection01 ref={section01Ref} />

        <HeroSection02 ref={section02Ref} />
      </div>

      <div ref={settingsMenuRef} className="absolute right-3 top-3">
        <button
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label="설정"
          onClick={() => setIsOpen((prev) => !prev)}
          className="group place-items-center grid"
        >
          <img
            src={settingsSVG}
            alt=""
            aria-hidden="true"
            className="block w-12 origin-center motion-safe:group-hover:animate-[spin_1300ms_linear_infinite]"
          />
        </button>

        <SettingsMenu
          isOpen={isOpen}
          isLoginUser={isLoginUser}
          logout={logout}
          onClose={() => setIsOpen(false)}
          className="settings-menu"
        ></SettingsMenu>
      </div>

      {showScrollBtn && (
        <button
          ref={scrollRef}
          type="button"
          onClick={() => {
            window.scrollBy({
              top: 600,
              behavior: 'smooth',
            });
          }}
          className="absolute bottom-[2.5rem] left-1/2 -translate-x-1/2 flex flex-col flex-center"
        >
          <ScrollSvg className="w-8 h-8" />
          <span
            className="text-real-black text-3xl"
            style={{ WebkitTextStroke: '1px white' }}
          >
            Scroll!
          </span>
        </button>
      )}
    </div>
  );
};
export default Home;
