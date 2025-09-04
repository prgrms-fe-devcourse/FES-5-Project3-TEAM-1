import Button from '@/shared/components/button/Button';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="h-screen w-screen flex-center flex-col">
      <div className="relative">
        <img
          src="https://mehfhzgjbfywylancalx.supabase.co/storage/v1/object/public/assets/uzxcrqiqxgfy88tod9cn.webp"
          className="absolute -top-10 left-1/2 -translate-x-1/2"
          alt=""
          width={120}
          height={120}
        />

        <h1 className="text-9xl font-bold z-10 text-danger text-stroke-black text-center">
          4<span>0</span>4
        </h1>
      </div>
      <div className="flex-center flex-col gap-5 my-6 text-center">
        <p className="font-semibold text-xl sm:text-2xl">
          앗! 잘못된 링크예요. <br /> 길을 잃으셨다면, 홈으로 돌아갈까요?
        </p>

        <Button
          size="default"
          color="default"
          className="w-30"
          aria-label="홈으로"
          onClick={handleHome}
        >
          홈으로
        </Button>
      </div>
    </div>
  );
};
export default NotFound;
