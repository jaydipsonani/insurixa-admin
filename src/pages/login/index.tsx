import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Mail, Lock, LogIn, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import styles from './login.module.scss';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const auth = localStorage.getItem('isLoggedIn');
    if (auth === 'true') {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Static credentials check
    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === '123456') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ name: 'Insurixa Admin', role: 'Super Admin', email }));
        toast.success('Successfully logged in!');
        router.push('/dashboard');
      } else {
        toast.error('Invalid email or password');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className={styles.login_container}>
      <Head>
        <title>Login | Insurixa Admin</title>
      </Head>

      <div className={styles.login_card}>
        <div className={styles.card_header}>
          <div className={styles.logo}>
            <ShieldCheck size={32} />
          </div>
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in</p>
        </div>

        <form className={styles.login_form} onSubmit={handleLogin}>
          <div className={styles.form_group}>
            <label htmlFor="email">Email Address</label>
            <div className={styles.input_wrapper}>
              <Mail className={styles.input_icon} size={18} />
              <input
                id="email"
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.form_group}>
            <label htmlFor="password">Password</label>
            <div className={styles.input_wrapper}>
              <Lock className={styles.input_icon} size={18} />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.login_btn}
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
