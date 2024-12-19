'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api'; // Axios instance for API requests

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token with backend
      api.get('/validate-token', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data.user); // Assuming the response contains user data
          console.log('User details:', response.data.user); // Print user details on console

          // Redirect based on user role
          if (response.data.user.role === 'productAdmin') {
            router.push('/companies'); // Redirect to Companies page for Product Admin
          } else if (response.data.user.role === 'companyAdmin') {
            router.push('/employees'); // Redirect to Employees page for Company Admin
          }
        })
        .catch(() => {
          logout(); // If validation fails, logout
        });
    } else if (window.location.pathname !== '/login') {
      router.push('/login');
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Check for fixed product admin credentials
      if (email === 'admin@reimburse.com' && password === 'admin2311') {
        const user = {
          email: 'admin@reimburse.com',
          name: 'Product Admin',
          role: 'productAdmin',
        };
        const token = 'fixed-token'; // You may want to create a fixed token or use JWT generation here
        localStorage.setItem('token', token);
        setUser(user);
        console.log('User logged in:', user); // Print user details when logging in
        router.push('/companies'); // Redirect to Companies page for Product Admin
        return true;
      }

      // For other users, call the API
      const response = await api.post('/login', { email, password });
      const { token, user: loggedInUser } = response.data;
      localStorage.setItem('token', token);
      setUser(loggedInUser);
      console.log('User logged in:', loggedInUser); // Print user details when logging in

      // Redirect based on user role
      if (loggedInUser.role === 'companyAdmin') {
        router.push('/mycompany'); // Redirect to Employees page for Company Admin
      } else {
        router.push('/dashboard'); // Default redirect for other roles
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
