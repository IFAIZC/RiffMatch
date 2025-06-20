import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "../../supabaseclient";
import Navbar from "./Navbar";

export default function ViewLobby({user}) {
  // params reads the lobbyId via URL
  const { lobbyId } = useParams();

  // we use null and not [] since we are expecting objects and not arrays, since we only expect a single obj.
  const [lobby, setLobby] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetching lobby accordingly to Params
  useEffect(() => {
    const fetchLobby = async () => {
      const { error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error getting user:", userError);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("lobbies")
        .select("*")
        .eq("id", lobbyId)
        .single();

      if (error) {
        console.error("Error fetching lobby:", error);
      } else {
        setLobby(data);
      }
      setLoading(false);
    };
    fetchLobby();
  }, [lobbyId]);

  // join lobby function (send user details to supabase)
  // async function joinLobby(lobbyId) {
  //   const { data: { user } } = await supabase.auth.getUser();
  //   const {data,error} = await supabase
  //   .from("lobbyMembers")
  //   .insert([
  //     {
  //     user_id : user.id,
  //     lobby_id: lobbyId,
  //     user_name: user.user_metadata.name,
  //     user_picture: user.user_metadata.picture,
  //     },
  //   ]);

  //   if(error) {
  //     console.error("Error on joining the lobby" , error )
  //   } else {
  //     console.log("You have successfully join the lobby!", data )
  //   }
  // }


  return (
    <div className="h-screen overflow-hidden flex flex-col">
        <Navbar user={user}/>
        {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
        // to check if lobby is existed or not. (edge cases handled)
      ) : lobby === null ? (
        <div className="flex items-center justify-center w-full h-full">
          <span className="text-lg ">This lobby does not exist!</span>
        </div>
      ) : (
        <div className="flex mt-10 justify-start items-center flex-col min-h-screen gap-10">
          <div className="flex flex-row gap-5 justify-center items-center">
            <img
              src={lobby.creator_picture || "/user_default.png"}
              alt="user-profile"
              className="rounded-full w-10 h-10 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/user_default.png";
              }}
            />
            <h1>{lobby.creator_name || "Unknown User"}</h1>
          </div>
          <div className="flex flex-row gap-5 ">
            <p>{lobby.name}</p>
            <p>{lobby.description}</p>
            <p>Genre : {lobby.genre}</p>
            <p>Skill : {lobby.skill}</p>
            <p>Open Role : {lobby.roles}</p>
          </div>

            {/* to add onClick function */}
            {/* send data to supabase for joined users */}
            {/* display users who clicked join */}
          <button className="btn btn-soft btn-accent max-w-40">Join Lobby</button>
        </div>
      )}
    </div>
  );
}