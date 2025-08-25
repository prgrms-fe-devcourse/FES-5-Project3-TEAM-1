const EmojiList = ({ children }: { children: React.ReactNode }) => {
  return <ul className="flex items-center gap-1 flex-wrap">{children}</ul>;
};
export default EmojiList;
