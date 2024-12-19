'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import styles from '@/styles/Requests.module.css'

export default function Requests() {
    const { user } = useAuth()
    const router = useRouter()
  
    // Move the loading state check and return statement below the hook calls
    const [filter, setFilter] = useState('all')
  
    // Mock request data
    const mockRequests = [
        { id: 1, type: 'Travel', amount: 500, date: '2024-03-15', status: 'pending', description: 'Flight tickets for conference' },
        { id: 2, type: 'Meals', amount: 75, date: '2024-03-14', status: 'approved', description: 'Client lunch meeting' },
        { id: 3, type: 'Supplies', amount: 150, date: '2024-03-13', status: 'rejected', description: 'Office supplies' }
    ]

    // Handle loading state
    if (!user) {
        return <p>Loading...</p>; // Show a spinner or placeholder while verifying authentication
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>My Requests</h1>
                <div className={styles.filters}>
                    <button 
                        className={filter === 'all' ? styles.active : ''}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button 
                        className={filter === 'pending' ? styles.active : ''}
                        onClick={() => setFilter('pending')}
                    >
                        Pending
                    </button>
                    <button 
                        className={filter === 'approved' ? styles.active : ''}
                        onClick={() => setFilter('approved')}
                    >
                        Approved
                    </button>
                    <button 
                        className={filter === 'rejected' ? styles.active : ''}
                        onClick={() => setFilter('rejected')}
                    >
                        Rejected
                    </button>
                </div>
            </div>

            <div className={styles.requestsTable}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockRequests.map((request) => (
                            <tr key={request.id}>
                                <td>#{request.id}</td>
                                <td>{request.type}</td>
                                <td>${request.amount}</td>
                                <td>{request.date}</td>
                                <td>
                                    <span className={styles[request.status]}>
                                        {request.status}
                                    </span>
                                </td>
                                <td>
                                    <button className={styles.viewBtn}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
