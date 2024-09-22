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
            <label>Nome:</label>
            <InputField name="name" value={formData.name} onChange={handleChange} placeholder="Nome completo" />

            <label>Email:</label>
            <InputField name="email" value={formData.email} onChange={handleChange} placeholder="Email para contato" />

            <label>Telefone:</label>
            <InputField name="phone" value={formData.phone} onChange={handleChange} placeholder="Número de telefone" />

            <label>Interesses:</label>
            <InputField name="interests" value={formData.interests} onChange={handleChange} placeholder="Áreas de interesse" />

            <SelectDropdown
                label="ONG"
                name="ongId"
                value={formData.ongId}
                options={ongs}
                onChange={handleChange}
                placeholder="Selecione uma ONG"
            />

            <SelectDropdown
                label="Oportunidade"
                name="opportunityId"
                value={formData.opportunityId}
                options={opportunities}
                onChange={handleChange}
                placeholder="Selecione uma Oportunidade"
            />

            <Button label="Registrar Voluntário" type="submit" />

            {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
    );
}
