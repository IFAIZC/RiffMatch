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
    <div className="flex flex-col items-center justify-center h-screen">
    {/* rendering data from lobbies */}

    {lobbies.length === 0 ? (
      <div className="flex items-center justify-center w-full h-full">
        <p>Fetching Lobbies...</p>
      </div>
    ) : (
      <ul className="flex flex-row overflow-x-auto whitespace-nowrap w-full px-4">
      {lobbies.map((lobby) => (
        <li key={lobby.id} className="border-1 m-2 p-10 flex flex-col rounded-2xl max-w-90 min-w-90 max-h-150 min-h-150">
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