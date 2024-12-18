import React, { useState } from "react";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../../../redux/features/auth/authApi";

import UpdateUserModal from "./UpdateUserModal";
import { useSelector } from "react-redux";

const ManageUser = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: users = [], error, isLoading, refetch } = useGetUserQuery();
  // console.log(users)

  const loggedInUser = useSelector((state) => state.auth.user);

  // Helper to check if the user is the logged-in user
  const isSelf = (userId) => loggedInUser?.id === userId;


  const [deleteUser] = useDeleteUserMutation();
  const handleDeleteUser = async (id) => {
    if (isSelf(id)) {
        alert("You cannot delete your own account.");
        return;
      }
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      );
      if (!confirmDelete) return;
    try {
      const response = await deleteUser(id).unwrap();
      alert("User deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModelOpen(true);
  };

  const handleCloseModal = () => {
    setIsModelOpen(false);
    setSelectedUser(null);
  };
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading User data...</div>}
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Users
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </button>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      User Email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      User Role
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Edit or Manage
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users &&
                    users.map((user, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {user?.email || "N/A"}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <span
                            className={`rounded-full py-[2px] px-3
                        ${
                          user?.role === "admin"
                            ? "bg-indigo-500 text-white"
                            : "bg-amber-300"
                        }`}
                          >
                            {user?.role || "N/A"}
                          </span>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 cursor-pointer hover:text-primary">
                          <button
                            className="flex gap-1 items-center"
                            onClick={() => handleEditUser(user)}
                          >
                            <i className="ri-edit-2-line"></i>
                            edit
                          </button>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            className={`bg-red-600 text-white px-2 py-1 ${
                                isSelf(user?._id) ? "cursor-not-allowed opacity-50" : ""
                              }`}
                              onClick={() => handleDeleteUser(user?._id)}
                              disabled={isSelf(user?._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {isModelOpen && (
        <UpdateUserModal
          user={selectedUser}
          onClose={handleCloseModal}
          onRoleUpdate={refetch}
        />
      )}
    </>
  );
};

export default ManageUser;
