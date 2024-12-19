'use client'
import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
export default function Mycompany() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    return <p>Loading...</p>; // Show a spinner or placeholder while verifying authentication
  }

  
  return (
    <div className="container">
      <h1>Mycompany</h1>
      <p>Mycompany management page coming soon...</p>
    </div>
  )
} 