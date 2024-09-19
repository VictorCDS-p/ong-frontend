import "./style.css";
import React, { useState, useEffect } from 'react';

import { getONGs } from '../../services/ongService';
import { createOpportunity } from '../../services/opportunityService';
import InputField from '../InputField';
import Button from '../button';

export default function OpportunityForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
        requirements: '',
        ongId: ''
    });

    const [ongs, setONGs] = useState([]);

    useEffect(() => {
        const fetchONGs = async () => {
            const response = await getONGs();
            setONGs(response.ongList || [])
        }
        fetchONGs()
    }, []);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const opportunity = {
                ...formData,
                requirements: formData.requirements.split(',').map(req => req.trim())
            };
            const data = await createOpportunity(opportunity);
            console.log('Oportunidade criada com sucesso:', data);
        } catch (error) {
            console.error('Erro ao criar oportunidade:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputField name="title" value={formData.title} onChange={handleChange} placeholder="Título" />
            <InputField name="description" value={formData.description} onChange={handleChange} placeholder="Descrição" />
            <InputField name="location" value={formData.location} onChange={handleChange} placeholder="Localização" />
            <InputField name="startDate" value={formData.startDate} onChange={handleChange} placeholder="Data de Início" />
            <InputField name="endDate" value={formData.endDate} onChange={handleChange} placeholder="Data de Término" />
            <InputField name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Requisitos (separados por vírgula)" />

            <select name="ongId" value={formData.ongId} onChange={handleChange}>
                <option value="">Selecione uma ONG</option>
                {ongs.map((ong) => (
                    <option key={ong.id} value={ong.id}>{ong.name}</option>
                ))}
            </select>

            <Button label="Criar Oportunidade" type="submit" />

        </form>
    );
}


