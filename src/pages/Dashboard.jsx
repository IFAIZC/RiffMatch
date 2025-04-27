import UserProfile from "./UserProfile"
import { Link } from "react-router-dom"

export default function Dashboard() {
  return (
    <div class="flex h-screen">
      <div class="w-4/5 bg-blue-200">
        <h1>dashboard on the left section.</h1>
      </div>
      <div class="w-1/5 bg-green-200">

        <h1>create lobby button on the bottom right</h1>
        <Link to={"/login"}>
            <button className="rounded-md px-6 py-2 bg-blue-500 text-white ">Log Out</button>
        </Link>

        <Link to={"/userprofile"}>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md">Profile</button>
        </Link>
      </div>
    </div>
  )
}
