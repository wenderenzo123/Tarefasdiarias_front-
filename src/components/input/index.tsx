import style from '../../style/home.module.scss';
import { SetStateAction } from 'react';
export default function Input(Props:{busca:string,setBusca:React.Dispatch<SetStateAction<string>>}){
    return (
        <div className={style.input}>
            <input className={style.input__inputs}
                placeholder="Pesquisar"
                value={Props.busca} 
                onChange = {evento => Props.setBusca(evento.target.value)}/>
                
        </div>
    );
}