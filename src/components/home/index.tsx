import style from '../../style/home.module.scss';
import Input from '../input';
import { BsPlusLg } from 'react-icons/bs';
import axios from 'axios';
import Card from '../card';
import { Key, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ReactModal from 'react-modal';

interface Api {
    id?: number;
    titulo: string;
    descricao: string;
    data: string;
    tempo: string;
}

export default function Home() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [tempo, setTempo] = useState('');

    function add(item: Api) {
        axios.post(`http://127.0.0.1:8000/calendar/`, item)
    }
    const [api, setApi] = useState<Api[]>([]);
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/calendar/")
            .then((res) => setApi(res.data))
            .catch((err) => console.log(err));
    },[]);
    const [busca, setBusca] = useState('');
    const filtroCard = api.filter((item) => item.titulo.toLowerCase().includes(busca.toLowerCase()));
    console.log(busca);
    const submitValue = () => {
        const itens = {
            titulo: titulo,
            descricao: descricao,
            data: data,
            tempo: tempo
        }
        add(itens);
        setIsOpen(false)

    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>Tarefas</h1>
            </div>
            <div className={style.selection}>
                <div className={style.selection__input}>
                    <Input busca={busca} setBusca={setBusca} />
                </div>
            </div>
            <div className={style.cards}>
                <ul className={style.cards__exibir}>
                    {filtroCard.map((card: Api) => (
                        <li key={card.id}>
                            <Card 
                                id={card.id} 
                                titulo={card.titulo} 
                                descricao={card.descricao} 
                                datetime={card.data} 
                                time={card.tempo} 
                                api={api} 
                                setApi={setApi} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className={style.add} onClick={() => setIsOpen(true)}>
                <BsPlusLg />
            </div>
            <ReactModal isOpen={modalIsOpen}>
                <button className={style.modal__button__close}
                    onClick={() => setIsOpen(false)}>
                    <AiOutlineClose />
                </button>
                <div className={style.modal}>
                    <h1>Criando Tarefa</h1>
                    <input
                        type="text"
                        placeholder="Titulo"
                        onChange={e => setTitulo(e.target.value)} />
                    <input type="text"
                        placeholder="Descrição"
                        onChange={e => setDescricao(e.target.value)} />
                    <input type="datetime-local"
                        onChange={e => setData(e.target.value)} />
                    <input type="time"
                        onChange={e => setTempo(e.target.value)} />
                    <button type="submit" 
                        onClick={submitValue} 
                        className={style.modal__button}>
                            confirmar
                    </button>
                </div>
            </ReactModal>
        </div>
    );
}