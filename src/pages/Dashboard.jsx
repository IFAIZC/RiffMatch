import UserProfile from "./UserProfile"
import { Link } from "react-router-dom"

export default function Dashboard() {
  return (
    <div>
      <h1>dashboard on the left section.</h1>
      <h1>create lobby button on the bottom right</h1>
      <div >
        <Link to={"/userprofile"}>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md">Profile</button>
        </Link>
      </div>
    </div>
  )
}