import UserProfile from "./UserProfile"
import { Link, Outlet } from "react-router-dom"
import Lobbies from "../components/Lobbies"
import Navbar from "../components/Navbar"

export default function Dashboard() {
  
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Navbar/>
      <Lobbies/>
    </div>
  )
}