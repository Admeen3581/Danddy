"use client";

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateDatabaseRoute } from '@/utils/httpRequester';
import { auth } from '@/firebaseConfig';
import styles from './SignUp.module.css';
import SignUpForm from './SignUpForm';
import { User } from './User';
import useLocalStore from '@/utils/store';

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const setUserId = useLocalStore((state) => state.setUserId); // Get the setUserId function from the store

  const handleSubmit = async (userData: User) => {
    setError(null);
    setLoading(true);

    try {
      // Create user with Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;

      // Save the uid locally
      setUserId(user.uid);

      // Update the database with additional user data
      await updateDatabaseRoute(`/users/${userData.username}`, {
        ...userData,
        uid: user.uid
      });

    } catch (error) {
      console.error('Failed to sign up:', error);
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
};

export default SignUp;