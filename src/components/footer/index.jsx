import "./style.css";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footerContent">
                <div className="footerSection">
                    <h3>Sobre Nós</h3>
                    <p>Estamos comprometidos em conectar pessoas com ONGs e oportunidades de voluntariado. Junte-se a nós para fazer a diferença!</p>
                </div>

                <div className="footerContact">
                    <h3>Contato</h3>
                    <p>Email: contato@exemplo.com</p>
                    <p>Telefone: +55 11 1234-5678</p>
                </div>
            </div>
            <div className="footerBottom">
                <p>&copy; {new Date().getFullYear()} SeuSite. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
