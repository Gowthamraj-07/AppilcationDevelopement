

import './App.css'
import Homepage from './components/Homepage'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menupage from './components/Menupage';
import Userpage from './components/Userpage';
import Addhotelpage from './components/addhotelpage';
import Cartpage from './components/Cartpage';
import AddMenuItem from './components/Addhotel/addmenuitem';
import Addmenuitempage from './components/addmenuitempage';
import GroupCreation from './components/GroupOrdering/GroupCreation';

import AddMembers from './components/GroupOrdering/AddMembers';
import GroupDetails from './components/GroupOrdering/Chatbox';
import DinningHotels from './components/Home/dinningHotel';
import TableBooking from './components/Dinning/tablebook';
import Dinningpage from './components/dinningpage';
import Searchpage from './components/searchpage';
import GroupCreationComponent from './components/Group/create';
import GroupChatComponent from './components/Group/chat';
import GroupPage from './components/groupPage';
import Checkoutpage from './components/checkoutpage';
import DinningCheckout from './components/Dinning/diningCheckout';
import DinningCheckoutpage from './components/dinningCheckoutpage';
import { ToastContainer } from 'react-toastify';
import Diets from './components/Home/diet';
import Dietmenupage from './components/dietmenupage';
import Navbartop from './components/Home/navbar';
import Footer from './components/Home/footer';
import Adminhomepage from './components/adminhomepage';
function App() {
  return (
    <div className="App">
     
      <Router>
        <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/menu" element={<Menupage/>}/>
        <Route path="/user" element={<Userpage/>}/>
        <Route path="/cart" element={<Cartpage/>}/>
        <Route path="/addhotel" element={<Addhotelpage/>}/>
        <Route path="/addmenu" element={<Addmenuitempage/>}/>
        <Route path="/booktable" element={<Dinningpage/>}/>
        <Route path="/resultpage" element={<Searchpage/>}/>
        <Route path="/diet" element={<Diets/>}/>

        <Route path="/chatbox" element={<GroupPage/>}/>
        <Route path="/checkout" element={<Checkoutpage/>}/>
        <Route path="/dinningcheckout" element={<DinningCheckoutpage/>}/>
        <Route path="/diet-details" element={<Dietmenupage/>}/>
        <Route path="/admin" element={<Adminhomepage/>}/>
        
        </Routes>
      </Router>
     
      <ToastContainer />

    </div>
  );
}

export default App;
