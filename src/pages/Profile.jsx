import { faEnvelope, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect, useState } from "react"
import { getUserProfile } from "../firebase"
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router";


function Profile() {
  const [userProfile, setUserProfile] = useState();
  const {currentUser, signOutUser} = useContext(AuthContext);
  const navigateTo = useNavigate();


  useEffect(() =>{
    const fetchProfile = async (uid) => {
      try {
        const profile = await getUserProfile(uid);
         

        
        setUserProfile(profile)
      } catch (error) { 
        console.error("Error fetching profile: ", error);
        
      }
    }


    if(currentUser) fetchProfile(currentUser.uid);



  },[currentUser])

  if(!currentUser) navigateTo('/register')
  
  if(userProfile) return (
    <div>
      <h1 className="text-3xl font-bold p-4">Your Profile</h1>

        <div className="w-[80%] mx-auto">
          
          <div className="flex items-center gap-2 p-2 border border-gray-200 m-2 bg-gray-100 rounded">
            <FontAwesomeIcon icon={faUser}/> 
            <p className="text-slate-400">Name </p>
            {userProfile.firstName} {userProfile.lastName} 
          </div>
          
          <div className="flex items-center gap-2 p-2 border border-gray-200 m-2 bg-gray-100 rounded">
            <FontAwesomeIcon icon={faEnvelope}/> <p className="text-slate-400">Email </p> {userProfile.email}
          </div>
        </div>


        <div className="w-fit mx-auto">
            <button
              onClick={signOutUser} 
              className="text-red-700 font-bold flex gap-3 items-center p-2">
              <FontAwesomeIcon icon={faSignOut}/>
                Sign Out
            </button>
          </div>
    </div>
  )


}

export default Profile