import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./component/Navbar.component";
import HomePage from "./page/Home.page";
import LoginPage from "./page/Login.page";
import RegisterPage from "./page/Register.page";
import GoogleLoginButton from "./component/Button.LoginGoogle";

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
    // <>
    //   <NavbarComponent />
    //   <GoogleLoginButton />
    // </>
  );
}

export default App;
