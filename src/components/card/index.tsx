import style from '../../style/home.module.scss';
import { AiOutlineClose, AiTwotoneEdit} from 'react-icons/ai';
import { SetStateAction, useState } from 'react';
import axios from 'axios';
import { BsFillTrashFill } from 'react-icons/bs';
import ReactModal from 'react-modal';

interface Api{
    id?: number;
    titulo: string;
    descricao: string;
    data: string;
    tempo: string;
}
interface Props{
    id?: number;
    titulo: string;
    descricao: string;
    datetime: string;
    time: string;
    api:Api[],setApi:React.Dispatch<SetStateAction<Api[]>>
}

export default function Card(props: Props){
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [tempo, setTempo] = useState('');
    const [open,setOpen]= useState(false);
    function Editar(id: number = 0, itens: { descricao: string; data: string; tempo: string; }) {
        axios
            .put(`http://127.0.0.1:8000/calendar/${id}/`, itens)
        axios
            .get("http://127.0.0.1:8000/calendar/")
            .then((res) => props.setApi(res.data))
            .catch((err) => console.log(err));
    }
    function excluir(id: number = 0) {
        axios.delete(`http://127.0.0.1:8000/calendar/${id}/`)
    }
    const submitValue = () => {
        const itens = {
            titulo: titulo,
            descricao: descricao,
            data: data,
            tempo: tempo
        }
        console.log(itens);
        Editar(props.id,itens);
        setOpen(false);

    }
    return(
        <div className={style.card}>
            <div>
                <div className={style.card__title}>
                    <p>{props.titulo}</p>  
                    <div className={style.card__title__icons}>
                    <button className={style.card__title}
                            onClick={()=>setOpen(!open)}>
                        <AiTwotoneEdit size={10}/>
                        <div>
                    </div>
                    </button>  
                    <button className={style.card__title}
                            onClick={()=>excluir(props.id)}>
                        <BsFillTrashFill size={10}/>
                        <div>
                    </div>
                    </button>
                    </div>                                                                         
                </div>
                <div className={style.card__time}>
                    <p>Data e Hora: </p>
                    <p>{props.datetime}</p>
                    <p>Tempo de Duração: {props.time}</p>
                </div>
            </div>
            <p className={style.card__params}>{props.descricao}</p>
            <ReactModal isOpen={open}>
            <button className={style.modal__button__close}
                            onClick={() => setOpen(false)}>
                            <AiOutlineClose/>
                    </button>
                <div className={style.modal}>
                    <h1>Editar Tarefa</h1>
                    <input 
                        type="text" 
                        placeholder="Titulo"
                        onChange={e => setTitulo(e.target.value)}/>
                    <input type="text"
                        placeholder="Descrição" 
                        onChange={e => setDescricao(e.target.value)}/>
                    <input type="datetime-local"
                        placeholder="Data"
                        onChange={e => setData(e.target.value)}/>
                    <input type="time"
                        onChange={e => setTempo(e.target.value)}/>
                    <button type="submit" onClick={submitValue} className={style.modal__button}>confirmar</button> 
                    </div>
            </ReactModal>
        </div>
    )
}