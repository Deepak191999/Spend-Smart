import  MyNavbar  from "./Components/MyNavbar";
import AllTransaction from "./Components/AllTransaction";
import Home from "./Components/Home";
import { Route,  Routes} from "react-router-dom";
import Profile from "./Components/Profile";


function App() {
  return (
  
      <div>
        <MyNavbar />
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route  path="/profile" element={<Profile/>} />
          <Route path="/alltransaction" element={<AllTransaction/>} />
          {/* Add other routes as needed */}
        </Routes>
      </div>


       

  );
};







export default App;
