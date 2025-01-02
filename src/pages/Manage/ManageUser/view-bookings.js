import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

const BookingHistory = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3; // Number of bookings to display per page

  useEffect(() => {
    // Mock booking data
    const mockBookings = [
      { id: 'B12345', date: '2024-12-01', status: 'Confirmed', items: ['Item A', 'Item B'] },
      { id: 'B12346', date: '2024-12-02', status: 'Pending', items: ['Item C', 'Item D'] },
      { id: 'B12347', date: '2024-12-03', status: 'Cancelled', items: ['Item E', 'Item F'] },
      { id: 'B12348', date: '2024-12-04', status: 'Confirmed', items: ['Item G', 'Item H'] },
      { id: 'B12349', date: '2024-12-05', status: 'Pending', items: ['Item I', 'Item J'] },
      { id: 'B12350', date: '2024-12-06', status: 'Confirmed', items: ['Item K', 'Item L'] },
    ];

    // Simulate API data retrieval
    setBookings(mockBookings);
  }, [userId]);

  // Paginate bookings
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(bookings.length / bookingsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="booking-history-container" style={{ backgroundColor: '#f9f9f9', padding: '40px' }}>
      <Container>
        <h2 className="text-teal-600 text-3xl font-semibold mb-6">Booking History</h2>

        {/* Invisible Table with Padding and Spacing */}
        <div className="table-responsive" style={{ borderSpacing: '10px', borderCollapse: 'separate' }}>
          {currentBookings.map((booking) => (
            <div key={booking.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 2fr',
              padding: '10px',
              borderBottom: '1px solid #ccc',
              backgroundColor: '#fff',
              borderRadius: '8px',
              marginBottom: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'background-color 0.3s',
            }}>
              <span>{booking.id}</span>
              <span>{booking.date}</span>
              <span>{booking.status}</span>
              <span>{booking.items.join(', ')}</span>
            </div>
          ))}
        </div>

        {/* Pagination buttons with smaller gap */}
        <div className="d-flex justify-content-center gap-y-4 mt-4">
          <Link to="/Manage/ManageUsers">
            <button
              type="button"
              className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-5 rounded-lg shadow-md transition-all"
              onClick={handlePrevious}
            >
              Previous
            </button>
          </Link>

          <button
            type="button"
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-5 rounded-lg shadow-md transition-all"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </Container>
    </div>
  );
};

export default BookingHistory;
