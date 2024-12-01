import React, { useState } from 'react'
import { useUpdateOrderStatusMutation } from '../../../../redux/features/orders/orderApi';

const UpdateOrderModal = ({order, isOpen, onClose}) => {
    const [status,setStatus] = useState(order?.status);

    const [UpdateOrderStatus, {isLoading, error}] =useUpdateOrderStatusMutation();
    const handleUpdateOrderStatus = async() => {
        try {
            await UpdateOrderStatus({id: order?._id, status});
            onClose();
        } catch (error) {
            console.error("Failed to update order status",err)
        }
    }

    if(!isOpen) return null;
  return (
    <div>UpdateOrderModal</div>
  )
}

export default UpdateOrderModal