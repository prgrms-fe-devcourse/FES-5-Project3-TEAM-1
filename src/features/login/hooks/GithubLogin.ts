import supabase from '@/shared/libs/supabase';

function useGithubLogin() {
  async function signInWithGithub() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    if (error) {
      throw error;
    }
  }
  return signInWithGithub;
}
export default useGithubLogin;
