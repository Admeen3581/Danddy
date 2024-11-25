"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import AuthForm from "./AuthForm";
import useLocalStore from '@/utils/store'; // Import the Zustand store

export default function SignInLogic() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUserId } = useLocalStore();

  const handleSubmit = async (data: { email: string; password: string }) => {
    setError(null);
    setLoading(true);

    try {
      // Sign in with Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Save the uid locally
      setUserId(user.uid);

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
    <section className='flex-center size-full max-sm:px-6 min-h-screen'>
      <AuthForm type="sign-in" onSubmit={handleSubmit} />
      {error && <p className="error-message">{error}</p>}
    </section>
  );
}