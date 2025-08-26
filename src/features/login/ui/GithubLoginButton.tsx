import githubIcon from '@/assets/icon/github_icon.svg';
import useGithubLogin from '../hooks/useGithubLogin';

function GithubLoginButton() {
  const handleGithubLogin = useGithubLogin();

  return (
    <button
      className="px-[46px] py-[14.5px] border border-black rounded-3xl w-2xs flex gap-[20px]"
      onClick={handleGithubLogin}
    >
      <img src={githubIcon} alt="githubIcon" />
      <p>Github로 시작하기</p>
    </button>
  );
}
export default GithubLoginButton;
