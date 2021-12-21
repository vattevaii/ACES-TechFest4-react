import { Outlet, Navigate } from "react-router-dom";
import { useStateValue } from '../states/userProvider'

function PRoute() {
   const { user } = useStateValue()[0];
   console.log(useStateValue())
   return user ? <Outlet /> : <Navigate replace to="/login" />
}

export default PRoute;

