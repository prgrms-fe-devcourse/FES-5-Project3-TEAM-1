import githubIcon from '@/assets/icon/github_icon.svg';
import githubDarkIcon from '@/assets/icon/github_icon_dark.svg';
import useGithubLogin from '../hooks/useGithubLogin';
import { useThemeStore } from '@/features/dark-mode/hooks/useThemeStore';

function GithubLoginButton() {
  const handleGithubLogin = useGithubLogin();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <button
      className="px-[46px] py-[14.5px] border border-black rounded-3xl w-2xs flex gap-[20px]"
      onClick={handleGithubLogin}
    >
      <img src={isDarkMode ? githubDarkIcon : githubIcon} alt="githubIcon" />
      <p>Github로 시작하기</p>
    </button>
  );
}
export default GithubLoginButton;
