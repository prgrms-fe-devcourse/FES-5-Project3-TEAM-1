import Checkbox from '@/shared/components/Checkbox';
import Input from '@/shared/components/Input';
import Textarea from '@/shared/components/Textarea';

const Showcase = () => {
  return (
    <div className="flex flex-col gap-2 p-4 ">
      {/* 기본 인풋 */}
      <Input label="일반" placeholder="일반 인풋" />
      <Input label="일반" showLabel placeholder="일반 인풋" readOnly />
      {/* 비밀번호 입력 */}
      <Input.Password label="비밀번호" showLabel />
      {/* 삭제 버튼 인풀 */}
      <Input.Row label="항목" showLabel onClick={() => console.log('하이')} />
      {/* 시작 선택 인풋 */}
      <div className="flex gap-4 w-3xl">
        <Input.TimePicker label="시작 날짜" showLabel readOnly />
        <Input.TimePicker label="끝 날짜" showLabel />
      </div>

      <Textarea label="텍스트 에어리어" showLabel />
      <Checkbox label="중복 투표" showLabel />
      <Checkbox label="중복 투표" />
    </div>
  );
};
export default Showcase;
