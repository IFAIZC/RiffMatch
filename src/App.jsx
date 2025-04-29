import './App.css'
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login'
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';
import LobbyCreation from './pages/LobbyCreation';
import { Auth, SignIn } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../supabaseclient';
import { useEffect } from 'react';

function App() {

  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
    };

  const signUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  if (!session) {
    return (
      <>
      {/* (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)  */}
      <button onClick={signUp}>Sign In With Google</button>
      </>
    )
  }
  else {
    return (<div>
      <h2>Welcome, {session?.user?.email}</h2>
      <button onClick={signOut}>Log Out</button>
      </div>)
  }

  // return (
  //     <Routes>
  //       <Route path='/login' element={<Login/>}></Route>
  //       <Route path='/signUp' element={<SignUp/>}></Route>

  //       <Route path='/dashboard' element={<Dashboard/>}></Route>
  //       <Route path='/userprofile' element={<UserProfile/>}></Route>
  //       <Route path='/lobbycreation' element={<LobbyCreation/>}></Route>
  //     </Routes>
  // )
}

export default App
