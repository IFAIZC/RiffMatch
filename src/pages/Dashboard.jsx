import UserProfile from "./UserProfile"
import { Link, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Lobbies from "../components/Lobbies"
import { useState } from "react"

export default function Dashboard({user}) {
  const {signOut} = useAuth()
  const [dropDown,setDropDown] = useState(false)

  // drop down menu on profile
  function toggleMenu() {
    setDropDown((prev) => !prev)
  }
  
  return (
    <div className="h-screen overflow-y-hidden ">
      <div className="flex flex-row justify-between m-2">

        <div className="text-2xl">RIFFMATCH</div>

        <div className="flex gap-2">
          <Link to={"/lobbyCreation"}>
           <button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-2xl">Create Lobby</button>
          </Link>

          <div className="relative">
            <button className="cursor-pointer" onClick={toggleMenu}>
              <img
              src={user?.user_metadata?.picture}
              alt=""
              className="rounded-full w-10 h-10 object-cover"
              />
            </button>

            {dropDown && (
              <ul className="absolute right-0  w-40 bg-gray-200 shadow-md rounded-lg py-2 z-50">
              <Link to={"/userprofile"}>
              <li className="px-4 py-2 cursor-pointer">View Profile</li>
              </Link>
              <li className="px-4 py-2 cursor-pointer" onClick={signOut}>Log Out</li>
              </ul>
            )}
          </div>


        </div>
      </div>


        {/* lobbies will appear here */}
        <Lobbies/>
    </div>
  )
}