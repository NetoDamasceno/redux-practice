import "./App.css";
import Header from "./components/header";
import Products from "./components/products";
import Footer from "./components/footer";
import ImageModal from "./components/image-modal";

const App = () => {
  return (
    <div className="bg-orange-100 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Products />
      </div>
      <Footer />
      <ImageModal />
    </div>
  );
};

export default App;
