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
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchONGs = async () => {
            const response = await getONGs();
            setONGs(response.ongList || []);
        };
        fetchONGs();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createOpportunity({
                ...formData,
                requirements: formData.requirements.split(',').map(req => req.trim())
            });
            setSuccessMessage("Oportunidade criada com sucesso!");

            setFormData({
                title: '',
                description: '',
                location: '',
                startDate: '',
                endDate: '',
                requirements: '',
                ongId: ''
            });
        } catch (error) {
            console.error('Erro ao criar oportunidade:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Título:</label>
            <InputField name="title" value={formData.title} onChange={handleChange} placeholder="Título da oportunidade" />

            <label>Descrição:</label>
            <InputField name="description" value={formData.description} onChange={handleChange} placeholder="Breve descrição" />

            <label>Localização:</label>
            <InputField name="location" value={formData.location} onChange={handleChange} placeholder="Cidade/Estado" />

            <label>Data de Início:</label>
            <InputField name="startDate" value={formData.startDate} onChange={handleChange} placeholder="Data de início (AAAA-MM-DD)" />

            <label>Data de Término:</label>
            <InputField name="endDate" value={formData.endDate} onChange={handleChange} placeholder="Data de término (AAAA-MM-DD)" />

            <label>Requisitos (separados por vírgula):</label>
            <InputField name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Requisitos para a oportunidade" />

            <label>Selecione a ONG:</label>
            <select name="ongId" value={formData.ongId} onChange={handleChange}>
                <option value="">Selecione uma ONG</option>
                {ongs.map((ong) => (
                    <option key={ong.id} value={ong.id}>{ong.name}</option>
                ))}
            </select>

            <Button label="Criar Oportunidade" type="submit" />

            {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
    );
}
