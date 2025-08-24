import supabase from '@/shared/libs/supabase';

function useGithubLogin() {
  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
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
