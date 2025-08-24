import Button from '@/shared/components/Button';
import Checkbox from '@/shared/components/Checkbox';
import FeedsInput from '@/shared/components/FeedsInput';
import Input from '@/shared/components/Input';
import Textarea from '@/shared/components/Textarea';
import { useRef, useState } from 'react';

const Showcase = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col gap-2 p-4 ">
      {/* controlled Components */}
      {/* 기본 인풋 */}
      <Input
        label="일반"
        placeholder="일반 인풋"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
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

      {/* 버튼 */}
      {/*size = sm */}
      <Button size="sm" color="default">
        안녕하세요
      </Button>
      <Button size="sm" color="blue">
        버튼
      </Button>
      <Button size="sm" disabled>
        버튼
      </Button>
      <Button size="sm" color="default" fullWidth>
        안녕하세요
      </Button>
      {/*size=default */}
      <Button size="default" color="default">
        버튼
      </Button>
      <Button size="default" color="blue">
        버튼
      </Button>
      <Button size="default" disabled>
        버튼
      </Button>
      <Button size="default" color="default" fullWidth>
        버튼
      </Button>

      {/* uncontrolled Components */}
      <Input.Row
        label="uncontrolled"
        ref={inputRef}
        onClick={() => alert(inputRef.current?.value)}
      />
      <FeedsInput></FeedsInput>
    </div>
  );
};
export default Showcase;
