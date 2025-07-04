import { useEffect, useState } from "react";
import { supabase } from "../../supabaseclient";
import { Link } from "react-router-dom";

export default function Lobbies() {
  const [lobbies, setLobbies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLobbies = async () => {
      const {error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error getting user:", userError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("lobbies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching lobbies:", error);
      } else {
        setLobbies(data);
      }
      setLoading(false);
    };

    fetchLobbies();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 py-4">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      ) : lobbies.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <span className="text-lg ">No available lobbies</span>
        </div>
      ) : (
        <div className="overflow-y-auto min-w-3xl h-full space-y-4 mb-15">
          {lobbies.map((lobby) => (
            <div
              key={lobby.id}
              className=" p-6 rounded-2xl bg-base-300 shadow-md"
            >
              <div className="flex flex-row items-center gap-2 mb-5">
                <div className="w-10 rounded-full">
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
                <p className="text-sm font-semibold">
                  {lobby.creator_name || "Unknown User"}
                </p>
              </div>

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

                {/* i need to use params here to make the page load dynamically */}
                <Link to={`/viewlobby/${lobby.id}`}>
                  <button className="btn btn-soft btn-accent">View Lobby</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}