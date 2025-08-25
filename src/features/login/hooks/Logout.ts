import supabase from '@/shared/libs/supabase';
import { useAuth } from '@/shared/utils/LoginAuth';

function useLogout() {
  const { logout } = useAuth();
  const Logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('로그아웃 중 에러 : ', error);
      return { success: false, error };
    }
    logout();
    return { success: true };
  };
  return Logout;
}
export default useLogout;
