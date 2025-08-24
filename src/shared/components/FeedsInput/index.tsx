import { useRef } from 'react';

function FeedsInput() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = '48px';
    target.style.height = target.scrollHeight + 'px';
  };

  return (
    <div className="flex p-5 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.20)]">
      <div className="flex flex-col relative w-full">
        <textarea
          ref={textareaRef}
          onInput={handleTextarea}
          rows={1}
          name=""
          id=""
          maxLength={200}
          placeholder="익명으로 자유롭게 의견을 나눠보세요."
          className="pr-7 py-3 w-full min-h-12 resize-none overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        ></textarea>
        <span className="block absolute right-0 bottom-0 ml-auto">200</span>
      </div>
      <div></div>
    </div>
  );
}
export default FeedsInput;
