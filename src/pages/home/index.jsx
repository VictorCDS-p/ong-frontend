import "./style.css";
import React, { useState, useRef } from 'react';
import Header from "../../components/header";
import Button from "../../components/button";
import Card from "../../components/card";
import mainImg from '../../assets/mainimg.png';
import Footer from "../../components/footer";
import ONGForm from "../../components/ONGForm";
import VolunteerForm from "../../components/volunteerForm";
import OpportunityForm from "../../components/opportunityForm";
import SelectAndListEntities from "../../components/SelectAndListEntities";

export default function Home() {
    const infoSectionRef = useRef(null);
    const resourcesSectionRef = useRef(null);
    const [showOngForm, setShowOngForm] = useState(false);
    const [showVolunteerForm, setShowVolunteerForm] = useState(false);
    const [showOpportunityForm, setShowOpportunityForm] = useState(false);
    const [showSelectEntities, setShowSelectEntities] = useState(false);

    const scrollToSection = (section) => {
        switch (section) {
            case 'info':
                infoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'resources':
                resourcesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                break;
            default:
                break;
        }
    };

    const handleShowForm = (formType) => {
        setShowOngForm(formType === 'ong');
        setShowVolunteerForm(formType === 'volunteer');
        setShowOpportunityForm(formType === 'opportunity');
        setShowSelectEntities(formType === 'select');
    };

    return (
        <>
            <Header onMenuItemClick={scrollToSection} />

            <div className="mainContent">
                <div className="textContent">
                    <h1>Bem-Vindo(a)</h1>
                    <p>Descubra como você pode ajudar e fazer a diferença com ONGs e projetos de voluntariado. Conecte-se, participe e contribua para causas que importam.</p>
                    <ul>
                        <li>Encontre oportunidades de voluntariado.</li>
                        <li>Conecte-se com ONGs.</li>
                        <li>Gerencie e acompanhe seu impacto.</li>
                    </ul>
                    <Button label="Saiba mais" type="button" onClick={() => scrollToSection('info')} />
                </div>

                <div className="imageContent">
                    <img src={mainImg} alt="Voluntariado" />
                </div>
            </div>

            <div className="infoSection" ref={infoSectionRef}>
                <h2>Sobre o Projeto</h2>
                <p>
                    Este site foi criado com o objetivo de facilitar a conexão entre pessoas que desejam se voluntariar e ONGs que buscam por ajuda. Muitas vezes, há uma grande quantidade de oportunidades de voluntariado disponíveis, mas as pessoas não sabem onde procurar, ou como encontrar uma organização que esteja alinhada com seus interesses e habilidades.
                </p>
                {/* Mais conteúdo aqui */}
            </div>

            <div className="cardsContainer" ref={resourcesSectionRef}>
                <div className="title">
                    <h1>Conheça Nossos Recursos</h1>
                </div>

                <div className="cardsContent">
                    <Card
                        image="https://img.icons8.com/cotton/64/trust--v4.png"
                        subtitle="ONGs"
                        description="Descubra uma variedade de ONGs que trabalham em causas sociais diversas."
                        buttonLabel="Criar ONG"
                        onClick={() => handleShowForm('ong')}
                    />

                    <Card
                        image="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-jobs-digital-nomading-relocation-flaticons-flat-flat-icons.png"
                        subtitle="Oportunidades"
                        description="Explore uma lista diversificada de oportunidades de voluntariado."
                        buttonLabel="Criar Oportunidade"
                        onClick={() => handleShowForm('opportunity')}
                    />

                    <Card
                        image="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-volunteer-isolation-flaticons-flat-flat-icons.png"
                        subtitle="Voluntários"
                        description="Participe ativamente de causas que você se importa!"
                        buttonLabel="Registrar Voluntário"
                        onClick={() => handleShowForm('volunteer')}
                    />

                    <Card
                        image="https://img.icons8.com/color/64/search--v1.png"
                        subtitle="Listar e Editar"
                        description="Gerencie facilmente suas ONGs, Voluntários e Oportunidades."
                        buttonLabel="Listar Entidades"
                        onClick={() => handleShowForm('select')}
                    />
                </div>
            </div>

            <div className={`forms ${showOngForm || showVolunteerForm || showOpportunityForm || showSelectEntities ? 'visible' : ''}`}>
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
