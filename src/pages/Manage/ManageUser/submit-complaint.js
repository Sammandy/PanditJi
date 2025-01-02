import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";

const UserComplaintManagement = () => {
  const [complaints, setComplaints] = useState([]);
  const [complaint, setComplaint] = useState('');
  const [userId, setUserId] = useState('');
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the complaint was submitted
  const complaintsPerPage = 3; // Number of complaints per page

  // Fetch complaints (this could be from the backend or mock data)
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('/api/complaints'); // Adjust your API endpoint
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const submitComplaint = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/complaints', { complaint, userId });
      setComplaint('');
      setShowComplaintModal(false);
      setIsSubmitted(true); // Set submitted to true
      fetchComplaints();
      setTimeout(() => setIsSubmitted(false), 3000); // Hide confirmation after 3 seconds
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  const handleComplaintModalClose = () => {
    setShowComplaintModal(false);
    setComplaint('');
  };

  // Handle pagination
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = complaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(complaints.length / complaintsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mb-6">
        <Col xs={4}>
          {/* Buttons for managing complaints */}
          <div className="d-grid gap-2">
            <Link to="/Manage/ManageUsers">
              <Button
                variant="primary"
                onClick={() => setShowComplaintModal(true)}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  minWidth: '150px',
                  height: '45px',
                }}
              >
                Submit Complaint
              </Button> 
            </Link>
            <Button
              variant="info"
              onClick={fetchComplaints}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                minWidth: '150px',
                height: '45px',
              }}
            >
              View Complaints
            </Button>
          </div>
        </Col>
      </Row>

      {/* Modal for submitting complaints */}
      <Modal show={showComplaintModal} onHide={handleComplaintModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit a Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitComplaint}>
            <Form.Group controlId="complaint">
              <Form.Label>Complaint</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                placeholder="Enter your complaint"
              />
            </Form.Group>
            <Form.Group controlId="userId">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleComplaintModalClose}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={submitComplaint} 
            disabled={!complaint || !userId} // Disable button if fields are empty
          >
            Submit Complaint
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Display confirmation message after submission */}
      {isSubmitted && (
        <Alert variant="success" className="mt-3">
          Complaint submitted successfully!
        </Alert>
      )}

      {/* View Complaints */}
      <h3 className="mt-5 text-teal-600 text-3xl font-semibold mb-6">Complaints List</h3>
      <Row>
        {currentComplaints.length === 0 ? (
          <p>No complaints submitted yet.</p>
        ) : (
          currentComplaints.map((complaintItem) => (
            <Col key={complaintItem.id} xs={12} sm={6} md={4}>
              <div className="complaint-card p-4 mb-4 bg-white rounded-lg shadow-md">
                <h5 className="text-teal-600">User ID: {complaintItem.userId}</h5>
                <p className="text-gray-800">{complaintItem.complaint}</p>
              </div>
            </Col>
          ))
        )}
      </Row>

      {/* Pagination buttons */}
      <div
        className="d-flex justify-content-between align-items-center mt-6 p-2 border rounded"
        style={{
          width: '100%',
          minWidth: '400px',
          gap: '20px',
        }}
      >
        <Link to="/Manage/ManageUsers">
          <Button
            variant="secondary"
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              minWidth: '150px',
              height: '45px',
            }}
            onClick={handlePrevious}
          >
            Previous
          </Button>
        </Link>

        <Button
          type="submit"
          variant="primary"
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            minWidth: '150px',
            height: '45px',
          }}
        >
          Create User
        </Button>

        <Button
          variant="secondary"
          onClick={handleNext}
          disabled={currentPage === Math.ceil(complaints.length / complaintsPerPage)}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            minWidth: '150px',
            height: '45px',
          }}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default UserComplaintManagement;
