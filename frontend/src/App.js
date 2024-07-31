
import AllTransaction from "./Components/AllTransaction/AllTransaction";
import Home from "./Components/Home/Home";
import {  Route,  Routes, Navigate } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import TransactionBar from "./Components/TransactionBar/TransactionBar";
import IncomeStats from "./Components/IncomeStats/IncomeStats";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import ExpenseStats from "./Components/ExpenseStats/ExpenseStats";
import UpdateTransaction from "./Components/UpdateTransaction/UpdateTransaction";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import AiChatComp from "./AiChatComp";


function App() {

  return (
    <>
     
        <Routes>
                {/* Public Routes */}
        <Route path="/" element={<PublicRoute element={Home} restricted={true} />} />
        <Route path="/login" element={<PublicRoute element={Login} restricted={true} />} />
        <Route path="/signup" element={<PublicRoute element={Signup} restricted={true} />} />

        <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
        <Route path="/alltransaction" element={<ProtectedRoute element={AllTransaction} />} />
        <Route path="/transactionbar" element={<ProtectedRoute element={TransactionBar} />} />
        <Route path="/incomestats" element={<ProtectedRoute element={IncomeStats} />} />
        <Route path="/expensestats" element={<ProtectedRoute element={ExpenseStats} />} />
        <Route path="/transactionbar" element={<ProtectedRoute element={TransactionBar} />} />
        <Route path="/updatetransaction/:id" element={<ProtectedRoute element={UpdateTransaction} />} />
        <Route path="/chatbot" element={<ProtectedRoute element={AiChatComp}/>  }/>
        
        <Route path="*" element={<Navigate to="/login" />} />
        </Routes>   
    </>
  );
}

export default App;
