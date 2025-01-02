import React, { useState } from 'react';

function ManageCategories() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Astrology Services' },
    { id: 2, name: 'Samagri' },
    { id: 3, name: 'Products' },
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [editCategory, setEditCategory] = useState({ id: null, name: '' });

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { id: Date.now(), name: newCategory }]);
      setNewCategory('');
    }
  };

  const handleEditCategory = (id, name) => {
    setEditCategory({ id, name });
  };

  const handleUpdateCategory = () => {
    setCategories(categories.map(cat => (cat.id === editCategory.id ? editCategory : cat)));
    setEditCategory({ id: null, name: '' });
  };

  const handleDeleteCategory = id => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-center text-3xl font-semibold text-teal-800 mb-6">Manage Categories</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <h5 className="text-xl font-medium text-teal-700 mb-4">Add New Category</h5>
          <div className="flex space-x-4">
            <input
              type="text"
              className="form-input px-4 py-2 border border-teal-500 rounded-lg w-full"
              placeholder="Enter category name"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
            />
            <button
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
              onClick={handleAddCategory}
            >
              Add
            </button>
          </div>
        </div>

        <h5 className="text-xl font-medium text-teal-700 mb-4">Existing Categories</h5>
        <ul className="space-y-4">
          {categories.map(category => (
            <li
              key={category.id}
              className="flex justify-between items-center p-4 bg-teal-100 rounded-lg shadow-sm"
            >
              {editCategory.id === category.id ? (
                <input
                  type="text"
                  className="form-input px-4 py-2 border border-teal-500 rounded-lg w-full"
                  value={editCategory.name}
                  onChange={e => setEditCategory({ ...editCategory, name: e.target.value })}
                />
              ) : (
                <span className="text-lg text-teal-800">{category.name}</span>
              )}
              <div className="flex space-x-4">
                {editCategory.id === category.id ? (
                  <button
                    className="bg-teal-600 text-white px-4 py-1 rounded-lg hover:bg-teal-700"
                    onClick={handleUpdateCategory}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-teal-500 text-white px-4 py-1 rounded-lg hover:bg-teal-600"
                    onClick={() => handleEditCategory(category.id, category.name)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-black text-white px-4 py-1 rounded-lg hover:bg-gray-800"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManageCategories;
