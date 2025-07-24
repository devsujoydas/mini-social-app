import React, { useContext, useEffect } from 'react'

import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider/AuthProvider'
import Loading from '../../Components/Loading/Loading'

const PrivateRoutes = ({ children }) => {
    const { user, loading, storedEmail } = useContext(AuthContext)
    const location = useLocation()


    


    if (user) {
        return children
    }

    return <Navigate state={location.pathname} to={'/login'}  ></Navigate>
}

export default PrivateRoutes