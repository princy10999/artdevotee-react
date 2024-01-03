import Navbar from "./Componets/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import { ProtectedRoutes,LoginRoutes, MaintenanceRoutes } from "./Routes/ProtectedRoutes";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Footer from "./Componets/Footer/Footer";
import Sign_Up from "./Pages/Sign_Up/Sign_Up";
import Login from "./Pages/Login/Login";
import Forgot_Password from "./Pages/Forgot_Password/Forgot_Password";
import Otp from "./Pages/Otp/Otp";
import Faq from "./Pages/Faq/Faq";
import How_It_Works from "./Pages/How_It_Works/How_It_Works";
import Contact_Us from "./Pages/Conatct/Contact_Us";
import About_Us from "./Pages/About_Us/About_Us";
import Search_Product from "./Pages/Search_Product/Search_Product";
import Product_Details from "./Pages/Product_Details/Product_Details";
import Edit_Profile from "./Pages/Profile/Edit_Profile";
import Dashboard from "./Pages/Profile/Dashboard";
import Change_Password from "./Pages/Profile/Change_Password";
import My_Wishlist from "./Pages/Profile/My_Wishlist";
import My_Order from "./Pages/Profile/My_Order";
import Gift_Card from "./Pages/Profile/Gift_Card";
import Puachase_Gift_Card from "./Pages/Profile/Puachase_Gift_Card";
import Shopping_Cart from "./Pages/Shopping_Cart/Shopping_Cart";
import Checkout from "./Pages/Checkout/Checkout";
import Order_Details from "./Pages/Order_Details/Order_Details";
import Terms_Condition from "./Pages/Terms_Condition/Terms_Condition";
import Privacy_Policy from "./Pages/Privacy_Policy/Privacy_Policy";
import Enquiry from "./Pages/Enquiry/Enquiry";
import Verify from "./Pages/Verify/Verify";
import { store } from "./store";
import { Provider } from "react-redux";
import EmailVerification from "./Pages/EmailVerification/EmailVerification";
import Update_Password from "./Pages/Forgot_Password/Update_Password";
import Gift_Details from "./Pages/Profile/Gift_Details";
import "react-datepicker/dist/react-datepicker.css";
import New_Email_Change from "./Componets/Email_change/New_Email_Change";
import Old_Email_Change from "./Componets/Email_change/Old_Email_Change";
import Gift_Card_Checkout from "./Pages/Profile/Card_Checkout";
import No_Found from "./Pages/404/404";
import Gift_Card_Cart from "./Pages/Profile/Gift_Card_Cart";
import Order_Complaint from "./Pages/Order_Details/Order_Complaint";
import Payment from "./Pages/Payment/Payment";
import PaymentStatus from "./Pages/Payment/PaymentStatus";
import Maintenance from "./Componets/maintenance/Maintenance";

function App() {
  // {window.location.pathname === "/preview/dev/maintenance" && window.location.reload()}
  // console.log("window.location.pathname ",window.location.pathname );
  return (
    <Provider store={store}>
      <BrowserRouter basename={"/preview/dev/"}>
       {window.location.pathname !== "/preview/dev/maintenance" && <Navbar />}
        <Routes>
          <Route element={<MaintenanceRoutes />}>
          <Route path="/" element={<Home />} exact />
          <Route element={<LoginRoutes />}>
            <Route path="/sign-up" element={<Sign_Up />} exact />
          <Route path="/login" element={<Login />} exact />
          </Route>
          
          <Route path="/forgot-password" element={<Forgot_Password />} exact />
          <Route path="/update-password" element={<Update_Password />} exact />
          <Route path="/otp" element={<Otp />} exact />
          <Route path="/faq" element={<Faq />} exact />
          <Route path="/how-it-works" element={<How_It_Works />} exact />
          <Route path="/contact-us" element={<Contact_Us />} exact />
          <Route path="/about-us" element={<About_Us />} exact />
          <Route path="/search-product" element={<Search_Product />} exact />
          <Route
            path="/product-detail/:id"
            element={<Product_Details />}
            exact
          />
          <Route path="/enquiry/:id" element={<Enquiry />} exact />
          <Route path="/terms-condition" element={<Terms_Condition />} exact />
          <Route path="/privacy-policy" element={<Privacy_Policy />} exact />
          <Route path="/verify" element={<Verify />} exact />
          <Route
            path="/email-verification/:v_code"
            element={<EmailVerification />}
            exact
          />
          <Route
            path="/new-email-verification/:v_code"
            element={<New_Email_Change />}
            exact
          />
          <Route
            path="/old-email-verification/:v_code"
            element={<Old_Email_Change />}
            exact
          />
          <Route element={<ProtectedRoutes />}>
            <Route path="/edit-profile" element={<Edit_Profile />} exact />
            <Route path="/my-wishlist" element={<My_Wishlist />} exact />
            <Route path="/order-details" element={<Order_Details />} exact />
            <Route
              path="/order-complaint"
              element={<Order_Complaint />}
              exact
            />
            <Route path="/dashboard" element={<Dashboard />} exact />
            <Route
              path="/change-password"
              element={<Change_Password />}
              exact
            />
            <Route path="/my-order" element={<My_Order />} exact />
            <Route path="/gift-card" element={<Gift_Card />} exact />
            <Route path="/gift-details/:id" element={<Gift_Details />} exact />
            <Route
              path="/purchase-gift-card"
              element={<Puachase_Gift_Card />}
              exact
            />
            <Route
              path="/checkout-gift-card"
              element={<Gift_Card_Checkout />}
              exact
            />
            <Route path="/shopping-cart" element={<Shopping_Cart />} exact />
            <Route path="/checkout" element={<Checkout />} exact />
            <Route path="/gift-card-cart" element={<Gift_Card_Cart />} exact />
            <Route path="/payment/:id/:type" element={<Payment/>} exact />
            <Route path="/payment-status/:stat/:type" element={<PaymentStatus/>} exact />
          </Route>
          <Route path="*" element={<No_Found />} exact />
          </Route>
            <Route path="/maintenance" element={<Maintenance />} exact />
        </Routes>
        {window.location.pathname !== "/preview/dev/maintenance" && <Footer />}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
