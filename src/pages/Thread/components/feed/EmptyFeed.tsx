const EmptyFeed = () => {
  return (
    <div className="flex-col flex-center gap-4 py-8 lg:py-20">
      <img
        width="120"
        height="120"
        src="https://mehfhzgjbfywylancalx.supabase.co/storage/v1/object/public/assets/ano_search.png"
        loading="lazy"
        className="lg:w-40 lg:h-40"
      />
      <p className="text-base lg:text-lg text-center text-gray-dark">
        아직 등록한 피드가 없어요..
      </p>
    </div>
  );
};
export default EmptyFeed;
