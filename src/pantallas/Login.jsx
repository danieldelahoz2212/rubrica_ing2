import React, { useState } from 'react'
import Login1 from '../vistas/Login1';
import Register from "../vistas/Register";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [Init, setInit] = useState(false);
    return (
    <div>
        {Init? < Register/> : < Login1/>}
    </div>
    )
}

export default Login