import { useEffect } from "react"
import { useAuth } from "../../context/authContext"
import { useNavigate } from "react-router-dom"


export default function Upload() {
  const {isAuthenticated} = useAuth()
  console.log(isAuthenticated)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  })
  return <div>You are Authenticated sir!</div>
}