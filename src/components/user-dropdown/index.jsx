import { useState, useRef, useEffect } from "react";
import LogoutModal from "../logout-modal";

import { getAvatarColor, getInitial } from "../../utils/avatarColor";

function UserDropdown({ currentUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const dropdownRef = useRef(null);

  const avatarColor = getAvatarColor(currentUser.name);
  const initial = getInitial(currentUser.name);

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
    <div ref={dropdownRef} className="relative flex items-center gap-2">
      
      {/* Avatar + Nome */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 cursor-pointer group transition-all duration-200 hover:scale-105"
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold text-xs transition-transform duration-200 group-hover:scale-110"
          style={{ backgroundColor: avatarColor }}
        >
          {initial}
        </div>

        <span className="font-medium text-white transition-colors duration-200 group-hover:text-orange-500">
          {currentUser.name}
        </span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-12 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-2 text-gray-700 animate-fadeIn">
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
