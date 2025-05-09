import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserProfile({user}) {
  // Sample initial data (this could come from a database or API)
  const [profileData, setProfileData] = useState({
    bio: "This is the bio",
    mainInstrument: "Guitar",
    favSong: "Song Title",
  });

  // State to track whether the user is editing
  const [isEditing, setIsEditing] = useState(false);

  // Handlers for toggling edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // In a real-world scenario, you might want to send the updated data to a server here
    console.log("Saving changes:", profileData);
  };

  // Input change handlers for updating profile data
  function handleChange(e, field) {
    setProfileData({ ...profileData, [field]: e.target.value });
  }

  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-gray-100">
      <div className="max-w-lg w-full mx-auto p-6 bg-white rounded-lg shadow-lg">

        {/* the home button */}
        <div className="flex justify-end">
          {isEditing ? 
          null :
          <Link to={"/dashboard"}>
            <button className="bg-red-500 text-white px-3 py-1 rounded-md ">X</button>
          </Link> 
          }
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={user?.user_metadata?.picture}
            alt=""
            className="rounded-full w-32 h-32 object-cover"
          />
        </div>

        {/* Username */}
        <div className="mb-4 text-center">
            <p className="text-xl font-semibold">{user?.user_metadata?.name}</p>
        </div>

        {/* Bio */}
        <div className="mb-4 text-center">
          {isEditing ? (
            <textarea
              value={profileData.bio}
              onChange={(e) => handleChange(e, "bio")}
              className="border-2 border-gray-300 p-2 rounded-md w-full h-32 mb-4"
            />
          ) : (
            <p className="text-gray-700">{profileData.bio}</p>
          )}
        </div>

        {/* Main Instrument */}
        <div className="mb-4 text-center">
          {isEditing ? (
            <input
              type="text"
              value={profileData.mainInstrument}
              onChange={(e) => handleChange(e, "mainInstrument")}
              className="border-2 border-gray-300 p-2 rounded-md w-full mb-4"
            />
          ) : (
            <p className="text-gray-700">{profileData.mainInstrument}</p>
          )}
        </div>

        {/* Favorite Song */}
        <div className="mb-4 text-center">
          {isEditing ? (
            <input
              type="text"
              value={profileData.favSong}
              onChange={(e) => handleChange(e, "favSong")}
              className="border-2 border-gray-300 p-2 rounded-md w-full mb-4"
            />
          ) : (
            <p className="text-gray-700">{profileData.favSong}</p>
          )}
        </div>

        {/* Edit/Save Button */}
        <div className="flex justify-center">
          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
