import { firebase, googleAuthProvider } from "../firebase/firebase";

export const login = (uid, displayName) => ({
  type: "LOGIN",
  uid,
  displayName,
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
