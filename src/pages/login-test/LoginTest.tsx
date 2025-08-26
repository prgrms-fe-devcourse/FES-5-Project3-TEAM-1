import { useModal } from '@/shared/utils/ModalProvider';

function LoginTest() {
  const modal = useModal();

  return (
    <>
      <button onClick={() => modal.openModal('login')}>open login</button>;
      <button onClick={() => modal.openModal('welcome')}>open welcome</button>;
    </>
  );
}
export default LoginTest;
