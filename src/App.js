import { React, useState } from "react";
import './App.css';
import Home from "./pantallas/home";
import Login from "./pantallas/Login";
import Fireapp from "./firebase/credenciales";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import 'bootstrap/dist/css/bootstrap.min.css';
const auth = getAuth(Fireapp);
function App() {
  const [user, setuser] = useState(null);
    onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setuser(usuarioFirebase);
      }else{
        setuser(null);
      }
    });
  return (
    <>
      {user? < Home /> : < Login/> }
    </>
  );
}

export default App;
