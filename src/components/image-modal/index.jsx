import { useDispatch, useSelector } from "react-redux";
import { closeImage } from "../../redux/image-preview/slice";

const ImageModal = () => {
  const dispatch = useDispatch();
  const { isOpen, imageUrl } = useSelector(
    (state) => state.imagePreview
  );

  if (!isOpen) return null;

  return (
    <div
      onClick={() => dispatch(closeImage())}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative"
      >
        {/* Botão fechar */}
        <button
          onClick={() => dispatch(closeImage())}
          className="absolute top-2 right-2 text-white text-2xl"
        >
          ✕
        </button>

        {/* Imagem */}
        <img
          src={imageUrl}
          alt="preview"
          className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;
