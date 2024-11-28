import React, { useState } from 'react';
import { useUpdateUserRoleMutation } from '../../../../redux/features/auth/authApi';
import { useSelector } from 'react-redux';

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
    const [role, setRole] = useState(user.role);
    const [isSaving, setIsSaving] = useState(false); // To track saving state
    const [updateUserRole] = useUpdateUserRoleMutation();
    
    const loggedInUser = useSelector((state) => state.auth.user);

    const handleUpdateRole = async () => {
        if (!role) {
            alert("Please select a role");
            return;
        }

        setIsSaving(true); // Disable the button during save
        try {
            await updateUserRole({ userId: user?._id, role }).unwrap();
            alert("Role updated successfully");
            onRoleUpdate();
            onClose();
        } catch (error) {
            console.error("Failed to update user role:", error);
            alert("Failed to update the role. Please try again.");
        } finally {
            setIsSaving(false); // Re-enable the button
        }
    };

    const isSelf = loggedInUser?.id === user?._id; // Check if editing own role

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-white p-4 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Edit User Role</h2>

                {/* Email Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 px-5">Email</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="mt-1 bg-gray-100 block w-full shadow-sm sm-text-sm border border-gray-300 rounded-md py-2.5 px-5 focus:outline-none"
                    />
                </div>

                {/* Role Selector */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 px-5">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        disabled={isSelf} // Disable dropdown if editing own role
                        className={`block w-full shadow-sm sm:text-sm ${isSelf ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'} border border-gray-300 rounded-md py-2.5 px-5 focus:outline-none`}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    {isSelf && (
                        <p className="text-sm text-red-500 mt-2">
                            You cannot edit your own role.
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end pt-5">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    {!isSelf && (
                        <button
                            onClick={handleUpdateRole}
                            disabled={isSaving}
                            className={`px-4 py-2 rounded text-white ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'}`}
                        >
                            {isSaving ? "Saving..." : "Save"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateUserModal;
