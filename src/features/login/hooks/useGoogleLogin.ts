import supabase from '@/shared/libs/supabase';

function useGoogleLogin() {
  async function signInWithGoogle() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (error) {
      console.log('구글 로그인 중 에러 : ', error);
    }
  }
  return signInWithGoogle;
}
export default useGoogleLogin;
