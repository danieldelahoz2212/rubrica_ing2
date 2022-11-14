import { useState, useEffect } from 'react'
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { listaC} from '../firebase/credenciales';


function ListaClases() {
    const [materia, setMateria] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [modoEditar, setModoEdiar] = useState(false)
    const [lista, SetLista] = useState([])
    const [id, setId] = useState('')

    const guardar = async (e) => {
        e.preventDefault();
        try {
            const data = await addDoc(collection(listaC, 'cursos'), {
                nombreMateria: materia,
                InfDescripcion: descripcion
            })

            SetLista([
                ...lista,
                {
                    nombreMateria: materia,
                    InfDescripcion: descripcion,
                    id: data.id
                }
            ])
            setMateria('')
            setDescripcion('')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const traerDatos = async () => {
            try {
                onSnapshot(collection(listaC, 'cursos'), (query) => {
                    SetLista(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                })
            } catch (error) {
                console.log(error)
            }
        }
        traerDatos();
    }, [])

    const editar = item => {
        setMateria(item.nombreMateria)
        setDescripcion(item.InfDescripcion)
        setId(item.id)
        setModoEdiar(true)
    }

    const editarMateria = async e => {
        e.preventDefault()
        try {
            const docRef = doc(listaC, "cursos", id);
            await updateDoc(docRef, {
                nombreMateria: materia,
                InfDescripcion: descripcion
            })
            const newArray = lista.map(
                item => item.id === id ? { id: id, nombreMateria: materia, InfDescripcion: descripcion } : item
            )

            SetLista(newArray)
            setMateria('')
            setDescripcion('')
            setId('')
            setModoEdiar(false)

        } catch (error) {
            console.log(error)
        }
    }

    const cancelar = () => {
        setModoEdiar(false)
        setMateria('')
        setDescripcion('')
        setId('')
    }

    const eliminar = async id => {
        try {
            await deleteDoc(doc(listaC, 'cursos', id))
        } catch (error) {

        }
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Cursos</h1>
            <hr />
            <div className='row'>
                <div className='col-8 rounded formulario'>
                    <h4 className='text-center text-light'>Lista De Cursos</h4>
                    
                    <ul className='list-group'>
                        {
                            lista.map(item => (
                                <li className='list-group-item' key={item.id}>
                                    <span className='lead'>{item.nombreMateria} {item.InfDescripcion}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default ListaClases
