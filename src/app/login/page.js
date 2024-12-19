// src/app/login/page.js
'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import styles from '@/styles/Login.module.css'

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(credentials.email, credentials.password) // Await the login call
    if (!success) {
      alert('Invalid credentials') // Show alert for invalid credentials
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1>Welcome Back</h1>
        <p>Please sign in to continue</p>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className={styles.loginBtn}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
