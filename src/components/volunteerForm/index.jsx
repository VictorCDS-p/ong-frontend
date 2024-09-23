import './style.css';
import React, { useState, useEffect } from 'react';
import { getONGs } from '../../services/ongService';
import { getOpportunities } from '../../services/opportunityService';
import { createVolunteer } from '../../services/volunteerService';
import InputField from '../../components/InputField';
import Button from '../button';
import SelectDropdown from '../SelectDropdown';

export default function VolunteerForm() {
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
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchONGs = async () => {
            const response = await getONGs();
            setONGs(response.ongList || []);
        };

        const fetchOpportunities = async () => {
            const response = await getOpportunities();
            setOpportunities(response.opportunities || []);
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
            await createVolunteer(formData);
            setSuccessMessage("Voluntário registrado com sucesso!");

            setFormData({
                name: '',
                email: '',
                phone: '',
                interests: '',
                ongId: '',
                opportunityId: ''
            });
        } catch (error) {
            console.error('Erro ao registrar voluntário:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nome:</label>
            <InputField 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Nome completo" 
                autoComplete="given-name" 
            />

            <label htmlFor="email">Email:</label>
            <InputField 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email para contato" 
                autoComplete="email" 
            />

            <label htmlFor="phone">Telefone:</label>
            <InputField 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Número de telefone" 
                autoComplete="tel" 
            />

            <label htmlFor="interests">Interesses:</label>
            <InputField 
                id="interests" 
                name="interests" 
                value={formData.interests} 
                onChange={handleChange} 
                placeholder="Áreas de interesse" 
                autoComplete="off" 
            />

            <label htmlFor="ongId">ONG:</label>
            <SelectDropdown
                id="ongId"
                name="ongId"
                value={formData.ongId}
                options={ongs.map(ong => ({ id: ong.id, name: ong.name }))}
                onChange={(value) => setFormData({ ...formData, ongId: value })}
                placeholder="Selecione uma ONG"
            />

            <label htmlFor="opportunityId">Oportunidade:</label>
            <SelectDropdown
                id="opportunityId"
                name="opportunityId"
                value={formData.opportunityId}
                options={opportunities.map(opportunity => ({ id: opportunity.id, name: opportunity.title }))}
                onChange={(value) => setFormData({ ...formData, opportunityId: value })}
                placeholder="Selecione uma Oportunidade"
            />

            <Button label="Registrar Voluntário" type="submit" />

            {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
    );
}
