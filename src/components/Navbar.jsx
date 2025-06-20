import { Link, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function Navbar({user}) {
  const {signOut} = useAuth()

  return(
    <div className="navbar bg-base-200 shadow-sm">

        <div className="flex-1">
          <Link to={"/dashboard"}>
          <p className="btn btn-ghost text-md font-bold rounded-xl">RIFFMATCH</p>
          </Link>
        </div>

        <div className="flex-none">
            <Link to={"/lobbyCreation"}>
              <button className="btn btn-primary rounded-xl">Create Lobby</button>
            </Link>
            
            <div className="dropdown dropdown-end ml-3">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">

                <div className="w-10 rounded-full">
                  <img
                  src={user?.user_metadata?.picture || "/user_default.png"}
                  alt="user-profile"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/user_default.png";
                  }}
                  className="rounded-full w-10 h-10 object-cover"
                  />
                </div>

              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-45 p-2 shadow">

                <Link to={"/userprofile"}>
                  <li>
                    <p>
                      Profile
                    </p>
                  </li>
                </Link>
                {/* <li><a>Settings</a></li> */}
                <Link to={"/yourlobby"}>
                  <li><p>Your Lobby</p></li>
                </Link>
                <li><a>Requested Lobby</a></li>
                <li><a onClick={signOut}>Logout</a></li>
              </ul>

            </div>
          </div>
      </div>
  )
}