import nimo from '@/assets/nimo/nimo-sm.png';

interface Props {
  nickname: string;
  createdAt: string;
}

const CardHeader = ({ createdAt, nickname }: Props) => {
  return (
    <div className="px-5 pt-3 pb-3 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-light flex items-center justify-center">
        <img src={nimo} alt="" aria-hidden />
      </div>
      <div>
        <p className="text-base text-black">{nickname}</p>
        <p className="text-xs text-gray-dark">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};
export default CardHeader;
