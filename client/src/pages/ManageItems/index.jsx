import React, { useEffect, useState } from "react";
import ProductService from "../../services/product.service";
import Swal from "sweetalert2";

const index = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // โหลดข้อมูลสินค้าจาก API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  // ลบสินค้า
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF66B2", // สีชมพูสด
      cancelButtonColor: "#70A1D7", // สีน้ำเงินอ่อน
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await ProductService.deleteProduct(id);
        fetchProducts();
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the product.", "error");
      }
    }
  };

  // เปิด Modal สำหรับแก้ไขสินค้า
  const handleEdit = (product) => {
    setEditProduct(product);
  };

  // อัปเดตสินค้า
  const handleUpdate = async () => {
    try {
      await ProductService.updateProduct(editProduct._id, editProduct);
      setEditProduct(null);
      fetchProducts();
      Swal.fire("Updated!", "Product updated successfully.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to update the product.", "error");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">
        Manage Products
      </h2>

      {/* ตารางแสดงสินค้า */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg bg-white">
            <thead className="bg-pink-200">
              <tr className="text-left">
                <th className="p-4 border-b text-sm font-medium text-gray-700">
                  Image
                </th>
                <th className="p-4 border-b text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="p-4 border-b text-sm font-medium text-gray-700">
                  Category
                </th>
                <th className="p-4 border-b text-sm font-medium text-gray-700">
                  Price (THB)
                </th>
                <th className="p-4 border-b text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="text-center">
                    <td className="p-4 border-b">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover mx-auto rounded-full shadow-lg"
                      />
                    </td>
                    <td className="p-4 border-b text-sm text-gray-800">
                      {product.name}
                    </td>
                    <td className="p-4 border-b text-sm text-gray-800">
                      {product.category}
                    </td>
                    <td className="p-4 border-b text-sm text-gray-800">
                      {product.price} THB
                    </td>
                    <td className="p-4 border-b">
                      <button
                        className="bg-yellow-400 text-white px-6 py-2 rounded-full hover:bg-yellow-300 transition duration-300"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-pink-500 text-white px-6 py-2 rounded-full ml-3 hover:bg-pink-400 transition duration-300"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal สำหรับแก้ไขสินค้า */}
      {editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-96 max-w-lg">
            <h3 className="text-xl font-semibold mb-4 text-pink-600">
              Edit Product
            </h3>
            <label className="block text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              className="w-full border p-3 rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />

            <label className="block text-sm font-medium text-gray-600">
              Price (THB)
            </label>
            <input
              type="number"
              className="w-full border p-3 rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
            />

            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-300 transition duration-300"
                onClick={() => setEditProduct(null)}
              >
                Cancel
              </button>
              <button
                className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-400 transition duration-300"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
