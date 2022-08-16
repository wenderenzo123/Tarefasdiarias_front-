import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import style from '../../../style/home.module.scss';
import { BsPlusLg } from 'react-icons/bs';
import Modal from '../../modal';

interface Props {
    id?: number;
}

export default function Dropdown(props: Props) {
    function excluir(id: number = 0) {
        axios.delete(`http://127.0.0.1:8000/calendar/${id}/`)
    }
    return (
        <div>
            <div className={style.dropdown}>
                <div className={style.dropdown__content}>
                    <div className={style.dropdown__content__item}>
                        Editar 
                    <div> 
                </div>
                </div>
                    <div className={style.dropdown__content__item} onClick={() => excluir(props.id)}>
                        Excluir
                    </div>
                </div>
            </div>
        </div>
    )
}
