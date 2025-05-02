import UserProfile from "./UserProfile"
import { Link, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useEffect, useState } from "react"
import { supabase } from "../../supabaseclient"

export default function Dashboard({user}) {
  const {signOut} = useAuth()
  const [lobbies, setLobbies] = useState([]);

  useEffect(() => {
    const fetchLobbies = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error getting user:', userError);
        return;
      }
  
      const { data, error } = await supabase
        .from('lobbies')
        .select("*")
        .eq('user_id', user.id);
  
      if (error) {
        console.error('Error fetching lobbies:', error);
      } else {
        setLobbies(data);
      }
    };
  
    fetchLobbies();
  }, []);
  

  return (
    <div className="flex h-screen">
      <div className="w-4/5 bg-blue-200">
        <h1 className="flex justify-center">RiffMatch</h1>
        {/* will display listed lobbies */}

        <div className="flex flex-col justify-items-start items-center h-full gap-2">

        {/* rendering data from lobbies */}

        {lobbies.length === 0 ? (
          <p>Fetching Lobbies...</p>
        ) : (
          <ul>
          {lobbies.map((lobby) => (
            <li key={lobby.id}>
              <strong>{lobby.name}</strong> - {lobby.description}
            </li>
          ))}
        </ul>
        )}
          
        </div>
      </div>

      <div className="w-1/5 bg-green-200 flex flex-col justify-around items-center">

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
