import "./style.css";

export default function Button({ label, onClick, type = "button" }) {
    return (
        <button className="custom-button" onClick={onClick} type={type}>
            {label}
        </button>
    );
}
