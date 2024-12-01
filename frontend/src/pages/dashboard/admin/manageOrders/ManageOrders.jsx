import React, { useState } from 'react'
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../../redux/features/orders/orderApi'
import { formatDate } from '../../../../utils/formatDate';
import {Link} from 'react-router-dom'
import UpdateOrderModal from './UpdateOrderModal';

const ManageOrders = () => {
  const {data: orders, isLoading, error, refetch} = useGetAllOrdersQuery();
  // console.log(data)
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  }

  const handleDeleteOrder = async(orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Order? This action cannot be undone."
    );
    if (!confirmDelete) return;
    try {
      await deleteOrder(orderId).unwrap();
      alert("Order deleted successfully");
      refetch();
      
    } catch (error) {
      console.error("Failed to delete Order:", error);
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-green-500';
      case 'completed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    
      
    }
  }

  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Something went wrong!</div>
  return (
    <div className='section__container p-6 '>
      <h2 className='2xl font-semibold mb-4'>Manage Orders</h2>
      <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='py-3 px-4 border-b font-medium'>Order Id</th>
            <th className='py-3 px-4 border-b font-medium'>Customer</th>
            <th className='py-3 px-4 border-b font-medium'>Status</th>
            <th className='py-3 px-4 border-b font-medium'>Date</th>
            <th className='py-3 px-4 border-b font-medium'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            orders && orders.map((order, index) => (
              <tr key={index}>
                <td className='py-3 px-4 border-b'>{order?.orderId}</td>
                <td className='py-3 px-4 border-b'>{order?.email}</td>
                <td className='py-3 px-4 border-b'>
                  <span className={`inline-block px-3 py-1 text-xs text-white rounded-full
                    ${getStatusColor(order?.status)}`}>{order?.status}</span>
                </td>
                <td className='py-3 px-4 border-b'>
                  {formatDate(order?.updatedAt)}
                </td>
                <td className='py-3 px-4 flex items-center space-x-4'>
                  <Link to={``} className='text-blue-500 hover:underline'>View</Link>
                  <button className="text-green-500 hover:underline" onClick={() => handleEditOrder(order)}>Edit</button>
                  <button className="text-red-500 hover:underline" onClick={() => handleDeleteOrder(order?._id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {/* Update Order Modal */}
      {
        selectedOrder && (
          <UpdateOrderModal order={selectedOrder} isOpen={isModalOpen} onClose={handleCloseModal}/>
        )
      }
    </div>
  )
}

export default ManageOrders