import React, { useState } from 'react';

function ManageRolesAndP() {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Admin', permissions: ['All'] },
    { id: 2, name: 'Sub-Admin', permissions: ['View', 'Edit'] },
  ]);
  const [newRole, setNewRole] = useState('');
  const [newPermissions, setNewPermissions] = useState([]);
  const [availablePermissions] = useState(['View', 'Edit', 'Delete', 'All']);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleAddRole = () => {
    if (newRole.trim() && newPermissions.length > 0) {
      setRoles([
        ...roles,
        { id: roles.length + 1, name: newRole, permissions: newPermissions },
      ]);
      setNewRole('');
      setNewPermissions([]);
    } else {
      alert('Please provide a role name and select at least one permission.');
    }
  };

  const handlePermissionToggle = (permission) => {
    setNewPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((p) => p !== permission)
        : [...prevPermissions, permission]
    );
  };

  const handleSelectRole = (roleId) => {
    setSelectedRole(roles.find((role) => role.id === roleId));
  };

  return (
    <div className="bg-white min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-black mb-8">
          Manage Roles and Permissions
        </h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Create and Assign Roles</h2>
          <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-300">
            <div className="mb-6">
              <label htmlFor="roleName" className="block text-teal-600 font-medium mb-2">
                Role Name
              </label>
              <input
                type="text"
                id="roleName"
                className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter role name"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <h5 className="text-teal-600 font-medium mb-3">Select Permissions:</h5>
              <div className="flex flex-wrap gap-4">
                {availablePermissions.map((permission) => (
                  <div key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
                      value={permission}
                      checked={newPermissions.includes(permission)}
                      onChange={() => handlePermissionToggle(permission)}
                    />
                    <label className="ml-2 text-teal-600">{permission}</label>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="w-full px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition"
              onClick={handleAddRole}
            >
              Add Role
            </button>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Defined Roles</h2>
          <ul className="bg-white shadow-lg rounded-lg divide-y border border-teal-300">
            {roles.map((role) => (
              <li key={role.id} className="flex justify-between items-center p-4">
                <span className="text-black">
                  <strong>{role.name}</strong> - Permissions: {role.permissions.join(', ')}
                </span>
                <button
                  className="px-4 py-2 border border-teal-300 rounded-lg text-teal-600 hover:bg-teal-100 transition"
                  onClick={() => handleSelectRole(role.id)}
                >
                  Manage
                </button>
              </li>
            ))}
          </ul>
        </section>

        {selectedRole && (
          <section>
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">
              Manage Permissions for {selectedRole.name}
            </h2>
            <div className="bg-white p-6 shadow-lg rounded-lg border border-teal-300">
              <div className="flex flex-wrap gap-4">
                {availablePermissions.map((permission) => (
                  <div key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
                      value={permission}
                      checked={selectedRole.permissions.includes(permission)}
                      onChange={() => {
                        const updatedPermissions = selectedRole.permissions.includes(permission)
                          ? selectedRole.permissions.filter((p) => p !== permission)
                          : [...selectedRole.permissions, permission];

                        setRoles((prevRoles) =>
                          prevRoles.map((role) =>
                            role.id === selectedRole.id
                              ? { ...role, permissions: updatedPermissions }
                              : role
                          )
                        );
                        setSelectedRole((prevRole) => ({
                          ...prevRole,
                          permissions: updatedPermissions,
                        }));
                      }}
                    />
                    <label className="ml-2 text-teal-600">{permission}</label>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ManageRolesAndP;
