import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Signin from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./components/Library";
import Dashboard from "./components/Dashboard";
import Search from "./components/Search";
import About from "./components/About";
import Contact from "./components/Contact";
import Contribute from "./components/Contribute";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Header />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/user/library" element={<Library />}></Route>
          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/contribute" element={<Contribute />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
