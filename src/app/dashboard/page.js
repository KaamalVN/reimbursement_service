'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Dashboard.module.css';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return <p>Loading...</p>; // Show a spinner or placeholder while verifying authentication
  }

  const stats = [
    { label: 'Pending Requests', value: 5, color: 'warning' },
    { label: 'Approved', value: 12, color: 'success' },
    { label: 'Rejected', value: 2, color: 'danger' },
    { label: 'Total Amount', value: '$2,450', color: 'primary' }
  ];

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.stats}>
        {stats.map((stat) => (
          <div key={stat.label} className={`${styles.statCard} ${styles[stat.color]}`}>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
