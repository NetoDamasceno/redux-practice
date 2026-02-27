import "./App.css";
import Header from "./components/header";
import Products from "./components/products";

const App = () => {
  return (
    <div className="bg-orange-300">
      <Header />
      <Products />
    </div>
  );
};

export default App;
