import React, { useState } from "react";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "./firebase/firebase-config";
import { GoogleAuthProvider } from "firebase/auth";
import "../src/App.css";
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const App = () => {
   const [user, setUsers] = useState(null);
   console.log(user);

   const handleWithGoogle = () => {
      signInWithPopup(auth, googleProvider)
         .then((result) => {
            const googleUser = result.user;
            setUsers(googleUser);
         })

         .catch((err) => {
            console.log("error", err.message);
         });
   };

   const handleSignOut = () => {
      signOut(auth)
         .then((result) => {
            console.log(result);
            setUsers(null);
         })
         .catch((err) => {
            console.log(err);
         });
   };
   return (
      <div>
         <div>
            <h1>Hello World</h1>

            {user ? (
               <button onClick={handleSignOut}>SignOut</button>
            ) : (
               <button onClick={handleWithGoogle}>Sign with google</button>
            )}
         </div>
         <div>
            <h3>name: {user ? user.displayName : ""}</h3>
            <img src={user ? user.photoURL : ""} alt="" />
            <p>{user ? user.email : ""}</p>
         </div>
      </div>
   );
};

export default App;
