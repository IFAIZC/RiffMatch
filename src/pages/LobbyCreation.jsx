import { useState } from "react";
import { supabase } from "../../supabaseclient";

export default function LobbyCreation() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function createLobby() {
    const { data: { user } } = await supabase.auth.getUser();
    const {data,error} = await supabase
    .from('lobbies')
    .insert([
      {
      user_id : user.id,
      name,
      description,
    },
  ]);

  if (error) {
    console.error('Error creating lobby', error);
  }
  else {
    setName('');
    setDescription('');
    console.log('Lobby created', data);
    }
  };

  return(
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white/80 rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Create Lobby</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Lobby Name"
          className="border border-blue-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border border-blue-300 rounded-md px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <button
          onClick={createLobby}
          className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-md font-semibold shadow-md transition-all duration-150"
        >
          Publish Lobby
        </button>
      </div>
    </div>
  )
}