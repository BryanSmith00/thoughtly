import { Route, Routes } from "react-router-dom";
import { Login, Signup, AuthHome, Home } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
