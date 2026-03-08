function SkeletonCard() {
  return (
    <div className="animate-pulse flex flex-col">
      <div className="bg-gray-300 h-[380px] w-full rounded-lg"></div>

      <div className="flex justify-between mt-3">
        <div className="bg-gray-300 h-4 w-24 rounded"></div>
        <div className="bg-gray-300 h-4 w-12 rounded"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
