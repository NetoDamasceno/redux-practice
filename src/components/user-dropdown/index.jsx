import { useState, useRef, useEffect } from "react";
import LogoutModal from "../logout-modal";

function UserDropdown({ currentUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const dropdownRef = useRef(null);

  // fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Nome do usuário */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer font-medium text-white transition-all duration-200 hover:text-orange-500 hover:scale-105"
      >
        {currentUser.name}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-2 text-gray-700 animate-fadeIn">
          <button
            onClick={() => {
              setIsOpen(false);
              setIsLogoutOpen(true);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
          >
            Sair da conta
          </button>
        </div>
      )}

      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />
    </div>
  );
}

export default UserDropdown;
