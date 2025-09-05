import InputModal from '@/shared/components/modals/InputModal';
import GoogleLoginButton from './GoogleLoginButton';
import GithubLoginButton from './GithubLoginButton';
import NimoWelcomePng from '@/assets/nimo/nimo_welcome.png';

interface Props {
  onClose: () => void;
}

function LoginModal({ onClose }: Props) {
  return (
    <InputModal
      title={'로그인'}
      content={
        ' Anónimo 스레드 만들기는\n소셜 로그인으로 간편하게 시작할 수 있어요.'
      }
      onClose={onClose}
      children={
        <div className="items-center flex flex-col gap-[20px] pt-[20px]">
          <img src={NimoWelcomePng} alt="nimo_welcome" />
          <div className="items-center flex flex-col gap-[14px] py-[20px]">
            <GoogleLoginButton />
            <GithubLoginButton />
          </div>
        </div>
      }
    />
  );
}
export default LoginModal;
