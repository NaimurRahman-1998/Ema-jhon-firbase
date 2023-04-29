import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user,loader } = useContext(AuthContext)
    const location = useLocation()
    console.log(location)
    if(loader){
        return <div>loading...</div>
    }
    if (user) {
        return children
    }

    return <Navigate to="/login" state={{from:location}} replace></Navigate>

};

export default PrivateRoute;