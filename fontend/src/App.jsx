import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Signin from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./library";
import adminLogin from "./components/adminLogin";
import adminSignup from "./components/adminSignup";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Header />}></Route>
          <Route path="/user/signin" element={<Signin />}></Route>
          <Route path="/admin/signin" element={<adminLogin  />}></Route>
          <Route path="/admin/signup" element={<adminSignup />}></Route>
          <Route path="/user/signup" element={<Signup />}></Route>
          <Route path="/library" element={<Library />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
