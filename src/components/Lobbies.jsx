import { useEffect, useState } from "react";
import { supabase } from "../../supabaseclient";

export default function Lobbies() {
  const [lobbies, setLobbies] = useState([]);
  
    useEffect(() => {
      const fetchLobbies = async () => {
        const { error: userError } = await supabase.auth.getUser();
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

    // pls redo this lobby UI layout
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    {/* rendering data from lobbies */}

    {lobbies.length === 0 ? (
      <div className="flex items-center justify-center w-full h-full">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    ) : (
      <ul
        className="flex overflow-x-auto whitespace-nowrap w-full px-4 hide-scrollbar flex-row"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
      {lobbies.map((lobby) => (
        <li key={lobby.id} className="border-1 m-2 p-10 flex flex-col rounded-2xl max-w-90 min-w-90 max-h-120 min-h-120 justify-between ">
          <strong className="break-words w-full">{lobby.name}</strong>
          <span className="break-words w-full overflow-hidden text-ellipsis whitespace-normal">{lobby.description}</span>
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