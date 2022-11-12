import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Login1 = () => {
    return (
    <>
        <div>
        <nav class="menu animate__animated animate__lightSpeedInLeft animate__bounce">
            <li><a class="animate__animated animate__bounce animate__delay-0.5s rounded-3" href="#">inicio</a></li>
            <li><a class="animate__animated animate__bounce animate__delay-0.5s rounded-3" href="#">Iniciar sección</a></li>
            <li><a class="animate__animated animate__bounce animate__delay-0.5s rounded-3" href="#">AcercaDe</a></li>
        </nav>
            <div>
                <section>
                    <form>
                        <label>Usuario:</label>
                        <input class="contraste rounded-3" for="text" name="usuario" placeholder="Ingrese Usuario"></input>
                        <label>Contraseña:</label>
                        <input class="contraste rounded-3" for="password" name="contraseña" placeholder="Ingrese Contraseña"></input>
                        <input class="botones rounded-3" type="submit" name="ingresar" value="Ingresar"></input>
                        <input class="botones rounded-3" type="submit" name="registrar" value="Registrar"></input>
                        <p><a href="#">¿Olvidase tu Contraseña?</a></p>
                    </form>
                </section>
            </div>
        </div>
    </>
    )
}

export default Login1