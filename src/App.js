import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavigationBar from "./components/NavigationBar"
import Register from "./components/Register"
import Login from "./components/Login"
import Profile from "./components/Profile"
function App() {

    return (
        <Router>
            <Routes>
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/" element={<Login />} />
                <Route exact path="/profile" element={<Profile />}/>
            </Routes>
                </Router>
  );
}

export default App;
