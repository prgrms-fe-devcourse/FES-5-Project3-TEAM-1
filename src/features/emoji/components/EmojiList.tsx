const EmojiList = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className="flex items-center gap-1 flex-nowrap overflow-x-auto no-scrollbar">
      {children}
    </ul>
  );
};
export default EmojiList;
