function SkeletonCard() {
  return (
    <div className="animate-pulse flex flex-col">
      {/* IMAGEM */}
      <div className="bg-gray-300 h-[380px] w-full rounded-lg"></div>

      {/* TEXTO */}
      <div className="flex flex-col mt-3 gap-2">
        {/* Nome */}
        <div className="bg-gray-300 h-4 w-32 rounded"></div>

        {/* Preço */}
        <div className="bg-gray-300 h-4 w-20 rounded"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
