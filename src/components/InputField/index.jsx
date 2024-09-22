import "./style.css";

export default function InputField({name, value, onChange, placeholder}) {
    return (
        <>
            <div className="inputField">
                <input name={name} value={value} onChange={onChange} placeholder={placeholder} />
            </div>
        </>
    );
}
