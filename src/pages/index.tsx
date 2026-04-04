import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#F4F6F9',
      color: '#1A3C6E'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: '10px' }}>Insurixa Admin Panel</h1>
        <p>Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
