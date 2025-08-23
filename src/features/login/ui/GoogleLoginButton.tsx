import googleIcon from '@/assets/icon/google_icon.svg';
import GoogleLogin from '../hooks/GoogleLogin';

function GoogleLoginButton() {
  const handleGoogleLogin = GoogleLogin();

  return (
    <button
      className="px-[46px] py-[14.5px] border border-black rounded-3xl w-2xs flex gap-[20px]"
      onClick={handleGoogleLogin}
    >
      <img src={googleIcon} alt="githubIcon" />
      <p>Google로 시작하기</p>
    </button>
  );
}
export default GoogleLoginButton;
