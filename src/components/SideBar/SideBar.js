import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

function SideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isManageServicesOpen, setIsManageServicesOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isOthersOpen, setIsOthersOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleUsersDropdown = () => setIsUsersOpen(!isUsersOpen);
  const toggleManageServicesDropdown = () => setIsManageServicesOpen(!isManageServicesOpen);
  const toggleManageDropdown = () => setIsManageOpen(!isManageOpen);
  const toggleOthersDropdown = () => setIsOthersOpen(!isOthersOpen);

  return (
    <div className={`text-black h-screen ${isOpen ? 'w-64' : 'w-16'} transition-width duration-300`}>
      <div className="flex items-center justify-between p-4">
        <button onClick={toggleSidebar} className="text-xl text-black">
          <FaBars />
        </button>
      </div>

      <nav className="flex flex-col space-y-6 py-4 overflow-y-auto h-full">
        <Link
          to="/"
          className={`flex items-center p-3 hover:bg-teal-500 transition rounded-3xl ${isOpen ? 'justify-start' : 'justify-center'}`}
        >
          {isOpen && <span>Dashboard</span>}
        </Link>

        {/* Users Dropdown */}
        <div>
          <button
            onClick={toggleUsersDropdown}
            className={`flex items-center p-3 hover:bg-teal-500 transition rounded-3xl ${isOpen ? 'justify-start' : 'justify-center'}`}
          >
            {isOpen ? 'Users' : ''}
          </button>
          {isUsersOpen && (
            <div className="bg-white mt-2 space-y-4 w-full z-10 pl-6">
              <Link to="/Users/pandit" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Pandit
              </Link>
            </div>
          )}
        </div>

        {/* Manage Services Dropdown */}
        <div>
          <button
            onClick={toggleManageServicesDropdown}
            className={`flex items-center p-3 hover:bg-teal-500 transition rounded-3xl ${isOpen ? 'justify-start' : 'justify-center'}`}
          >
            {isOpen ? 'Manage Services' : ''}
          </button>
          {isManageServicesOpen && (
            <div className="bg-white mt-2 space-y-4 w-full z-10 pl-6">
              <Link to="/ManageServices/ManageBookPandit" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Manage Book Pandit
              </Link>
              <Link to="/ManageServices/ManageAnushthaan" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Manage Anushthaan
              </Link>
              <Link to="/ManageServices/ManageOnlinePuja" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Manage Online Puja
              </Link>
              <Link to="/ManageServices/ManageKirtan" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Manage Kirtan
              </Link>
              <Link to="/ManageServices/RatnaYantra" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Ratna Yantra
              </Link>
              <Link to="/ManageServices/VastuConsultation" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Vastu Consultation
              </Link>
              <Link to="/ManageServices/ManageKundaliM" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Kundali Matching Management
              </Link>
              <Link to="/ManageServices/TalkToA" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Talk to Astrologer
              </Link>
              <Link to="/ManageServices/ManagePanchang" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Manage Panchang
              </Link>
              <Link to="/ManageServices/ManageHoroscope" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Manage Horoscope
              </Link>
            </div>
          )}
        </div>

        {/* Manage Dropdown */}
        <div>
          <button
            onClick={toggleManageDropdown}
            className={`flex items-center p-3 hover:bg-teal-500 transition rounded-3xl ${isOpen ? 'justify-start' : 'justify-center'}`}
          >
            {isOpen ? 'Manage' : ''}
          </button>
          {isManageOpen && (
            <div className="bg-white mt-2 space-y-4 w-full z-10 pl-6">
              <Link to="/Manage/ManagePriests" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Manage Priest
              </Link>
              <Link to="/Manage/ManageRolesAndP" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Manage Roles and Permissions
              </Link>
              <Link to="/Manage/ManageSamagri" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Manage Samagri
              </Link>
              <Link to="/Manage/ManageSubAdmins" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Manage SubAdmins
              </Link>
              <Link to="/Manage/ManageUsers" className="block px-4 py-3 hover:bg-teal-500 rounded-3xl">
                Manage Users
              </Link>
              <Link to="/Manage/ManageCategories" className="block px-4 py-3 hover:bg-teal-600 rounded-3xl">
                Manage Categories
              </Link>
            </div>
          )}
        </div>

        {/* Other Links */}
        <div>
          <button
            onClick={toggleOthersDropdown}
            className={`flex items-center p-3 hover:bg-teal-500 transition rounded-3xl ${isOpen ? 'justify-start' : 'justify-center'}`}
          >
            {isOpen ? 'Others' : ''}
          </button>
          {isOthersOpen && (
            <div className="bg-white-500 mt-2 space-y-4 w-full z-10 pl-6">
              <Link to="/Others/NotificationM" className="block px-4 py-3 hover:bg-teal-600 rounded-3xl">
                Notification Management
              </Link>
              <Link to="/Others/PaymentM" className="block px-4 py-3 hover:bg-teal-600 rounded-3xl">
                Payment Management
              </Link>
              <Link to="/Others/PromoCodeM" className="block px-4 py-3 hover:bg-teal-600 rounded-3xl">
                Manage Promo Code
              </Link>
              <Link to="/Others/SubscriptionM" className="block px-4 py-3 hover:bg-teal-600 rounded-3xl">
                Subscription Management
              </Link>
              <Link to="/Others/SupportChatM" className="block px-4 py-3 hover:bg-teal-600 rounded-3xl">
                Manage Support Chat
              </Link>
              <Link to="/Others/RatingsAndReviewsM" className="block px-4 py-3 hover:bg-teal-600 rounded-3xl">
                Manage Ratings And Reviews
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/account"
          className={`flex items-center p-3 hover:bg-teal-500 transition rounded-3xl ${isOpen ? 'justify-start' : 'justify-center'}`}
        >
          {isOpen && <span>Account</span>}
        </Link>
      </nav>
    </div>
  );
}

export default SideBar;
