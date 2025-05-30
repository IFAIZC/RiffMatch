import UserProfile from "./UserProfile"
import { Link, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Lobbies from "../components/Lobbies"

export default function Dashboard({user}) {
  const {signOut} = useAuth()
  
  return (
    // might need to remove this, changing from veritcal scrolling to horizantal!!
    <div className="h-screen overflow-y-hidden ">

    <div className="navbar bg-base-200 shadow-sm">

      <div className="flex-1">
        <a className="btn btn-ghost text-xl rounded-xl">RIFFMATCH</a>
      </div>

      <div className="flex-none">
          <Link to={"/lobbyCreation"}>
            <button className="btn btn-primary rounded-xl">Create Lobby</button>
          </Link>
          
          <div className="dropdown dropdown-end ml-3">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">

              <div className="w-10 rounded-full">
                <img
                src={user?.user_metadata?.picture}
                alt="user-profile"
                className="rounded-full w-10 h-10 object-cover"
                />
              </div>

            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">

              <Link to={"/userprofile"}>
                <li>
                  <a className="justify-between">
                    Profile
                  </a>
                </li>
              </Link>
              {/* <li><a>Settings</a></li> */}
              <li><a onClick={signOut}>Logout</a></li>
            </ul>

          </div>
        </div>
      </div>

      {/* lobbies will appear here */}
      <Lobbies/>
    </div>
  )
}