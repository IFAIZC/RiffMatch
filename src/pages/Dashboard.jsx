import UserProfile from "./UserProfile"
import { Link, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Lobbies from "../components/Lobbies"

export default function Dashboard({user}) {
  const {signOut} = useAuth()
  
  return (
    <div className="flex h-screen">
      <div className="w-4/5 bg-blue-200">
        <h1 className="flex justify-items-start m-1 text-2xl">RiffMatch</h1>
        {/* will display listed lobbies */}
        <Lobbies/>
      </div>

      <div className="w-1/5 bg-green-200 flex flex-col justify-around items-center">

      <div className="flex justify-center mb-6">
          <img
            src={user?.user_metadata?.picture}
            alt=""
            className="rounded-full w-32 h-32 object-cover border-4 border-blue-500"
          />
        </div>

      <p className="text-xl font-semibold text-center">{user?.user_metadata?.name}</p>


        <Link to={"/userprofile"}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">Profile</button>
        </Link>

        <button onClick={signOut} className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600">Log Out</button>

        <Link to={"/lobbyCreation"}>
              <button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-md">Create Lobby</button>
        </Link>
      </div>
    </div>
  )
}
