import "./App.css";
import Header from "./components/header";
import Products from "./components/products";
import Footer from "./components/footer";

const App = () => {
  return (
    <div className="bg-orange-300">
      <Header />
      <Products />
      <Footer />
    </div>
  );
};

export default App;
