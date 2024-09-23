import './style.css';
import React, { useState, useEffect } from 'react';
import { getONGs } from '../../services/ongService';
import { createOpportunity } from '../../services/opportunityService';
import InputField from '../InputField';
import Button from '../button';
import SelectDropdown from '../SelectDropdown';

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

        // Verifica se a data de início é maior que a data de término
        if (new Date(formData.startDate) > new Date(formData.endDate)) {
            alert('A data de início não pode ser maior que a data de término.');
            return;
        }

        try {
            const formattedStartDate = new Date(formData.startDate).toISOString().split('T')[0];
            const formattedEndDate = new Date(formData.endDate).toISOString().split('T')[0];

            await createOpportunity({
                ...formData,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                requirements: formData.requirements.split(',').map(req => req.trim())
            });
            setSuccessMessage("Oportunidade criada com sucesso!");

            // Resetando o formulário
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
            <label htmlFor="title">Título:</label>
            <InputField id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Título da oportunidade" />

            <label htmlFor="description">Descrição:</label>
            <InputField id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Breve descrição" />

            <label htmlFor="location">Localização:</label>
            <InputField id="location" name="location" value={formData.location} onChange={handleChange} placeholder="Cidade/Estado" />

            <label htmlFor="requirements">Requisitos (separados por vírgula):</label>
            <InputField id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Requisitos para a oportunidade" />

            <label htmlFor="startDate">Data de Início:</label>
            <input
                id="startDate"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
            />

            <label htmlFor="endDate">Data de Término:</label>
            <input
                id="endDate"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
            />

            <label htmlFor="ongId">Selecione a ONG:</label>
            <SelectDropdown
                id="ongId" 
                name="ongId"
                value={formData.ongId}
                options={ongs}
                onChange={(value) => setFormData({ ...formData, ongId: value })}
                placeholder="Selecione uma ONG"
            />

            <Button label="Criar Oportunidade" type="submit" />

            {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
    );
}
