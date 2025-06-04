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
      <div className="flex flex-col items-center justify-center h-screen px-4 py-6">
        {lobbies.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full">
            <span className="loading loading-infinity loading-xl"></span>
          </div>
        ) : (
          <div className="overflow-y-auto w-full max-w-3xl h-full space-y-4">
            {lobbies.map((lobby) => (
              <div
                key={lobby.id}
                className=" p-6 rounded-2xl bg-base-200 shadow-md"
              >
                <strong className="block text-lg font-semibold mb-2">{lobby.name}</strong>
                <p className="text-gray-700 mb-4 break-words">{lobby.description}</p>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                  Join Lobby
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}