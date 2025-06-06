import Lobbies from "../components/Lobbies"
import Navbar from "../components/Navbar"

export default function Dashboard({ user }) {
  
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Navbar user={user}/>
      <Lobbies user={user}/>
    </div>
  )
}