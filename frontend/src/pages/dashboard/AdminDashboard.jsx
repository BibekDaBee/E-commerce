import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice';

const navItems = [
    {path: '/dashboard/admin', label: 'Dashboard'},
    {path: '/dashboard/add-new-post', label: 'Add New Product'},
    {path: '/dashboard/manage-products', label: 'Manage Products'},
    {path: '/dashboard/users', label: 'Users'},
    {path: '/dashboard/manage-orders', label: 'Manage Orders'},
]

const AdminDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            await logoutUser().unwrap();
            alert('logout successful');
            dispatch(logout());
            navigate('/')
        } catch (error) {
            console.error("Failed to logout", error)
        }
    }
  return (
    <div className='space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between'>
        <div>
            <div className='nav__logo'>
                <Link to="/">Ecommerce<span>.</span></Link>
                <p className='text-sx italic'>User Dashboard</p>
            </div>
            <hr className='mt-t'/>
            <ul className='space-y-5 pt-10'>
                {
                    navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink 
                            className={({isActive}) => isActive ? "text-blue-500 font-bold" : "text-black"} end
                            to={item.path}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </div>
        
        {/* Logout button */}
        <div className='mb-3'>
            <hr className='mb-3'/>
            <button 
            onClick={handleLogout}
            className='text-white bg-primary font-medium px-5 py-1 rounded-sm'>Logout</button>
        </div>
    </div>
  )
}

export default AdminDashboard