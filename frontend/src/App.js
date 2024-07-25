import MyNavbar from "./Components/MyNavbar/MyNavbar";
import AllTransaction from "./Components/AllTransaction/AllTransaction";
import Home from "./Components/Home";
import { Route, Routes } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import TransactionBar from "./Components/TransactionBar/TransactionBar";
import IncomeStats from "./Components/IncomeStats/IncomeStats";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";

function App() {

  return (
    <>
      <MyNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/alltransaction" element={<AllTransaction />} />
        <Route path="/transactionbar" element={<TransactionBar />} />
        <Route path="/incomestats" element={<IncomeStats />} />
        <Route path="/transactionbar" element={<TransactionBar />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default App;
