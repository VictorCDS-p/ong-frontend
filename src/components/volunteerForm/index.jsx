import React, { useState, useEffect } from 'react';
import { getONGs } from '../../services/ongService';
import { getOpportunities } from '../../services/opportunityService';
import { createVolunteer } from '../../services/volunteerService';
import InputField from '../../components/InputField';
import Button from '../button';
import SelectDropdown from '../SelectDropdown'; // Importando o SelectDropdown

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
            const volunteer = { ...formData };
            await createVolunteer(volunteer);
            console.log('Voluntário registrado com sucesso');
        } catch (error) {
            console.error('Erro ao registrar voluntário:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputField name="name" value={formData.name} onChange={handleChange} placeholder="Nome" />
            <InputField name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <InputField name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefone" />
            <InputField name="interests" value={formData.interests} onChange={handleChange} placeholder="Interesses" />

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
        </form>
    );
}
