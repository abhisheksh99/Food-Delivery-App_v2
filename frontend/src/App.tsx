import Login from "./auth/Login";
import {  Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";

function App() {
  return (
    <>

    <Routes>
      <Route path="/" element={<MainLayout/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
    </Routes>

    </>
  );
}

export default App;
