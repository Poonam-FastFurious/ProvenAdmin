import "./App.css";

import "../src/assets/images/favicon.ico";
import "../src/assets/css/bootstrap.min.css";
import "../src/assets/css/icons.min.css";
import "../src/assets/css/app.min.css";
import "../src/assets/css/custom.min.css";
import Home from "./Componnets/Home";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./Componnets/Authentication/Login";
import Listproduct from "./Componnets/Product/Listproduct";
import Header from "./Componnets/Header";
import AddProduct from "./Componnets/Product/AddProduct";
import StockOut from "./Componnets/Product/StockOut";
import Category from "./Componnets/Category/Category";
import OrderList from "./Componnets/Order/OrderList";
import Transaction from "./Componnets/Transaction/Transaction";
import OrderDetail from "./Componnets/Order/OrderDetail";
import Customer from "./Componnets/Customer/Customer";
import Banner from "./Componnets/GenralSetting/Banners/Banner";
import Tax from "./Componnets/GenralSetting/Tax";
import Team from "./Componnets/Team/Team";
import Profile from "./Componnets/SiteSetting/Profile";
import Coupon from "./Componnets/GenralSetting/Coupon";
import Shipping from "./Componnets/GenralSetting/ShipingCharg";
import SubCategory from "./Componnets/Category/SubCategory";
import Addon from "./Componnets/Category/Addon";
import Section2 from "./Componnets/GenralSetting/Banners/Section2";
import Section3 from "./Componnets/GenralSetting/Banners/Section3";
import Section4 from "./Componnets/GenralSetting/Banners/Section4";
import Sliderlist from "./Componnets/GenralSetting/Slider/Sliderlist";
import Addslider from "./Componnets/GenralSetting/Slider/AddSlider";
import Notification from "./Componnets/GenralSetting/Notification";
import Faq from "./Componnets/GenralSetting/Faq";
import PrivacyPolicy from "./Componnets/GenralSetting/Privacypolicy";
import Termsandcondition from "./Componnets/GenralSetting/Termandcondition";
import ReturnPolicy from "./Componnets/GenralSetting/ReturnPolicy";
import ListBlog from "./Componnets/GenralSetting/Blogs/ListBlog";
import Addblogs from "./Componnets/GenralSetting/Blogs/Addblogs";
import Inquiry from "./Componnets/GenralSetting/Inquiry";
import ProductDetail from "./Componnets/Product/ProductDetail";
import Employeerol from "./Componnets/EmployeeManagement/Employeerol";
import Testimonial from "./Componnets/GenralSetting/Testimonial";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/Admin/login" element={<Login />} />
          </Route>
          <Route
            element={
              <>
                <Header /> <Outlet />
              </>
            }
          >
            <Route path="/" element={<Home />}></Route>
            <Route path="/Product" element={<Listproduct />}></Route>
            <Route path="/Product/:id" element={<ProductDetail />} />
            <Route path="/AddProduct" element={<AddProduct />}></Route>
            <Route path="/Stockout" element={<StockOut />}></Route>
            <Route path="/Categories" element={<Category />}></Route>
            <Route path="/SubCategory" element={<SubCategory />}></Route>
            <Route path="/AddOns" element={<Addon />}></Route>
            <Route path="/Order" element={<OrderList />}></Route>
            <Route path="/orderdetail" element={<OrderDetail />}></Route>
            <Route path="/transaction" element={<Transaction />}></Route>
            <Route path="/customer" element={<Customer />}></Route>
            <Route path="/banner" element={<Banner />}></Route>
            <Route path="/Slider" element={<Sliderlist />}></Route>
            <Route path="/addslider" element={<Addslider />}></Route>
            <Route path="/bannersection2" element={<Section2 />}></Route>
            <Route path="/bannersection3" element={<Section3 />}></Route>
            <Route path="/bannersection4" element={<Section4 />}></Route>
            <Route path="/Tax" element={<Tax />}></Route>
            <Route path="/team" element={<Team />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
            <Route path="/Coupon" element={<Coupon />}></Route>
            <Route path="/Notification" element={<Notification />}></Route>
            <Route path="/pages-faqs" element={<Faq />}></Route>
            <Route path="/ReturnPolicy" element={<ReturnPolicy />}></Route>
            <Route path="/Bloges" element={<ListBlog />}></Route>
            <Route path="/Addblogs" element={<Addblogs />}></Route>
            <Route path="/InquiryList" element={<Inquiry />}></Route>
            <Route path="/Empolyerole" element={<Employeerol />}></Route>
            <Route path="/Testimonial" element={<Testimonial />}></Route>
            <Route
              path="/pages-term-conditions"
              element={<Termsandcondition />}
            ></Route>
            <Route
              path="/pages-privacy-policy"
              element={<PrivacyPolicy />}
            ></Route>
            <Route path="/Shipping" element={<Shipping />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
