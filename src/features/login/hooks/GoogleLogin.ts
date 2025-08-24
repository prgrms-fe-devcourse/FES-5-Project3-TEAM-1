import supabase from '@/shared/libs/supabase';

function useGoogleLogin() {
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    console.log('데이터 : ', data);
    if (error) {
      console.error('Google 로그인 중 오류 발생:', error);
    }
  }
  return signInWithGoogle;
}
export default useGoogleLogin;
