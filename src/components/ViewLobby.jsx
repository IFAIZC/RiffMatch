import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "../../supabaseclient";

export default function ViewLobby() {
  // params reads the lobbyId via URL
  const { lobbyId } = useParams();

  // we use null and not [] since we are expecting objects and not arrays, since we only expect a single obj.
  const [lobby, setLobby] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!lobby) {
    return <div>Lobby not found.</div>;
  }

  return (
    <div>
      <h1>{lobby.creator_name || "Unknown User"}</h1>
      <img
        src={lobby.creator_picture || "/user_default.png"}
        alt="user-profile"
        className="rounded-full w-10 h-10 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/user_default.png";
        }}
      />
    </div>
  );
}