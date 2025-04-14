import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);


export const addUser = async (uid, firstName, lastName, email ) => {
    
    console.log(uid, firstName, lastName, email );
    const docRef = await setDoc(doc(db, "users", uid), { uid, firstName, lastName, email, createdAt: new Date()})
    console.log(docRef);
        
}



export const updateUser = async (docId, ...updates) => {
    const userRef = doc(db, "users", docId);
    await updateDoc(userRef, ...updates)
}


export const deleteUser = async (docId) =>{
    const userRef = doc(db, "users", docId);
    await deleteDoc(userRef)
}








// ✅ Add to subcollection
export const addToSubCollection = async (userId, subName, item) => {
  try {
    const subCollectionRef = collection(db, "users", userId, subName);
    const newDocRef = await addDoc(subCollectionRef, item);
    await updateDoc(newDocRef, { docId: newDocRef.id });
  } catch (error) {
    console.error("Error adding to sub-collection:", error);
  }
};

// ✅ Update a document in subcollection
export const updateSubCollection = async (userId, subName, docId, updateData) => {
  try {
    const docRef = doc(db, "users", userId, subName, docId);
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error("Error updating sub-collection document:", error);
  }
};


// ✅ Remove from subcollection
export const removeFromSubCollection = async (userId, subName, docId) => {
  try {
    const docRef = doc(db, "users", userId, subName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error removing from sub-collection:", error);
  }
};

// ✅ get subcollection
export const getSubCollection = async (userId, subName) =>{
  const docSnap = await getDocs(collection(db,"users", userId, subName))
  const data = []
  docSnap.forEach(d => data.push(d.data()));
    
  return data

}

export const getCartTotal = async (userId) =>{
  const docSnap = await getDocs(collection(db,"users", userId, 'cart'))
  const data = []
  docSnap.forEach(d => data.push(d.data()));
    
  const total = data.reduce((acc, p) => acc + p.total, 0);;
  return Number(total.toFixed(2));

}


export const getUserProfile = async (userId) =>{
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return docSnap.data();

}
  



export {db, app}