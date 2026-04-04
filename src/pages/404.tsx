import React from 'react';
import Link from 'next/link';
import { Home, MoveLeft, HelpCircle } from 'lucide-react';
import Button from '@/components/Button';

const NotFoundPage = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F4F6F9',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'var(--font-inter)'
    }}>
      <div style={{ fontSize: '10rem', fontWeight: 800, color: '#1A3C6E', opacity: 0.1, position: 'absolute', zIndex: 0 }}>404</div>
      
      <div style={{ zIndex: 1, position: 'relative' }}>
         <div style={{ 
            width: '80px', 
            height: '80px', 
            background: 'white', 
            borderRadius: '20px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 30px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
         }}>
            <HelpCircle size={40} color="#FF6B35" />
         </div>
         
         <h1 style={{ fontSize: '2.5rem', color: '#1A3C6E', marginBottom: '15px', fontFamily: 'var(--font-poppins)' }}>Page Not Found</h1>
         <p style={{ color: '#718096', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 40px' }}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
         </p>
         
         <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <Link href="/dashboard" passHref>
               <Button leftIcon={<Home size={18} />}>Back to Dashboard</Button>
            </Link>
            <Button variant="outline" leftIcon={<MoveLeft size={18} />} onClick={() => window.history.back()}>
               Go Back
            </Button>
         </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
