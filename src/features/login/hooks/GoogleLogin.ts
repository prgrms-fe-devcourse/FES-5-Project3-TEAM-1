import { createClient } from '@supabase/supabase-js';

const client = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

function useGoogleLogin() {
  async function signInWithGoogle() {
    const { data, error } = await client.auth.signInWithOAuth({
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
