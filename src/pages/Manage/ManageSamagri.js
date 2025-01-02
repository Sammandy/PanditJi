import React, { useState } from 'react';

// Modal component for confirmation
function ConfirmationModal({ onClose, onConfirm, show, itemName }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
        }}
      >
        <h3 style={{ color: '#2c3e50' }}>
          Are you sure you want to remove <strong>{itemName}</strong>?
        </h3>
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: '#1abc9c', // Using the page color
              color: 'white',
              padding: '8px 15px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Yes
          </button>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              padding: '8px 15px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal component for editing samagri
function EditSamagriModal({ onClose, onSave, show, samagri, onChange }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          width: '400px',
        }}
      >
        <h3 style={{ color: '#2c3e50' }}>Edit Samagri</h3>
        <div>
          <input
            type="text"
            value={samagri.name}
            onChange={(e) => onChange('name', e.target.value)}
            style={{
              padding: '15px',  // Increased padding
              margin: '5px',
              border: '1px solid #3498db',
              borderRadius: '8px',
              width: '100%',
              marginBottom: '15px',
              fontSize: '16px',  // Increased font size
            }}
          />
          <input
            type="number"
            value={samagri.quantity}
            onChange={(e) => onChange('quantity', e.target.value)}
            style={{
              padding: '15px',  // Increased padding
              margin: '5px',
              border: '1px solid #3498db',
              borderRadius: '8px',
              width: '100%',
              marginBottom: '15px',
              fontSize: '16px',  // Increased font size
            }}
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => onSave()}
            style={{
              backgroundColor: '#1abc9c', // Matching the page color
              color: 'white',
              padding: '8px 15px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Save
          </button>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              padding: '8px 15px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal component for viewing usage report
function UsageReportModal({ onClose, show, samagri }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          width: '400px',
        }}
      >
        <h3 style={{ color: '#2c3e50' }}>Samagri Usage Report</h3>
        <div>
          <h4 style={{ color: '#34495e' }}>Samagri: {samagri.name}</h4>
          <p style={{ color: '#7f8c8d' }}>Quantity Used: {samagri.quantityUsed}</p>
        </div>
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              padding: '8px 15px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ManageSamagri() {
  const [samagriList, setSamagriList] = useState([
    { name: 'Havan Samagri', quantity: 50, quantityUsed: 20 },
    { name: 'Kapoor', quantity: 30, quantityUsed: 15 },
    { name: 'Diya', quantity: 20, quantityUsed: 10 },
    { name: 'Kesari Sindoor', quantity: 100, quantityUsed: 50 },
  ]);
  const [newSamagri, setNewSamagri] = useState({ name: '', quantity: '' });
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUsageModal, setShowUsageModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [samagriToEdit, setSamagriToEdit] = useState({ name: '', quantity: '' });
  const [samagriToView, setSamagriToView] = useState(null);

  // Handle adding a new samagri
  const addSamagri = () => {
    setSamagriList([...samagriList, newSamagri]);
    setNewSamagri({ name: '', quantity: '' });
  };

  // Handle editing an existing samagri
  const editSamagri = (index) => {
    setSamagriToEdit(samagriList[index]);
    setShowEditModal(true);
  };

  // Handle removing a samagri with confirmation
  const removeSamagri = (index) => {
    setItemToRemove(index);
    setShowModal(true);
  };

  // View usage report
  const viewUsageReport = (samagri) => {
    setSamagriToView(samagri);
    setShowUsageModal(true);
  };

  // Save the edited samagri
  const saveEditedSamagri = () => {
    const updatedList = samagriList.map((item) =>
      item.name === samagriToEdit.name ? samagriToEdit : item
    );
    setSamagriList(updatedList);
    setShowEditModal(false);
  };

  // Confirm removal of samagri
  const confirmRemove = () => {
    if (itemToRemove !== null) {
      const updatedList = samagriList.filter((_, i) => i !== itemToRemove);
      setSamagriList(updatedList);
      setItemToRemove(null);
    }
    setShowModal(false);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setItemToRemove(null);
  };

  // Handle samagri change
  const handleSamagriChange = (field, value) => {
    setSamagriToEdit((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '30px', backgroundColor: '#ffffff', height: '100vh', margin: 0 }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center', fontWeight: 'bold', marginBottom: '30px' }}>Manage Samagri</h1>

      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Samagri Name"
          value={newSamagri.name}
          onChange={(e) => setNewSamagri({ ...newSamagri, name: e.target.value })}
          style={{
            padding: '15px',  // Increased padding
            margin: '5px',
            border: '1px solid #3498db',
            borderRadius: '8px',
            width: '300px', // Increased width
            marginRight: '10px',
            fontSize: '16px',  // Increased font size
          }}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newSamagri.quantity}
          onChange={(e) => setNewSamagri({ ...newSamagri, quantity: e.target.value })}
          style={{
            padding: '15px',  // Increased padding
            margin: '5px',
            border: '1px solid #3498db',
            borderRadius: '8px',
            width: '300px', // Increased width
            marginRight: '10px',
            fontSize: '16px',  // Increased font size
          }}
        />
        <button
          onClick={addSamagri}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1abc9c', // Matching the page color
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s',
            marginTop: '10px'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#16a085')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#1abc9c')}
        >
          Add Samagri
        </button>
      </div>

      <div>
        <h2 style={{ color: '#34495e', textAlign: 'center', marginBottom: '20px' }}>Samagri Inventory</h2>
        <div
          style={{
            maxHeight: '300px',
            overflowY: 'scroll',
            border: '1px solid #ecf0f1',
            marginBottom: '30px',
            padding: '10px',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#ecf0f1' }}>
                <th style={{ padding: '15px', border: '1px solid #bdc3c7' }}>Name</th>
                <th style={{ padding: '15px', border: '1px solid #bdc3c7' }}>Quantity</th>
                <th style={{ padding: '15px', border: '1px solid #bdc3c7' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {samagriList.map((samagri, index) => (
                <tr key={index}>
                  <td style={{ padding: '15px', border: '1px solid #bdc3c7' }}>{samagri.name}</td>
                  <td style={{ padding: '15px', border: '1px solid #bdc3c7' }}>{samagri.quantity}</td>
                  <td style={{ padding: '15px', border: '1px solid #bdc3c7' }}>
                    <button
                      onClick={() => editSamagri(index)}
                      style={{
                        backgroundColor: '#3498db',
                        color: 'white',
                        padding: '8px 15px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginRight: '10px',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeSamagri(index)}
                      style={{
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        padding: '8px 15px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => viewUsageReport(samagri)}
                      style={{
                        backgroundColor: '#f39c12',
                        color: 'white',
                        padding: '8px 15px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginLeft: '10px',
                      }}
                    >
                      View Usage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        onClose={closeModal}
        onConfirm={confirmRemove}
        show={showModal}
        itemName={samagriList[itemToRemove]?.name}
      />

      {/* Edit Samagri Modal */}
      <EditSamagriModal
        onClose={() => setShowEditModal(false)}
        onSave={saveEditedSamagri}
        show={showEditModal}
        samagri={samagriToEdit}
        onChange={handleSamagriChange}
      />

      {/* Usage Report Modal */}
      <UsageReportModal
        onClose={() => setShowUsageModal(false)}
        show={showUsageModal}
        samagri={samagriToView}
      />
    </div>
  );
}

export default ManageSamagri;





