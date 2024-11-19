import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditProfileMutation } from "../../../redux/features/auth/authApi";

import avatarImg from "../../../assets/avatar.png";
import { setUser } from "../../../redux/features/auth/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editProfile, { isLoading, isError, error, isSuccess }] =
    useEditProfileMutation();

  const [formData, setFormData] = useState({
    username: "",
    profileImage: "",
    bio: "",
    profession: "",
    userId: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user?.username || "",
        profileImage: user?.profileImage || "",
        bio: user?.bio || "",
        profession: user?.profession || "",
        userId: user?.id || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username: formData.username,
      profileImage: formData.profileImage,
      bio: formData.bio,
      profession: formData.profession,
      userId: formData.userId,
    };
    try {
      const response = await editProfile(updatedUser).unwrap();
      dispatch(setUser(response.user));
      localStorage.setItem("user", JSON.stringify(response.user));
      alert("Your profile is updated");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile. Please try again");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <img
            src={formData?.profileImage || avatarImg}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full"
          />
          <div className="ml-6">
            <h3 className="text-2xl font-semibold">
              {formData?.username || "N/A"}
            </h3>
            <p className="text-gray-700">Bio: {formData?.bio || "N/A"}</p>
            <p className="text-gray-700">
              Profession: {formData?.profession || "N/A"}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto text-blue-500 hover:text-blue-700 hover:underline"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg md:w-96 max-w-xl mx-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <i className="ri-close-line size-6"></i>
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData?.username}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Image URL
                </label>
                <input
                  type="text"
                  name="profileImage"
                  value={formData?.profileImage}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                  placeholder="Profile image URL"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  About you
                </label>
                <textarea
                  name="bio"
                  rows="3"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                  value={formData?.bio}
                  placeholder="Write about yourself"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="profession"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  value={formData?.profession}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                  placeholder="Profession"
                />
              </div>
              <button
                className="mt-4 w-full bg-blue-400 text-white p-2 rounded-md hover:bg-blue-700"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
              {isError && (
                <p className="mt-2 text-red-500">
                  {error?.data?.message || "Failed to update profile. Try again!"}
                </p>
              )}
              {isSuccess && (
                <p className="mt-2 text-green-500">
                  Profile Updated Successfully!
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
