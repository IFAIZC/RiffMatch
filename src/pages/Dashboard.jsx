import UserProfile from "./UserProfile"
import { Link, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Lobbies from "../components/Lobbies"
import { useState } from "react"

export default function Dashboard({user}) {
  const {signOut} = useAuth()
  const [dropDown,setDropDown] = useState(false)

  function toggleMenu() {
    setDropDown((prev) => !prev)
    // console.log('menu test')
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

        <Lobbies/>
    </div>
  )
}

// <div className="flex h-screen">
//   <div className="w-4/5 bg-blue-200">
//     <h1 className="flex justify-items-start m-1 text-2xl">RiffMatch</h1>
//     {/* will display listed lobbies */}
//     <Lobbies/>
//   </div>

//   <div className="w-1/5 bg-green-200 flex flex-col justify-around items-center">

//   <div className="flex justify-center mb-6">
//       <img
//         src={user?.user_metadata?.picture}
//         alt=""
//         className="rounded-full w-32 h-32 object-cover border-4 border-blue-500"
//       />
//     </div>

//   <p className="text-xl font-semibold text-center">{user?.user_metadata?.name}</p>

//     <button onClick={signOut} className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600">Log Out</button>

//     <Link to={"/lobbyCreation"}>
//           <button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-md">Create Lobby</button>
//     </Link>
//   </div>
// </div>