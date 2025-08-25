import useLogout from '../hooks/Logout';

function LogoutButton() {
  const handleLogOut = useLogout();
  return (
    <button
      className="px-[46px] py-[14.5px] border border-black rounded-3xl w-2xs"
      onClick={handleLogOut}
    >
      Logout
    </button>
  );
}
export default LogoutButton;
