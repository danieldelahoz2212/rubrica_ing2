import React from "react";
import Home from "./pantallas/Home";
import Login from "./pantallas/Login";
import Register from "./vistas/Register";
import { getAuth, onAuthStateChanged ,signOut} from "firebase/auth"
import { getFirestore, doc ,getDoc } from "firebase/firestore";
import Fireapp from "./firebase/credenciales";
import {BrowserRouter as Router,Routes,Route,Link,NavLink} from "react-router-dom";
const auth = getAuth(Fireapp);
const firestore = getFirestore(Fireapp);

function App() {
  const [User, setUser] = React.useState(null);

  async function rol(uid) {
    const docuRef = doc(firestore,  `/usuarios/${uid}`);
    const docuC = await getDoc(docuRef);
    const InfoF = docuC.data().rol;
    return InfoF;
  }

  function userINfo (usuarioFirebase){
    rol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
    } );
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
  if (usuarioFirebase) {
    if (!User) {
      userINfo(usuarioFirebase);
    }
  } else {
      setUser(null);
  }
  });
  return (
      <Router>
        <>
        <div className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <ul className="navbar-nav mr-auto">
            <li className='btn btn-dark btn-sm mx-1'><Link to="/home" className='nav-link' >Inicio</Link></li>
            <li className='btn btn-dark btn-sm mx-1'><Link to='/login' className='nav-link'>Inisiar Sesion</Link></li>
            <li className='btn btn-dark btn-sm mx-1'><Link to='/register' className='nav-link'>Registrarse</Link></li>
            <li className='btn btn-dark btn-sm mx-1'><Link to='/' className='nav-link'>nosotros</Link></li>
            {
              User? <button className="btn btn-dark btn-sm  float-right mx-1" onClick={ () => signOut(auth) }>Cerrar Sesion</button> : ""
            }
          </ul>
        </div>
      <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
      </Routes>
        </>
      </Router>
        
  );
}

export default App;
