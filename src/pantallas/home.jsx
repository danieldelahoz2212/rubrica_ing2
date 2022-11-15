import React from 'react'
import LClases from './ListaClases';
import LClases2 from "./ListaClasesU";

function Home({user}) {
    return (
        <>
            {
                user?.rol === "admin"? < LClases /> : < LClases2 />
            }
        </>
    )
}

export default Home