import { useEffect, useState } from "react";
import { supabase } from "../../supabaseclient";

export default function Lobbies() {
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
    
        if (error) {
          console.error('Error fetching lobbies:', error);
        } else {
          setLobbies(data);
        }
      };
    
      fetchLobbies();
    }, []);


  return (
    <div className="flex flex-col justify-items-start items-center h-full gap-2">
    {/* rendering data from lobbies */}

    {lobbies.length === 0 ? (
      <p>Fetching Lobbies...</p>
    ) : (
      <ul>
      {lobbies.map((lobby) => (
        <li key={lobby.id} className="border-1 m-5 p-10 flex flex-col rounded-2xl">
          <strong>{lobby.name}</strong> - {lobby.description}
          <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
              Join Lobby
            </button>
        </li>
      ))}
    </ul>
    )}
  </div>
  )
}