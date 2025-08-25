const EmojiList = ({ children }: { children: React.ReactNode }) => {
  return <ul className="flex items-center gap-1 flex-nowrap">{children}</ul>;
};
export default EmojiList;
