import { useState } from "react";
import { supabase } from "../../supabaseclient";
import { Link, Outlet } from "react-router-dom"

export default function LobbyCreation() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [genre,setGenre] = useState('')
  const [skill,setSkill] = useState('')
  const [roles,setRoles] = useState([]) // changing this to an array, please fix this to make users select more than 1 role and store it. push it to supabase

  async function createLobby() {
    // basic handling edge cases * need to improve this soon.
    if (!name || !description || !genre || !skill || roles.length === 0) {
      alert("Please fill in all fields before publishing the lobby.");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    const {data,error} = await supabase
    .from('lobbies')
    .insert([
      {
      user_id : user.id,
      name,
      description,
      genre,
      skill,
      roles,
    },
  ]);

  if (error) {
    console.error('Error creating lobby', error);
  }
  else {
    setName('');
    setDescription('');
    setGenre('');
    setSkill('');
    setRoles('');
    console.log('Lobby created', data);
    window.location.href = '/dashboard'; // use this to redirect after a successful log!
    }
  };

  function submitGenre(e) {
    setGenre(e.target.value)
  }

  function submitSkillLevel(e) {
    setSkill(e.target.value)
  }

  function submitRoles(e) {
    setRoles(e.target.value)
  }

  return(
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br ">
      <div className="bg-base-300 rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6 justify-center items-center">
        <h2 className="text-2xl font-bold text-center mb-4">Create Lobby</h2>

        {/* x button */}
          {/* <Link to={"/dashboard"}>
            <button className="bg-red-500 text-white px-3 py-1 rounded-md ">X</button>
          </Link>  */}

        {/* lobby name */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Lobby Name"
          className="input input-primary"
        />

        {/* genre name */}
        <select id="genre" name="genre" onChange={submitGenre} className="select select-primary">
          <option value="" disabled selected hidden>Select Your Genre</option>
          <option value="Indie">Indie</option>
          <option value="Rock">Rock</option>
          <option value="Grunch">Grunch</option>
          <option value="Metal">Metal</option>
        </select>

        {/* skill level */}
        <select id="skill-level" name="skill-level" onChange={submitSkillLevel} className="select select-primary">
          <option value="" disabled selected hidden >Skill Level</option>
          <option value="Begginer">Begginer</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Pro">Pro</option>
        </select>

        {/* core roles */}
        <div className="flex flex-row w-fit flex-wrap gap-3.5 justify-around">
          <label htmlFor="" className="flex gap-2 p-1.5  rounded ">Electric Guitarist
          <input type="checkbox" name="skills" onChange={submitRoles} value="Electric Guitarist"/>        
          </label>
          <label htmlFor="" className="flex gap-2 p-1.5  rounded ">Drummer
          <input type="checkbox" name="skills" onChange={submitRoles} value="Drummer"/>        
          </label>
          <label htmlFor="" className="flex gap-2 p-1.5  rounded ">Bassist
          <input type="checkbox" name="skills" onChange={submitRoles} value="Bassist"/>        
          </label>
          <label htmlFor="" className="flex gap-2 p-1.5  rounded ">Vocalist
          <input type="checkbox" name="skills" onChange={submitRoles} value="Vocalist"/>        
          </label>
          <label htmlFor="" className="flex gap-2 p-1.5  rounded ">Acoustic Guitarist
          <input type="checkbox" name="skills" onChange={submitRoles} value="Acoustic Guitarist"/>        
          </label>
          <label htmlFor="" className="flex gap-2 p-1.5  rounded ">Pianist
          <input type="checkbox" name="skills" onChange={submitRoles} value="Pianist"/>        
          </label>
        </div>


        {/* lobby description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="textarea textarea-primary"
        ></textarea>
        <button
          onClick={createLobby}
          className="btn btn-primary"
        >
          Publish Lobby
        </button>
      </div>
    </div>
  )
}