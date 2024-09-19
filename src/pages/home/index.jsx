import "./style.css";
import React, { useState } from 'react';

import Header from "../../components/header";
import Button from "../../components/button";
import Card from "../../components/card";
import Footer from "../../components/footer";
import ONGForm from "../../components/ONGForm";
import VolunteerForm from "../../components/volunteerForm";
import OpportunityForm from "../../components/opportunityForm";
import SelectAndListEntities from "../../components/SelectAndListEntities";

import { useRef } from 'react';



export default function Home() {
    const scrollRef = useRef(null);

    const scrollToText = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [showOngForm, setShowOngForm] = useState(false);
    const [showVolunteerForm, setShowVolunteerForm] = useState(false);
    const [showOpportunityForm, setShowOpportunityForm] = useState(false);
    const [showSelectEntities, setShowSelectEntities] = useState(false);

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


                <div className="cardsContent">
                    <Card
                        image="https://img.icons8.com/cotton/64/trust--v4.png"
                        subtitle="ONGs"
                        description="Descubra uma variedade de ONGs que trabalham em causas sociais diversas. Apoie projetos voltados para educação, meio ambiente, saúde, e muito mais. Conecte-se diretamente com organizações que precisam da sua ajuda para fazer a diferença."
                        buttonLabel="Criar ONG"
                        onClick={() => {
                            setShowOngForm(true);
                            setShowVolunteerForm(false);
                            setShowOpportunityForm(false);
                            setShowSelectEntities(false);
                        }}
                    />

                    <Card
                        image="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-jobs-digital-nomading-relocation-flaticons-flat-flat-icons.png"
                        subtitle="Oportunidades"
                        description="Explore uma lista diversificada de oportunidades de voluntariado. Encontre projetos alinhados aos seus interesses e habilidades, seja em sua comunidade ou em qualquer lugar do mundo. Contribua com causas que têm impacto direto na sociedade."
                        buttonLabel="Criar Oportunidade"
                        onClick={() => {
                            setShowOngForm(false);
                            setShowVolunteerForm(false);
                            setShowOpportunityForm(true);
                            setShowSelectEntities(false);
                        }}
                    />

                    <Card
                        image="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-volunteer-isolation-flaticons-flat-flat-icons.png"
                        subtitle="Voluntários"
                        description="Participe ativamente de causas que você se importa! Conecte-se com ONGs e projetos que estão em busca de voluntários como você. Junte-se a outras pessoas motivadas e contribua com o seu tempo e habilidades para transformar o mundo."
                        buttonLabel="Registrar Voluntário"
                        onClick={() => {
                            setShowOngForm(false);
                            setShowVolunteerForm(true);
                            setShowOpportunityForm(false);
                            setShowSelectEntities(false);
                        }}
                    />

                    <Card
                        image="https://img.icons8.com/color/64/search--v1.png"
                        subtitle="Listar e Editar"
                        description="Gerencie facilmente suas ONGs, Voluntários e Oportunidades. Liste, edite e acompanhe todas as entidades conectadas ao seu projeto, mantendo o controle total de suas contribuições e parcerias com apenas alguns cliques."
                        buttonLabel="Listar Entidades"
                        onClick={() => {
                            setShowOngForm(false);
                            setShowVolunteerForm(false);
                            setShowOpportunityForm(false);
                            setShowSelectEntities(true);
                        }}
                    />

                </div>

            </div>

            <div className="forms">
                {showOngForm && <ONGForm />}
                {showVolunteerForm && <VolunteerForm />}
                {showOpportunityForm && <OpportunityForm />}
                {showSelectEntities && <SelectAndListEntities />}
            </div>

            <div className="footer">
                <Footer />
            </div>
        </>
    );
}
