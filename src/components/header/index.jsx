import "./style.css";
import logo from "../../assets/logo.png"
export default function Header({ onMenuItemClick }) {
    return (
        <header>
            <div className="interface">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav className="menu-desktop">
                    <ul>
                        <li onClick={() => onMenuItemClick('info')}>Sobre</li>
                        <li onClick={() => onMenuItemClick('resources')}>Recursos</li>
                        {/* <li onClick={() => onMenuItemClick('opportunity')}>Oportunidade</li>
                        <li onClick={() => onMenuItemClick('search')}>Busca</li> */}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
