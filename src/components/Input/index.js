export default function Input(props){
    return (
        <div>
            <input 
            name={props.name} 
            id={props.id} 
            type={props.type} 
            placeholder={props.placeholder} 
            aria-label={props.ariaLabel}
            />
        </div>
    )
}