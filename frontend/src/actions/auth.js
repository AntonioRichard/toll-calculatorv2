import { firebase, googleAuthProvider } from "../firebase/firebase";

export const login = (uid, displayName, photoURL) => ({
  type: "LOGIN",
  uid,
  displayName,
  photoURL,
});

export const startLoginWithGoogle = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: "LOGOUT",
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
