import React, { useState, useEffect } from "react";
import { useUpdateOrderStatusMutation } from "../../../../redux/features/orders/orderApi";

const UpdateOrderModal = ({ order, isOpen, onClose }) => {
  const [status, setStatus] = useState(order?.status || "pending");
  const [updateOrderStatus, { isLoading, error }] = useUpdateOrderStatusMutation();

  // Reset status when the modal opens with a new order
  useEffect(() => {
    if (order) {
      setStatus(order?.status || "pending");
    }
  }, [order]);

  const handleUpdateOrderStatus = async () => {
    if (!status) {
      alert("Please select a valid order status.");
      return;
    }

    try {
      await updateOrderStatus({ id: order?._id, status }).unwrap();
      onClose(); // Close the modal after a successful update
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

  // Don't render modal if not open
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>

        {/* Order Status Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Order Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full shadow-sm sm:text-sm bg-white
            border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Display Error (if any) */}
        {error && (
          <p className="text-red-500 mb-4">
            {error.data?.message || "Failed to update order status."}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateOrderStatus}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderModal;
