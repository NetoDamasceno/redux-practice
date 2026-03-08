import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/slice";

function LogoutModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleConfirm = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-80 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Deseja realmente sair?
        </h2>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-400 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
