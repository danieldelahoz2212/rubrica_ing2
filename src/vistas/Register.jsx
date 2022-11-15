import React from 'react'
import Fireapp from '../firebase/credenciales'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore , doc , setDoc } from "firebase/firestore";
const auth = getAuth(Fireapp);
const firestore = getFirestore(Fireapp);

const Register = () => {

    async function register(email, password, rol, user) {
        const infoUser = await createUserWithEmailAndPassword(auth, email, password).then((usuarioFirebase) => {
            return usuarioFirebase;
        });
        const docuRef = doc(firestore, `/usuarios/${infoUser.user.uid}`);
        setDoc (docuRef,{ nombre:user , correo: email , rol:rol });
        
    }

    function submitHandler(e) {
        e.preventDefault();
        const user = e.target.elements.name.value;
        const email =e.target.elements.email.value;
        const password = e.target.elements.pass.value;
        const rol = "user";
        register( email,password,rol,user);
    }
    return (
        <>
            <div>
                <div className='row justify-content-center pt-5 mt-5'>
                    <div className="col-md-4 col-sm-6 xl-6 col-lg-4 rounded formulario">
                        <form className="border p-3 form rounded" onSubmit={submitHandler} >
                            <div className="form-group text-center text-light">
                                <label >Usuario:</label>
                                <input className="form-control" id='name' type="name" name="usuario" placeholder="Ingrese Usuario"></input>
                            </div>
                            <div className="form-group text-center text-light">
                                <label >Correo:</label>
                                <input className="form-control" id='email' type="email" name="correo" placeholder="Ingrese Su Correo"></input>
                            </div>
                            <div className="form-group text-center text-light">
                                <label>Contraseña:</label>
                                <input className="form-control" id='pass' type="password" name="contraseña" placeholder="Ingrese Contraseña"></input>
                            </div >
                            <div className='pt-2 text-center'>
                                <input className="btn btn-dark btn-sm mx-1 ingresar" id='reg-sec' type="submit" name="Register" value="Registrarse"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register