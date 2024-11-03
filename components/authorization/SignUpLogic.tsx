"use client";

import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { updateDatabaseRoute } from '@/utils/httpRequester';
import { auth } from '@/firebaseConfig';
import AuthForm from './AuthForm';
import { User } from './User';
import useLocalStore from '@/utils/store';

export default function SignUpLogic() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const setUserId = useLocalStore((state) => state.setUserId);  // Get the setUserId function from the store

  const handleSubmit = async (values: { email: string; password: string; username?: string; confirmPassword?: string }) => {
    setError(null);
    setLoading(true);

    const userData: User = {
      username: values.username || '',
      email: values.email,
      password: values.password,
      first_joined: new Date().toISOString(),
      last_login: new Date().toISOString(),
      characters: [],
      campaigns: []
    };

    try {
      // Create user with Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;

      // Save the uid locally
      setUserId(user.uid);

      await sendEmailVerification(user);

      // Update the database with additional user data
      await updateDatabaseRoute(`/users/${userData.username}`, {
        ...userData,
        uid: user.uid,
        emailVerified: false
      });

      alert('Sign-up successful! Please check your email to verify your account.');
    } catch (error: any) {
      console.error('Failed to sign up:', error);
      setError('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='flex-center size-full max-sm:px-6 min-h-screen'>
      <AuthForm type="sign-up" onSubmit={handleSubmit} />
      {error && <p className="error-message">{error}</p>}
    </section>
  );
}