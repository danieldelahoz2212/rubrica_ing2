import React from 'react'
import LClases from './ListaClases';
import LClases2 from "./ListaClasesU";
import { getFirestore, doc ,getDoc } from "firebase/firestore";
import Fireapp from "../firebase/credenciales";
const firestore = getFirestore(Fireapp);

function Home({user}) {
    async function rol(uid) {
    const docuRef = doc(firestore,  `/usuarios/${uid}`);
    const docuC = await getDoc(docuRef);
    const InfoF = docuC.data().rol;
    return InfoF;
    }
    
    return (
        <>
            {
                user?.rol === "admin"? < LClases /> : < LClases2 />
            }
        </>
    )
}

export default Home