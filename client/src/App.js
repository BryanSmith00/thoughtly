import { Route, Routes } from "react-router-dom";
import { Login, Signup, Home, Profile, Error } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/:handle" element={<Profile />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
