import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../redux/search/slice";

const normalizeText = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const SearchDropdown = ({ searchTerm, products, onClose }) => {
  const dispatch = useDispatch();

  if (!searchTerm) return null;

  const filtered = products
    .filter((product) =>
      normalizeText(product.name).includes(normalizeText(searchTerm))
    )
    .slice(0, 5);

  if (filtered.length === 0) return null;

  return (
    <div className="absolute top-full mt-2 w-full bg-white text-black rounded-md shadow-lg z-50 overflow-hidden">
      {filtered.map((product) => (
        <div
          key={product.id}
          onClick={() => {
            dispatch(setSearchTerm(product.name));
            onClose();
          }}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-10 h-10 object-cover rounded"
          />

          <span className="text-sm font-medium">{product.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SearchDropdown;
