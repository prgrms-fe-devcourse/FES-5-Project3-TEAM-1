const EmptyFeed = () => {
  return (
    <div className="flex-center relative">
      <div className="flex flex-col gap-5 absolute left-1/2 top-1/2 -translate-1/2">
        <img
          width="300"
          height="300"
          src="https://mehfhzgjbfywylancalx.supabase.co/storage/v1/object/public/assets/ano_search.png"
          loading="lazy"
        />
        <p className="text-xl text-center text-gray">
          아직 등록한 피드가 없어요..
        </p>
      </div>
    </div>
  );
};
export default EmptyFeed;
