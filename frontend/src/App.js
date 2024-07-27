
import AllTransaction from "./Components/AllTransaction/AllTransaction";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Route,  Routes } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import TransactionBar from "./Components/TransactionBar/TransactionBar";
import IncomeStats from "./Components/IncomeStats/IncomeStats";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import ExpenseStats from "./Components/ExpenseStats/ExpenseStats";
import UpdateTransaction from "./Components/UpdateTransaction/UpdateTransaction";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {

  return (
    <>
  
      {/* <Router> */}
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
        {/* <Route path="/alltransaction" element={<AllTransaction />} /> */}
    
        <Route path="/alltransaction" element={<ProtectedRoute element={AllTransaction} />} />
        <Route path="/transactionbar" element={<ProtectedRoute element={TransactionBar} />} />
        <Route path="/incomestats" element={<ProtectedRoute element={IncomeStats} />} />
        <Route path="/expensestats" element={<ProtectedRoute element={ExpenseStats} />} />
        <Route path="/transactionbar" element={<ProtectedRoute element={TransactionBar} />} />
        <Route path="/updatetransaction/:id" element={<ProtectedRoute element={UpdateTransaction} />} />
        
        </Routes>
      {/* </Router> */}
    </>
  );
}

export default App;
