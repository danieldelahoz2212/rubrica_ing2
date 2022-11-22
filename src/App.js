import React from "react";
import Home from "./pantallas/home";
import Login from "./pantallas/Login";
import Register from "./vistas/Register";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Fireapp from "./firebase/credenciales";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
const auth = getAuth(Fireapp);
const firestore = getFirestore(Fireapp);

function App() {
  const [User, setUser] = React.useState(null);

  async function rol(uid) {
    const docuRef = doc(firestore, `/usuarios/${uid}`);
    const docuC = await getDoc(docuRef);
    const InfoF = docuC.data().rol;
    return InfoF;
  }

  function userINfo(usuarioFirebase) {
    rol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
    });
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
        <div className='navbar navbar-expand-lg navbar-dark bg-dark container-fluid'>
          <a className="navbar-brand" href="/home">Tecnolearning</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto navbar-nav">
              <li className='btn btn-dark btn-sm mx-1 '>
                <div className='nav-link active'>
                  <Link to='/home' className='nav-link'>Inicio</Link>
                </div>
              </li>
              <li className='btn btn-dark btn-sm mx-1'>
                <div className='nav-link active'>
                  <Link to='/login' className='nav-link'>Inisiar Sesion</Link>
                </div>
              </li>
              <li className='btn btn-dark btn-sm mx-1'>
                <div className='nav-link active'>
                  <Link to='/register' className='nav-link'>Registrarse</Link>
                </div>
              </li>
              <li className='btn btn-dark btn-sm mx-1'>
                <div className='nav-link active'>
                  <Link to='/' className='nav-link'>nosotros</Link>
                </div>
              </li>
              {
                User ? <button className="btn btn-dark btn-sm  float-right mx-1" onClick={() => signOut(auth)}>Cerrar Sesion</button> : ""
              }
            </ul>
          </div>
        </div>
        <Routes>
          <Route path="/home" element={<Home user={User}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </>
    </Router>
  );

}

export default App;
