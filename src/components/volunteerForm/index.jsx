import "./style.css";
import React, { useState, useEffect } from 'react';

import { getONGs } from '../../services/ongService';
import { getOpportunities } from '../../services/opportunityService';
import { createVolunteer } from '../../services/volunteerService';
import InputField from '../../components/InputField';
import Button from '../button';

export default function volunteerForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interests: '',
        ongId: '',
        opportunityId: ''
    });

    const [ongs, setONGs] = useState([]);
    const [opportunities, setOpportunities] = useState([]);

    useEffect(() => {
        const fetchONGs = async () => {
            const response = await getONGs();
            setONGs(response.ongList || []);
        };

        const fetchOpportunities = async () => {
            const response = await getOpportunities();
            setOpportunities(response.opportunityList || []);
        };

        fetchONGs();
        fetchOpportunities();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const volunteer = { ...formData };
            await createVolunteer(volunteer);
            console.log('Voluntário registrado com sucesso');
        } catch (error) {
            console.error('Erro ao registrar voluntário:', error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputField name="name" value={formData.name} onChange={handleChange} placeholder="Nome" />
                <InputField name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <InputField name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefone" />
                <InputField name="interests" value={formData.interests} onChange={handleChange} placeholder="Interesses" />

                <select name="ongId" value={formData.ongId} onChange={handleChange}>
                    <option value="">Selecione uma ONG</option>
                    {ongs.map((ong) => (
                        <option key={ong.id} value={ong.id}>{ong.name}</option>
                    ))}
                </select>

                <select name="opportunityId" value={formData.opportunityId} onChange={handleChange}>
                    <option value="">Selecione uma Oportunidade</option>
                    {opportunities.map((opportunity) => (
                        <option key={opportunity.id} value={opportunity.id}>{opportunity.title}</option>
                    ))}
                </select>

                <Button label="Registrar Voluntário" type="submit" />
            </form>
        </>
    )


}