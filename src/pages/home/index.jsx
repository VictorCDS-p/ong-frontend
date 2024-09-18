import "./style.css";
import Header from "../../components/header";
import Button from "../../components/buttom";
import Card from "../../components/card";
import Footer from "../../components/footer";

import { useRef } from 'react';



export default function Home() {
    const scrollRef = useRef(null);

    const scrollToText = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Header />

            <div className="mainContent">
                <div className="textContent">
                    <h1>Bem-Vindo(a)</h1>
                    <p>Descubra como você pode ajudar e fazer a diferença com ONGs e projetos de voluntariado. Conecte-se, participe e contribua para causas que importam.</p>
                    <ul>
                        <li>Encontre oportunidades de voluntariado.</li>
                        <li>Conecte-se com ONGs.</li>
                        <li>Gerencie e acompanhe seu impacto.</li>
                    </ul>
                    <Button label="Saiba mais" type="button" onClick={scrollToText} />
                </div>

                <div className="imageContent">
                    <img src="src\assets\kisspng-volunteering-clip-art-volunteer-5ac22caac1ba33.9703998215226748587935.png" alt="" />
                </div>
            </div>

            <div className="infoSection" ref={scrollRef}>
                <h2>Sobre o Projeto</h2>
                <p>
                    Este site foi criado com o objetivo de facilitar a conexão entre pessoas que desejam se voluntariar e ONGs que buscam por ajuda. Muitas vezes, há uma grande quantidade de oportunidades de voluntariado disponíveis, mas as pessoas não sabem onde procurar, ou como encontrar uma organização que esteja alinhada com seus interesses e habilidades.
                </p>
                <p>
                    Com essa plataforma, acreditamos que podemos criar um ponto de encontro digital, onde ONGs podem listar suas necessidades de voluntários, e indivíduos podem explorar essas oportunidades de maneira simples e intuitiva. Através do nosso sistema, você poderá descobrir ONGs em sua região ou em qualquer lugar do mundo, entender quais causas elas apoiam, e se candidatar a projetos que façam sentido para você.
                </p>
                <p>
                    O voluntariado não é apenas uma forma de ajudar os outros, mas também uma oportunidade de crescimento pessoal. Você poderá adquirir novas habilidades, conhecer novas pessoas, e se envolver em causas importantes para a sociedade. Quer seja na área de educação, meio ambiente, saúde ou direitos humanos, sempre há algo que você pode fazer para contribuir.
                </p>
                <p>
                    Nosso sistema permite que você gerencie suas inscrições, acompanhe seu impacto e receba feedback das ONGs. Queremos tornar o processo de voluntariado acessível e eficiente, criando uma ponte entre pessoas e organizações, e, assim, ajudar a construir um mundo melhor para todos.
                </p>
            </div>

            <div className="cardsContainer">

                <div className="title">
                    <h1>Conheça Nossos Recursos</h1>
                </div>


                <div className="cardsContent">                <Card
                    image="https://img.icons8.com/cotton/64/trust--v4.png"
                    subtitle="ONGs"
                    description="Explore uma variedade de ONGs dedicadas a diferentes causas sociais. Descubra como você pode apoiar e contribuir para projetos que fazem a diferença em áreas como educação, meio ambiente e saúde."
                    buttom="Saiba mais"
                />
                    <Card
                        image="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-volunteer-isolation-flaticons-flat-flat-icons.png"
                        subtitle="Voluntários"
                        description="Conecte-se com voluntários que estão engajados em causas importantes. Encontre perfis de pessoas comprometidas em fazer a diferença e veja como você pode se envolver em atividades de voluntariado."
                        buttom="Saiba mais"
                    />
                    <Card
                        image="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-jobs-digital-nomading-relocation-flaticons-flat-flat-icons.png"
                        subtitle="Oportunidade"
                        description="Encontre oportunidades de voluntariado em várias áreas e locais. Descubra projetos que precisam de sua ajuda e participe de iniciativas que ressoam com seus interesses e habilidades."
                        buttom="Saiba mais"
                    />
                </div>

            </div>

            <div className="footer">
                <Footer/>
            </div>
        </>
    );
}
