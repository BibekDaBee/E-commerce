// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import CartModal from '../pages/shop/CartModal';
import avatarImg from "../assets/avatar.png"
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';
import Swal from 'sweetalert2';

export const Navbar = () => {
    const products = useSelector((state) =>  state.cart.products);
    //  console.log(products);

    const [isCartOpen,setIsCartOpen] = useState(false);
    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen)
    }

    //Show user if logged in
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();
   // console.log(user)

   // Dropdown menu
   const [isDropDownOpen, setIsDropDownOpen] = useState(false);
   const handleDropDownToggle = () =>{
    setIsDropDownOpen(!isDropDownOpen)
   } 

   // admin drop down menus
   const adminDropDownMenus = [
    {label: "Dashboard", path: "/dashboard/admin"},
    {label: "Manage Items", path: "/dashboard/manage-products"},
    {label: "All Orders", path: "/dashboard/manage-orders"},
    {label: "Add Product", path: "/dashboard/add-product"}
   ]

    // User drop down menus
    const userDropDownMenus = [
        {label: "Dashboard", path: "/dashboard"},
        {label: "Profile", path: "/dashboard/profile"},
        {label: "Payments", path: "/dashboard/payments"},
        {label: "Orders", path: "/dashboard/orders"}
       ]

    const dropdownMenus = user?.role == 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus]

   const handleLogout = async() => {
    try {
        await logoutUser().unwrap();
        dispatch(logout());
        navigate('/')
        Swal.fire({
            title: "Logged Out!",
            text: "You have been looged out, Press Ok to continue!",
            icon: "success"
          });
    

    } catch (error) {
        console.error("Failed to log out", error)
    }
   } 

   const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`nav ${isScrolled ? "scrolled" : ""}`}>
        <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>
            <ul className='nav__links'>
                <li className='link'><Link to ="/">Home</Link></li>
                <li className='link'><Link to ="/shop">Shop</Link></li>
                {/* <li className='link'><Link to ="/">Pages</Link></li> */}
                <li className='link'><Link to ="/contact">Contact</Link></li>
                <li className='link'><Link to ="/contact"></Link></li>
            </ul>

            {/*logo*/}
            <div className='nav__logo'>
                <Link to="/">E-Commerce<span>.</span></Link>
            </div>

            {/* nav icons */}
            <div className='nav__icons relative'>
                <span>
                    <Link to ="/search">
                        <i className="ri-search-line"></i>
                    </Link>
                </span>

                <span>
                    <button onClick={handleCartToggle} className='hover:text-primary'>
                        <i className="ri-shopping-bag-line"></i>
                        <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>{products.length}</sup>
                    </button>
                </span>

                <span>
                    {
                        user && user ? (<>
                        <img onClick = {handleDropDownToggle} src={user?.profileImage || avatarImg} alt='Profile Image' 
                        className='size-6 rounded-full cursor-pointer'/>
                        {
                            isDropDownOpen && (
                                <div className='absolute right-0 mt-3 p-4 w-48 bg-white border-gray-200 rounded-lg shadow-lg z-50'>
                                    <ul className='font-medium space-y-4 p-2'>
                                        {dropdownMenus.map((menu, index) =>(
                                            <li key={index}>
                                                <Link 
                                                onClick={() => setIsDropDownOpen(false)}
                                                className = 'dropdown-items' 
                                                to={menu.path}>{menu.label}</Link>
                                            </li>
                                        ))}
                                        <li><Link onClick={handleLogout} className='dropdown-items'>Log Out</Link></li>
                                    </ul>
                                </div>
                            )
                        }
                        </>) : (<Link to="/login">
                            <i className="ri-user-line"></i>
                            </Link>)
                    }
                </span>

            </div>
        </nav>

        {
            isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle}/>
        }

    </header>
  )
}
export default Navbar;