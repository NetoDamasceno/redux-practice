import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user/slice";
import { X } from "lucide-react";

function LoginModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const validateName = (name) => {
    const trimmed = name.trim().replace(/\s+/g, " ");

    if (trimmed.length < 2) {
      return "O nome deve ter pelo menos 2 caracteres.";
    }

    if (trimmed.length > 30) {
      return "O nome deve ter no máximo 30 caracteres.";
    }

    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(trimmed)) {
      return "O nome deve conter apenas letras.";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedName = name.trim().replace(/\s+/g, " ");

    if (!cleanedName || !email) {
      setError("Preencha todos os campos.");
      return;
    }

    const nameError = validateName(cleanedName);

    if (nameError) {
      setError(nameError);
      return;
    }

    setError("");

    dispatch(login({ name: cleanedName, email }));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-80 p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* INPUT NOME */}
          <input
            type="text"
            placeholder="Nome"
            maxLength={30}
            className="border border-gray-300 bg-white text-gray-800 placeholder-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={name}
            onChange={(e) => {
              const value = e.target.value;

              const sanitized = value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");

              setName(sanitized);
              setError("");
            }}
          />

          {/* INPUT EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 bg-white text-gray-800 placeholder-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          {/* 🔴 ERRO (EXATAMENTE AQUI) */}
          {error && (
            <span className="text-red-500 text-sm -mt-2">
              {error}
            </span>
          )}

          {/* BOTÃO */}
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition font-medium"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
