import {useAuth} from "../../context/authContext";
import {useHistory} from "react-router-dom";

export function ProtectedRoute({children}){
  const {user, loading} = useAuth()
  const history = useHistory()
  if(loading) return <h1>Loading...</h1>
  if(!user) return history.push("/")

  return <>{children}</>

}