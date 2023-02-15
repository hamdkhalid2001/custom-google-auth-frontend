
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignUp from './pages/Signup/Index';
import Dashboard from './pages/Dashboard/Index'
import Login from './pages/Login/Index';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        ></Route> */}
        <Route exact path="/" element={<SignUp />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
        {/* <Route exact path="/login" element={<Login />}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
