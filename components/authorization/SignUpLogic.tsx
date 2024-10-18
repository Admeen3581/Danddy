"use client";

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateDatabaseRoute } from '@/utils/httpRequester';
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

      // Update the database with additional user data
      await updateDatabaseRoute(`/users/${userData.username}`, {
        ...userData,
        uid: user.uid
      });

      alert('Sign-up successful!');
    } catch (error) {
      console.error('Failed to sign up:', error);
      setError('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
      <section className='flex-center size-full max-sm:px-6 min-h-screen'>
        <SignUpForm type="sign-up" />
      </section>
  );
}