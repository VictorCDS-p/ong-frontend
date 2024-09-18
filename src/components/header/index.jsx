import "./style.css";
export default function Header() {
    return (
        <>
            <header>
                <div className="interface">
                    <div className="logo">
                        <img src="src\assets\logo.png" alt="" />
                    </div>

                    <nav className="menu-desktop">
                        <ul>
                            <li className="home">Home</li>
                            <li className="ONGs">ONGs</li>
                            <li className="volunteer">Voluntários</li>
                            <li className="opportunity">Oportunidade</li>

                        </ul>
                    </nav>
                </div>
            </header>

        </>
    )
}