import supabase from '@/shared/libs/supabase';

function useGithubLogin() {
  async function signInWithGithub() {
    try {
      const currentUrl = window.location.href;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: currentUrl,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.log('깃허브 로그인 중 에러 : ', error);
    }
  }
  return signInWithGithub;
}
export default useGithubLogin;
