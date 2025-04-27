import UserProfile from "./UserProfile"
import { Link, Outlet } from "react-router-dom"

export default function Dashboard() {
  return (
    <div class="flex h-screen">
      <div class="w-4/5 bg-blue-200">
        <h1 className="flex justify-center">RiffMatch</h1>
        {/* will display listed lobbies */}
        <Outlet/>
      </div>

      <div class="w-1/5 bg-green-200 flex flex-col justify-around items-center">
        <Link to={"/userprofile"}>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md">Profile</button>
        </Link>

        <Link to={"/login"}>
            <button className="rounded-md px-6 py-2 bg-blue-500 text-white ">Log Out</button>
        </Link>


        <Link to={"/createLobby"}>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md">Create Lobby</button>
        </Link>
      </div>
    </div>
  )
}
