import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './pages/login'
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';
import LobbyCreation from './pages/LobbyCreation';

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signUp' element={<SignUp/>}></Route>

        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/userprofile' element={<UserProfile/>}></Route>
        <Route path='/lobbycreation' element={<LobbyCreation/>}></Route>


        
      </Routes>
    </>
  )
}

export default App
