import { useEffect, useState } from "react";
import { supabase } from "../../supabaseclient";

export default function Lobbies({user}) {
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
          .order('created_at', {ascending: false})
    
        if (error) {
          console.error('Error fetching lobbies:', error);
        } else {
          setLobbies(data);
        }
      };
    
      fetchLobbies();
    }, []);

    return (
      <div className="flex flex-col items-center justify-center h-screen px-4 py-4">
        {lobbies.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full">
            <span className="loading loading-infinity loading-xl"></span>
          </div>
        ) : (
          <div className="overflow-y-auto w-full max-w-3xl h-full space-y-4 mb-15">
            {lobbies.map((lobby) => (
              <div
                key={lobby.id}
                className=" p-6 rounded-2xl bg-base-300 shadow-md"
              >

                {/* redo! please fetch the real owner of lobbies, not the current auth user!!!! take note */}
                <div role="button" className="btn btn-ghost btn-circle avatar mb-2">
                  <div className="w-10 rounded-full">
                    <img
                    src={user?.user_metadata?.picture || "/user_default.png"}
                    alt="user-profile"
                    className="rounded-full w-10 h-10 object-cover"
                    />
                  </div>
                </div>

                {/* to add user name and user picture */}

                <div className="mb-8">
                  <strong className="block text-lg font-bold">{lobby.name}</strong>
                  <p className="text-sm break-words max-w-4/6">{lobby.description}</p>
                </div>

                <div className="flex flex-row justify-between items-center">
                  <p className="text-sm break-words">Genre : {lobby.genre}</p>
                  <p className="text-sm break-words">Skill Level : {lobby.skill}</p>
                  <p className="text-sm break-words">Open Role : {lobby.roles}</p>
                  <button className="btn btn-accent">Join Lobby</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}