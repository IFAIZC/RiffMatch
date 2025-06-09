import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function UserProfile({ user }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar user={user} />
      <div className="flex-1 flex flex-col justify-center items-center">
        {/* Profile content */}
        <div className="justify-center items-center flex flex-col flex-1">
          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <img
              src={user?.user_metadata?.picture}
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/user_default.png";
              }}
              className="rounded-full w-32 h-32 object-cover"
            />
          </div>

          {/* Username */}
          <div className="mb-4 text-center">
            <p className="text-xl font-semibold">{user?.user_metadata?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
