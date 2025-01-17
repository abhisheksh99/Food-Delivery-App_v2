import Login from "./auth/Login";
import {  Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Signup from "./auth/Signup";

function App() {
  return (
    <>

    <Routes>
      <Route path="/" element={<MainLayout/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>

    </>
  );
}

export default App;
