import "./home.scss";
import Navbar from "./Navbars/Navbar";
import Carousel from "./Carousels/Carousel";
import Footer from "./Footers/Footer";
import { Outlet } from "react-router-dom";
import ProductList from "../products/ProductList";

export default function Home() {
  return (
    <div className="home_page">
      <div className="home_page_content">
        <Navbar />
        <Carousel />
        <div className="content_body">
          <Outlet />
          <ProductList />
        </div>
        <Footer />
      </div>
    </div>
  );
}
