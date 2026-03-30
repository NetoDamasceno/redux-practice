import "./App.css";
import Header from "./components/header";
import Products from "./components/products";
import Footer from "./components/footer";
import ImageModal from "./components/image-modal";

const App = () => {
  return (
    <div className="bg-orange-300">
      <Header />
      <Products />
      <Footer />
      <ImageModal />
    </div>
  );
};

export default App;
