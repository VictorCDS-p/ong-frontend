import "./style.css";

export default function InputField({ id, name, value, onChange, placeholder, autocomplete }) {
    return (
        <div className="inputField">
            <input 
                id={id} 
                name={name} 
                value={value} 
                onChange={onChange} 
                placeholder={placeholder} 
                autoComplete={autocomplete}  // Atributo adicionado
            />
        </div>
    );
}
