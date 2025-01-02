import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import Account from './pages/Account/Account';
import Manage from './pages/Manage/Manage';
import Others from './pages/Others/Others';

import ManageServices from './pages/ManageServices/ManageServices';


import CreateUser from './pages/Manage/ManageUser/CreateUser'; // Correct import
import ViewBookings from './pages/Manage/ManageUser/view-bookings';
import SubmitComplaint from './pages/Manage/ManageUser/submit-complaint'
import ViewUsers from './pages/Manage/ManageUser/view-users';
import EditUser from './pages/Manage/ManageUser/Update(EditUser)';
import DeleteUser from './pages/Manage/ManageUser/delete-user'

import ManageCategories from './pages/Manage/ManageCategories';
import ManagePriests from './pages/Manage/ManagePriests';
import ManageRolesAndP from './pages/Manage/ManageRolesAndP';
import ManageSamagri from './pages/Manage/ManageSamagri';
import ManageSubAdmins from './pages/Manage/ManageSubAdmins';
import ManageUsers from './pages/Manage/ManageUsers';

import Pandit from './pages/Users/Pandit';
import Customer from './pages/Users/Customer';


import ManageBookPandit from './pages/ManageServices/ManageBookPandit'; // Import ManageBookPandit component
import ManageAnushthaan from './pages/ManageServices/ManageAnushthaan'; // Import ManageAnushthaan component
import ManageOnlinePuja from './pages/ManageServices/ManageOnlinePuja'; // Import ManageOnlinePuja component
import ManageKirtan from './pages/ManageServices/ManageKirtan'; 
import RatnaYantra from './pages/ManageServices/RatnaYantra'; 
import VastuConsultation from './pages/ManageServices/VastuConsultation'; 
import ManageKundaliM from './pages/ManageServices/ManageKundaliM'; 
import TalkToA from './pages/ManageServices/TalkToA'; 
import ManagePanchang from './pages/ManageServices/ManagePanchang'; 
import ManageHoroscope from './pages/ManageServices/ManageHoroscope'; 



import NotificationM from './pages/Others/NotificationM';
import PaymentM from './pages/Others/PaymentM';
import PromoCodeM from './pages/Others/PromoCodeM';
import RatingsAndReviewsM from './pages/Others/RatingsAndReviewsM';
import SubscriptionM from './pages/Others/SubscriptionM';
import SupportChatM from './pages/Others/SupportChatM';





import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-container">
          <SideBar />
          {/* <div className="content" style={{ marginLeft: '250px', paddingTop: '20px' }}> */}
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/Users" element={<Users />} /> 
              <Route path="/account" element={<Account />} />
              <Route path="/manage" element={<Manage />} />
              <Route path="/Others" element={<Others />} />

              <Route path="/Users/Pandit" element={<Pandit />} />
              <Route path="/Users/Customer" element={<Customer />} />
              
              <Route path="/ManageServices" element={<ManageServices />} />

              <Route path="/Manage/ManageCategories" element={<ManageCategories />} />
              <Route path="/Manage/ManagePriests" element={<ManagePriests />} />
              <Route path="/Manage/ManageRolesAndP" element={<ManageRolesAndP />} />
              <Route path="/Manage/ManageSamagri" element={<ManageSamagri />} />
              <Route path="/Manage/ManageSubAdmins" element={<ManageSubAdmins />} />
              <Route path="/Manage/ManageUsers" element={<ManageUsers />} />

              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/view-users" element={<ViewUsers />} />
              <Route path="/edit-user/:id" component={EditUser} />
              <Route path="/delete-user" element={<DeleteUser />} />
              <Route path="/view-bookings" element={<ViewBookings />} />
              <Route path="/submit-complaint" element={<SubmitComplaint />} />

              <Route path="/ManageServices/ManageBookPandit" element={<ManageBookPandit />} />
              <Route path="/ManageServices/ManageAnushthaan" element={<ManageAnushthaan />} />
              <Route path="/ManageServices/ManageOnlinePuja" element={<ManageOnlinePuja />} />
              <Route path="/ManageServices/ManageKirtan" element={<ManageKirtan />} />
              <Route path="/ManageServices/RatnaYantra" element={<RatnaYantra />} />
              <Route path="/ManageServices/VastuConsultation" element={<VastuConsultation />} />
              <Route path="/ManageServices/ManageKundaliM" element={<ManageKundaliM />} />
              <Route path="/ManageServices/TalkToA" element={<TalkToA />} />
              <Route path="/ManageServices/ManagePanchang" element={<ManagePanchang />} />
              <Route path="/ManageServices/ManageHoroscope" element={<ManageHoroscope />} />


              <Route path="/Others/NotificationM" element={<NotificationM />} />
              <Route path="/Others/PaymentM" element={<PaymentM />} />
              <Route path="/Others/PromoCodeM" element={<PromoCodeM />} />
              <Route path="/Others/RatingsAndReviewsM" element={<RatingsAndReviewsM />} />
              <Route path="/Others/SubscriptionM" element={<SubscriptionM />} />
              <Route path="/Others/SupportChatM" element={<SupportChatM />} />




            </Routes>
          {/* </div> */}
        </div>
      </div>
    </Router>
  );
}

export default App;





