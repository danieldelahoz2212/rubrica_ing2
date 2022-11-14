import React from 'react'
import Logo from "../images/logo.png";
import LClases from './ListaClases';
import Lclases2 from "./ListaClasesU";
import { getAuth, onAuthStateChanged ,signOut} from "firebase/auth"
import { getFirestore, doc ,getDoc } from "firebase/firestore";
import Fireapp from "../firebase/credenciales";
const auth = getAuth(Fireapp);
const firestore = getFirestore(Fireapp);


function Home() {

    async function rol(uid) {
        const docuRef = doc(firestore,  `/usuarios/${uid}`);
        const docuC = await getDoc(docuRef);
        const InfoF = docuC.data().rol;
        return InfoF;
    }
    return (
    <> 
    {
        rol === "admin" ? < LClases /> : < Lclases2 />
    }
    </>
    )
}

export default Home