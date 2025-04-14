import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "firebase/auth";
import { app, addUser } from "../firebase";


  
  // Initialize Firebase
const auth = getAuth(app);

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);


    
    //Sign Up function
    const signUp =  (firstName, lastName, email, password) => createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
                        
            addUser(user?.uid, firstName, lastName, email)
            localStorage.setItem("userId", JSON.stringify(user.uid))

            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            //add message
            
        });

    //Log in function
    const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      
      //add message
      localStorage.setItem("userId", JSON.stringify(user.uid))
      return true;
    })
    .catch((error) => {
        console.error(error);
        return false;
        //add message

    });

    //Sign out function

    const signOutUser = () => signOut(auth).then(() => { 
        // Sign-out successful.
        localStorage.removeItem("userId")
        setUser(null)
        //add message

      }).catch((error) => {
        console.error(error);
        //add message
        
      });

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) setCurrentUser(user)
            else setCurrentUser(null)
          });
    }, [])
    


    return (
    <AuthContext.Provider value={{signUp, logIn, signOutUser, user, currentUser}}> 
        {children}
    </AuthContext.Provider>
)
}


