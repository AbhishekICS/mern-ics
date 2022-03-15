import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Subject } from "./pages/Subject";
import { UserDetails } from "./pages/UserDetails";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path='/user/:id' element={<UserDetails />}/>
              <Route path="/subject" element={<Subject />} />
            </Route>
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
