// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseclient';

export default function useAuth() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      setSession(null); // Clear the session state
      window.location.href = '/'; // Redirect to login page
    }
  };

  const signUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        prompt: 'select_account'
      }
    });
  };

  return { session, signOut, signUp };
}
