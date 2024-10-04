"use client";

import { useState } from 'react';
import { updateDatabaseRoute } from '@/utils/httpRequester';
import styles from './SignUp.module.css';
import SignUpForm from './SignUpForm';
import { User } from './User';

export default function SignUp() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (userData: User) => {
    setError(null);
    setLoading(true);

    try {
      await updateDatabaseRoute(`/users/${userData.username}`, userData);
      alert('Sign-up successful!');
    } catch (error) {
      console.error('Failed to update:', error);
      setError('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      {error && <p className={styles.error}>{error}</p>}
      <SignUpForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}