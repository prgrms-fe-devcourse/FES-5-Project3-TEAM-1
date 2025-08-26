import supabase from '@/shared/libs/supabase';

function useGoogleLogin() {
  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      throw error;
    }
  }
  return signInWithGoogle;
}
export default useGoogleLogin;
