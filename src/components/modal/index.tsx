import ReactModal from 'react-modal';

ReactModal.setAppElement("#root");
export default function Modal(props:any){
    return(
        <div>
            {props.children}
        </div>
    )
}