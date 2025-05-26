"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

useEffect(() => {
  if (typeof window !== 'undefined') {
    const isLoggedIn = localStorage.getItem('loggedIn')
    if (isLoggedIn) {
      router.replace('/dashboard') // replace avoids back nav to login
    }
  }
}, [router])


  const handleSubmit = (e) => {
    e.preventDefault()
    if (email === 'admin@site.com' && password === 'password123') {
      localStorage.setItem('loggedIn', 'true')
      router.push('/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen dark:bg-darkTheme  flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white border border-white p-8  rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center dark:text-black">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">❌ {error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@site.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="password123"
            />
          </div>

          <button
            type="submit"
            className="w-full border border-white bg-black dark:text-white dark:bg-darkTheme  text-white py-2 rounded  hover:bg-black transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
