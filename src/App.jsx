import { Routes, Route, Navigate } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';
import LobbyCreation from './pages/LobbyCreation';
import useAuth from './hooks/useAuth';
import SignInScreen from './components/SignInScreen';
import YourLobby from './pages/YourLobby';
import ViewLobby from './components/ViewLobby';

function App() {
  const { session, signUp } = useAuth();

  return (
    <Routes>
      {!session ? (
        <Route path="*" element={<SignInScreen onSignUp={signUp} />} />
      ) : (
        <>
          {/* Redirect to Dashboard or any other default page after login */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="/dashboard" element={<Dashboard user={session?.user}/>} />
          <Route path="/userprofile" element={<UserProfile user={session?.user} />} />
          <Route path="/lobbycreation" element={<LobbyCreation user={session?.user}  />} />
          <Route path="/yourlobby" element={<YourLobby user={session?.user}  />} />

          {/* dynamic page view */}
          <Route path="/viewlobby/:lobbyId" element={<ViewLobby user={session?.user}  />} />
          <Route path="*" element={<SignInScreen onSignUp={signUp} />} />
        </>
      )}
    </Routes>
  );
}

export default App;
