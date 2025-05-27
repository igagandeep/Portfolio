'use client';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/app/context/AuthContext';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const { login, user : loggedInUser} = useAuth()
  const router = useRouter();


    useEffect(() => {
      if (loggedInUser) {
        router.replace('/dashboard');
      }
    }, [loggedInUser, router]);
  

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/login', { user, pass });
      login(data.token);
      router.push('/dashboard');
    } catch (e) {
      setErr(e.response?.data?.error || 'Login failed');
    }
  };


  return (
    <div className=' dark:bg-darkTheme  flex  mt-40 justify-center px-4'>
      <div className='w-full max-w-md bg-gray-100 border border-white p-8 rounded shadow-lg'>
        <h2 className='text-2xl font-semibold mb-2 text-center dark:text-black'>
          Admin Login
        </h2>

        {err && (
          <p className='text-red-500 text-sm mb-4 text-center'>❌ {err}</p>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              name='email'
               value={user}
          onChange={e => setUser(e.target.value)}
              required
              className='w-full border border-gray-300 rounded px-3 py-2 dark:text-black focus:outline-none focus:ring-2 focus:ring-black-500'
              placeholder='admin@site.com'
            />
          </div>

          <div>
            <label className='block mb-1 text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              name='password'
               value={pass}
          onChange={e => setPass(e.target.value)}
              required
              className='w-full border border-gray-300 rounded px-3 py-2 dark:text-black focus:outline-none focus:ring-2 focus:ring-black-500'
              placeholder='please enter your password'
            />
          </div>

          <button
            type='submit'
            className='w-full border border-white bg-black dark:text-white dark:bg-darkTheme  text-white py-2 rounded  hover:bg-black transition'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
