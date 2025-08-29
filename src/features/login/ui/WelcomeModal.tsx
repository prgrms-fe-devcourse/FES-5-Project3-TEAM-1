import InputModal from '@/shared/components/modals/InputModal';
import NimoWelcomePng from '@/assets/nimo/nimo_welcome.png';
import { useModal } from '@/shared/utils/ModalProvider';

interface Props {
  onClose: () => void;
}

function WelcomeModal({ onClose }: Props) {
  const modal = useModal();
  return (
    <InputModal
      title={'환영합니다!'}
      content={'Anónimo의 익명방을 만들고 싶다면 아래 버튼을 이용해 주세요.'}
      onClose={onClose}
      children={
        <div className="items-center flex flex-col gap-[20px] pt-[20px]">
          <img src={NimoWelcomePng} alt="nimo_welcome" />
          <div className="items-center flex flex-col gap-[14px]"></div>
          <button
            className="bg-black text-white py-[14.5px] rounded-xl ml w-[95%]"
            onClick={() => modal.openModal('createThread', { mode: 'create' })}
          >
            방 만들기
          </button>
        </div>
      }
    />
  );
}
export default WelcomeModal;
