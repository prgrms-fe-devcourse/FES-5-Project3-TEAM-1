import supabase from '@/shared/libs/supabase';
import { useAuth } from '@/shared/utils/AuthProvider';
import { toastUtils } from '@/shared/utils/toastUtils';

function useLogout() {
  const { logout } = useAuth();
  const Logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('로그아웃 중 에러 : ', error);
      return { success: false, error };
    }
    logout();
    toastUtils.success('로그아웃 완료');
    return { success: true };
  };
  return Logout;
}
export default useLogout;
