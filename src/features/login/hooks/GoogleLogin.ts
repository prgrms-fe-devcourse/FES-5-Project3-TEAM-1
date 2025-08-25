import supabase from '@/shared/libs/supabase';

function useGoogleLogin() {
  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      console.error('Google 로그인 중 오류 발생:', error);
      return { success: false, error };
    }
    return { success: true };
  }
  return signInWithGoogle;
}
export default useGoogleLogin;
