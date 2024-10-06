"use client";

import { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import styles from './SignIn.module.css';
import InputField from '../SignUp/InputField';

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Sign in with Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
      alert('Sign-in successful!');
      router.push('/'); // Redirect to the original page (home page in this case)
    } catch (error) {
      console.error('Failed to sign in:', error);
      setError('Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={setEmail}
          required
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
          required
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}