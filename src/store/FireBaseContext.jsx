import { createContext, useState } from "react";

export const FireBaseContext=createContext(null)
export const AuthContext=createContext(null)

export  function Context({children}){
    const [userStatus,setuserStatus]=useState('')
    return(
        <AuthContext.Provider value={{userStatus,setuserStatus}}>
            {children}
        </AuthContext.Provider>
    )

}