import React, { useState } from "react";

const RatnaYantra = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", type: "", price: "", quantity: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addProduct = () => {
    if (editingProduct) {
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? { ...editingProduct, ...formData } : product
        )
      );
      setEditingProduct(null);
    } else {
      setProducts([...products, { id: Date.now(), ...formData }]);
    }
    setFormData({ name: "", type: "", price: "", quantity: "" });
  };

  const editProduct = (product) => {
    setFormData(product);
    setEditingProduct(product);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="min-h-screen bg-teal-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-black mb-6">Ratna Yantra Management</h1>

        {/* Form Section */}
        <div className="bg-teal-50 p-6 rounded-md shadow-sm mb-6">
          <h2 className="text-xl font-semibold text-black mb-4">{editingProduct ? "Edit Product" : "Add Product"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="border border-teal-300 rounded-md p-3 focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              placeholder="Type (Ratna/Yantra)"
              className="border border-teal-300 rounded-md p-3 focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="border border-teal-300 rounded-md p-3 focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              className="border border-teal-300 rounded-md p-3 focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            onClick={addProduct}
            className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 focus:ring-4 focus:ring-teal-500"
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </div>

        {/* Product List */}
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold text-black mb-4">Inventory</h2>
          {products.length > 0 ? (
            <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
              <thead className="bg-teal-100">
                <tr>
                  <th className="p-4 text-left text-black">Name</th>
                  <th className="p-4 text-left text-black">Type</th>
                  <th className="p-4 text-left text-black">Price</th>
                  <th className="p-4 text-left text-black">Quantity</th>
                  <th className="p-4 text-left text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.type}</td>
                    <td className="p-4">{product.price}</td>
                    <td className="p-4">{product.quantity}</td>
                    <td className="p-4 space-x-3">
                      <button
                        onClick={() => editProduct(product)}
                        className="text-teal-600 hover:text-teal-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center mt-4">No products available. Add some to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatnaYantra;
