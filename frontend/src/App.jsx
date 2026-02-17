import { Routes, Route } from "react-router-dom";
import Home from "./public/Home";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Dashboard from "./componets/Dashboard";
import Profile from "./componets/Profile";
import Crud from "./componets/Crud";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/profile" element={<Profile />} />
         <Route path="/crud" element={<Crud />} />
    </Routes>
  );
}

export default App;
