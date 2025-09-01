import nimoHi from '@/assets/images/nimoHi.png';
// import Button from '@/shared/components/button/Button';
import { useModal } from '@/shared/utils/ModalProvider';
type LandingPageProps = {
  size?: number;
};

export default function HeroSection03({ size = 600 }: LandingPageProps) {
  // const { openModal } = useModal();

  // const handleServiceButtonClick = () => {
  //   openModal('login');
  // };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative">
        <img
          src={nimoHi}
          alt="nimoHi 이미지"
          width={size}
          height={size}
          className="object-contain select-none pointer-events-none"
          draggable={false}
        />
      </div>

      {/* <h2 className="text-3xl text-black pt-5 pb-7">
        지금 바로 서비스를 이용해보세요!
      </h2>

      <Button
        size="default"
        color="blue"
        className="w-[200px] font-bold"
        onClick={handleServiceButtonClick}
      >
        서비스 이용하기
      </Button> */}
    </div>
  );
}
