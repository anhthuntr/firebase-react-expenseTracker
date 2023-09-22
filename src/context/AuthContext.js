import React, { useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const UserContext = React.createContext();

export const useAuth = () => useContext(UserContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }
    
   const googlesignIn = (email, password) => {
    return signInWithPopup(auth, googleProvider);
   }

  const logout = async () => {
    await signOut(auth);
    localStorage.clear();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          currentUser,
          uid: currentUser.uid,
          email: currentUser.email,
      });
      } else {
        console.log("User not logged in");
        setUser(null);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const contextValue = {
    createUser,
    signIn,
    user,
    logout,
    googlesignIn,
  }

  return (
    <UserContext.Provider value={contextValue}>
      {!loading && children}
    </UserContext.Provider>
  );
};
