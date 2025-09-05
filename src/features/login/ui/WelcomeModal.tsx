import InputModal from '@/shared/components/modals/InputModal';
import NimoWelcomePng from '@/assets/nimo/nimo_welcome.png';
import { useModal } from '@/shared/utils/ModalProvider';
import { useNavigate } from 'react-router';

interface Props {
  onClose: () => void;
}

function WelcomeModal({ onClose }: Props) {
  const modal = useModal();
  const navigate = useNavigate();

  return (
    <InputModal
      title={'환영합니다!'}
      content={
        <p>
          Anónimo의 익명 스레드를 만들고 싶다면
          <br />
          아래 버튼을 이용해 주세요.
        </p>
      }
      onClose={onClose}
      children={
        <div className="items-center flex flex-col gap-[20px] pt-[20px]">
          <img src={NimoWelcomePng} alt="nimo_welcome" />
          <div className="items-center flex flex-col gap-[14px]"></div>
          <button
            className="bg-black text-white py-[14.5px] rounded-xl ml w-[95%]"
            onClick={() =>
              modal.openModal('createThread', {
                mode: 'create',
                navigateToAdmin: () => navigate('/admin'),
              })
            }
          >
            스레드 만들기
          </button>
        </div>
      }
    />
  );
}
export default WelcomeModal;
