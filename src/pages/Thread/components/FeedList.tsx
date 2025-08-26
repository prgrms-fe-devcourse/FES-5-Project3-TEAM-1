const FeedList = ({ children }: { children: React.ReactNode }) => {
  return <ul className="flex flex-col gap-6 pt-6">{children}</ul>;
};
export default FeedList;
