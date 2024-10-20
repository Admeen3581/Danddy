"use client";

/*Everything here is from the previous files, feel free to remove Roman -Adam*/

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateDatabaseRoute } from '@/utils/httpRequester';
import { auth } from '@/firebaseConfig';
import AuthForm from './AuthForm';
import { User } from './User';
import useLocalStore from '@/utils/store';

export default function SignUpLogic() {
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

//Frontend
  return (
      <section className='flex-center size-full max-sm:px-6 min-h-screen'>
        <AuthForm type="sign-up" />
      </section>
  );
};

export default SignUp;