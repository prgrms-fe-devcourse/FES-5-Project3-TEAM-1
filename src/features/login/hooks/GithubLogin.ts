import { createClient } from '@supabase/supabase-js';

const client = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

function useGithubLogin() {
  async function signInWithGithub() {
    const { data, error } = await client.auth.signInWithOAuth({
      provider: 'github',
    });
    console.log('데이터 : ', data);
    if (error) {
      console.error('Github 로그인 중 오류 발생:', error);
    }
  }
  return signInWithGithub;
}
export default useGithubLogin;
