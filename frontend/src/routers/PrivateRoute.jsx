import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children, role}) => {
    const {user} = useSelector((state) => state.auth);
    // console.log(user)
    const location = useLocation();
    if(!user) {
        alert("You must be looged in")
        return <Navigate to="/login" state={{from: location}} replace/>
    }

    if(role &&  user.role !== role) {
        alert('Yor are not authorized to access the page!')
        return <Navigate to="/login" state={{from: location}} replace/>
    }
  return children;
}

export default PrivateRoute