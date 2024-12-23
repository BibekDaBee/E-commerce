import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice'
import Swal from 'sweetalert2'
const navItems = [
    {path: '/dashboard', label: 'Dashboard'},
    {path: '/dashboard/orders', label: 'Orders'},
    {path: '/dashboard/payments', label: 'Payments'},
    {path: '/dashboard/profile', label: 'Profile'},
    {path: '/dashboard/reviews', label: 'Reviews'},
]

const UserDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            await logoutUser().unwrap();
            Swal.fire({
                title: "Logged Out!",
                text: "You have been looged out, Press Ok to continue!",
                icon: "success"
              });
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
                <Link to='/'>Ecommerce<span>.</span></Link>
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

export default UserDashboard