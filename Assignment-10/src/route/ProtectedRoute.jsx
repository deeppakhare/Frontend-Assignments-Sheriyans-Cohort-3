import React, { useContext } from 'react' 
import {Outlet, Navigate} from "react-router"
import { MyStore } from '../context/MyContext'

const ProtectedRoute = () => {
  let { currentUser } = useContext(MyStore);

  if(!currentUser){
    return <Navigate to={"/"}/>
  }

  return <Outlet />
}

export default ProtectedRoute
