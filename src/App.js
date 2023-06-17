import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import { Home, Contact, Login, Register, Reset } from './pages/index'
// Components
import { Header, Footer } from './components/index'
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/reset" element={<Reset />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
