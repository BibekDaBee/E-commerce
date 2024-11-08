import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../redux/features/auth/authApi';

const Login = () => {
    const [message, setMessage] = useState('')

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const [loginUser, {isLoading: loginLoading}] = useLoginUserMutation()
    // console.log(loginUser)

    const navigate = useNavigate();

    // Handel Logon
    const handleLogin = async(e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }
        // console.log(data);

        try {
            const response = await loginUser(data).unwrap();
            // console.log(response)
            alert("Login Successful");
            navigate("/")
        } catch (error) {
            setMessage("Please enter correct credentials")
        }
    }

  return (
    <section className='h-screen flex items-center justify-center'>
        <div className='max-w-sm border shadow bg-white mx-auto p-8'>
            <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
            <form onSubmit={handleLogin} className='space-y-5 max-w-sm max-auto pt-8'>
                <input type='email' name='email' id='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email Address' required
                className='w-full bg-gray-100 focus:outline-none px-5 py-3'/>

                <input type='password' name='password' id='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password' required
                className='w-full bg-gray-100 focus:outline-none px-5 py-3'/>

                {
                    message && <p className='text-red-500'>{message}</p>
                }

                <button type='submit' className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium
                py-3 rounded-md'>Login</button>
            </form>

            <p className='my-5 italic text-sm text-center'>
                Do not have an account?{" "}
                <Link to='/register' className='text-primary underline hover:font-semibold'>
                    Register
                </Link>{" "}
                 here.
            </p>
        </div>
    </section>
  )
}

export default Login