import React from 'react'
import Fireapp from '../firebase/credenciales'
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
const auth = getAuth(Fireapp);

const Login = () => {
    function submitHandler(e) {
        e.preventDefault();
        try{
        const email = e.target.elements.email.value;
        const password = e.target.elements.pass.value;
        signInWithEmailAndPassword(auth,email,password);
    }catch (error){
        console.log(error)
    }
    }

    return (
        <>
            <div>
                <div className='row justify-content-center pt-5 mt-5'>
                    <div className="col-md-4 col-sm-6 xl-6 col-lg-4 rounded formulario">
                        <form className="border p-3 form rounded" onSubmit={submitHandler} >
                            <div className="form-group text-center text-light">
                                <label>Correo:</label>
                                <input className="form-control" id='email' type="text" name="usuario" placeholder="Ingrese email"></input>
                            </div>
                            <div className="form-group text-center text-light">
                                <label>Contraseña:</label>
                                <input className="form-control" id='pass' type="password" name="contraseña" placeholder="Ingrese Contraseña"></input>
                            </div>
                            <div className='pt-2 text-center'>
                                <input className="btn btn-dark btn-sm mx-1 ingresar" id='init-sec' type="submit" name="ingresar" value="Ingresar"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login