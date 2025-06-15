import Navbar from "../components/Navbar"
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseclient";

export default function YourLobby({user}) {
  const [lobbies, setLobbies] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchLobbies() {
    const { error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error getting user:", userError);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("lobbies")
      .select("*")
      .eq("user_id" , user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching lobbies:", error);
    } else {
      setLobbies(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchLobbies();
  }, []);

  // i have to link this with a supabase delete logic
  async function deleteLobby(lobbyId) {
    const {error} = await supabase
      .from("lobbies")
      .delete()
      .eq('id', lobbyId)

      if (error) {
        console.error("Error deleting your lobby:", error);
      } else {
        console.log("Lobby has been deleted!")
        fetchLobbies();
      }
  }
  
  return (
    <div className="flex flex-col h-screen overflow-hidden">
          <Navbar user={user} />
          <div className="flex-1 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-center h-screen px-4 py-4">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      ) : lobbies.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <span className="text-lg ">You haven't create your lobbies yet.</span>
        </div>
      ) : (
        <div className="overflow-y-auto min-w-3xl h-full space-y-4 mb-15">
          {lobbies.map((lobby) => (
            <div
              key={lobby.id}
              className=" p-6 rounded-2xl bg-base-300 shadow-md"
            >

              <div className="mb-8">
                <strong className="block text-lg font-bold">
                  {lobby.name}
                </strong>
                <p className="text-sm break-words max-w-2xl">
                  {lobby.description}
                </p>
              </div>

              <div className="flex flex-row justify-between items-center">
                <p className="text-sm break-words">Genre : {lobby.genre}</p>
                <p className="text-sm break-words">Skill Level : {lobby.skill}</p>
                <p className="text-sm break-words">Open Role : {lobby.roles}</p>
                <button className="btn btn-error" onClick={()=> deleteLobby(lobby.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>
  )
}