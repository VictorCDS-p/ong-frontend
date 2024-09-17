import React, { useEffect, useState } from 'react';
import { getOpportunities } from '../../services/opportunityService';
import "./style.css";

function OpportunityList() {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                const data = await getOpportunities();
                setOpportunities(data.opportunityList || []);
                setLoading(false);
            } catch (error) {
                setError('Erro ao carregar oportunidades');
                setLoading(false);
            }
        }
        fetchOpportunities();
    }, []);

    if (loading) {
        return <div>Carregando Oportunidades...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <h1>Lista de Oportunidades</h1>
            {opportunities.map((opportunity) => (
                <div key={opportunity.id}>
                    <h2>{opportunity.title}</h2>
                    <p>Descrição: {opportunity.description}</p>
                    <p>Localização: {opportunity.location}</p>
                    <p>Data de Início: {opportunity.startDate}</p>
                    <p>Data de Término: {opportunity.endDate}</p>
                    <p>Requisitos: {opportunity.requirements.join(', ')}</p>
                </div>
            ))}
        </>
    );
}

export default OpportunityList;
