import supabase from '@/shared/libs/supabase';

function useGithubLogin() {
  async function signInWithGithub() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    if (error) {
      console.error('Github 로그인 중 오류 발생:', error);
			return {success: false, error};
    }
		return {success: true};
  }
  return signInWithGithub;
}
export default useGithubLogin;
