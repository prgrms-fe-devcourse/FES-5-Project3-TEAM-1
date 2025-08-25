const EmojiList = ({ children }: { children: React.ReactNode }) => {
  return <ul className="flex items-center gap-2 flex-wrap">{children}</ul>;
};
export default EmojiList;
