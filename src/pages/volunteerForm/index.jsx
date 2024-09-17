import React, { useState } from 'react';
import { createVolunteer } from '../../services/volunteerService';
import "./style.css";
import InputField from '../../components/InputField';
import Button from '../../components/buttom';

function VolunteerForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interests: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const volunteer = {...formData, interests: formData.interests.split(',').map(interest => interest.trim())};
            const data = await createVolunteer(volunteer);
            console.log('Voluntário criado com sucesso:', data);
        } catch (error) {
            console.error('Erro ao criar voluntário:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputField name="name" value={formData.name} onChange={handleChange} placeholder="Nome" />
            <InputField name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <InputField name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefone" />
            <InputField name="interests" value={formData.interests} onChange={handleChange} placeholder="Interesses (separados por vírgula)" />
            <Button label="Criar Voluntário" type="submit" />
        </form>
    );
}

export default VolunteerForm;
