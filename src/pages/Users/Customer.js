import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Grid, Card, CardContent, CardActions, Modal, Box } from '@mui/material';

function Customer() {
  // States for customer management
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', bookingHistory: '', complaint: '' });
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [complaints, setComplaints] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateCustomer = () => {
    setCustomers([...customers, formData]);
    setFormData({ name: '', email: '', bookingHistory: '', complaint: '' });
    handleClose();
  };

  const handleDeleteCustomer = (email) => {
    setCustomers(customers.filter(customer => customer.email !== email));
  };

  const handleViewBookings = (email) => {
    // Fetch or filter bookings related to the selected customer
    setBookings(customers.find(customer => customer.email === email).bookingHistory);
  };

  const handleAddComplaint = (email) => {
    // Example logic for adding a complaint
    setComplaints([...complaints, { email, complaint: formData.complaint }]);
    setFormData({ ...formData, complaint: '' });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Customer Management
      </Typography>

      {/* Button to create new customer */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Customer
      </Button>

      <Grid container spacing={3} mt={3}>
        {/* Display customer list */}
        {customers.map((customer) => (
          <Grid item xs={12} sm={6} md={4} key={customer.email}>
            <Card>
              <CardContent>
                <Typography variant="h6">{customer.name}</Typography>
                <Typography variant="body2">{customer.email}</Typography>
                <Typography variant="body2">Booking History: {customer.bookingHistory}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleViewBookings(customer.email)}>View Booking History</Button>
                <Button onClick={() => handleAddComplaint(customer.email)}>Add Complaint</Button>
                <Button onClick={() => handleDeleteCustomer(customer.email)} color="secondary">
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal to add a new customer */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 400 }}>
          <Typography variant="h6" gutterBottom>
            Add New Customer
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Booking History"
            name="bookingHistory"
            value={formData.bookingHistory}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleCreateCustomer} variant="contained" color="primary" fullWidth>
            Create Customer
          </Button>
        </Box>
      </Modal>

      {/* Display booking history */}
      <Typography variant="h5" gutterBottom mt={5}>
        Booking History
      </Typography>
      <Grid container spacing={2}>
        {bookings.map((booking, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="body2">Booking: {booking}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Display customer complaints */}
      <Typography variant="h5" gutterBottom mt={5}>
        Customer Complaints
      </Typography>
      <Grid container spacing={2}>
        {complaints.map((complaint, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="body2">Customer: {complaint.email}</Typography>
                <Typography variant="body2">Complaint: {complaint.complaint}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// Style for the modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: 24,
  borderRadius: '8px',
};

export default Customer;
