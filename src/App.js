import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavigationBar from "./components/NavigationBar"
import Register from "./components/Register"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Summaries from "./components/SummaryOverview"
import AddSummary from "./components/AddSummary"
function App() {

    return (
        <Router>
            <Routes>
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/" element={<Login />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/summaries" element={<Summaries />} />
                <Route exact path="/addSummary" element={<AddSummary />} />
            </Routes>
                </Router>
  );
}

export default App;
