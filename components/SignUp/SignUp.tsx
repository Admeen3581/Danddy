"use client";

import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, deleteUser } from 'firebase/auth';
import { updateDatabaseRoute, deleteDatabaseRoute } from '@/utils/httpRequester';
import { auth } from '@/firebaseConfig';
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
      // Create user with Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;
      
      // Send email verification
      await sendEmailVerification(user);

      // Update the database with additional user data
      await updateDatabaseRoute(`/users/${userData.username}`, {
        ...userData,
        uid: user.uid
      });

      alert('Sign-up successful! Please check your email to verify your account.');

      // Set a timeout to check email verification status after a certain period (e.g., 24 hours)
      setTimeout(async () => {
        await user.reload(); // Reload user data
        if (!user.emailVerified) {
          // Delete user from Firebase Authentication
          await deleteUser(user);
          // Delete user data from the database
          await deleteDatabaseRoute(`/users/${userData.username}`);
          console.log('User deleted due to unverified email.');
        }
      }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

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
}