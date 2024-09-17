import React, { useEffect, useState } from 'react';
import { getVolunteers } from '../../services/volunteerService';
import "./style.css";

function VolunteerList() {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const data = await getVolunteers();
                setVolunteers(data.volunteerList || []);
                setLoading(false);
            } catch (error) {
                setError('Erro ao carregar voluntários');
                setLoading(false);
            }
        }
        fetchVolunteers();
    }, []);

    if (loading) {
        return <div>Carregando Voluntários...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <h1>Lista de Voluntários</h1>
            {volunteers.map((volunteer) => (
                <div key={volunteer.id}>
                    <h2>{volunteer.name}</h2>
                    <p>Email: {volunteer.email}</p>
                    <p>Telefone: {volunteer.phone}</p>
                    <p>Interesses: {volunteer.interests.join(', ')}</p>
                </div>
            ))}
        </>
    );
}

export default VolunteerList;
