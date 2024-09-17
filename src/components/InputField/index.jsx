import "./style.css";

export default function InputField({name, value, onChange, placeholder}){
    return(
        <>
            <div className="input-field">
            <input name={name} value={value} onChange={onChange} placeholder={placeholder} />
            </div>

        </>
    )
}