import React, { useState } from "react";
import { createONG } from "../../services/ongService";
import "./style.css";
import InputField from "../InputField";
import Button from "../button";

export default function ONGForm() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        website: '',
        contactEmail: ''
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createONG(formData);
            setSuccessMessage("ONG registrada com sucesso!");

            setFormData({
                name: '',
                description: '',
                location: '',
                website: '',
                contactEmail: ''
            });
        } catch (error) {
            console.error('Erro ao criar ONG:', error.message);
        }
    };

    return (
        <div className="orgForm">
            <form onSubmit={handleSubmit}>
                <label>Nome da ONG:</label>
                <InputField name="name" value={formData.name} onChange={handleChange} placeholder="Nome da ONG" />

                <label>Descrição:</label>
                <InputField name="description" value={formData.description} onChange={handleChange} placeholder="Descrição breve da ONG" />

                <label>Localização:</label>
                <InputField name="location" value={formData.location} onChange={handleChange} placeholder="Cidade/Estado" />

                <label>Website:</label>
                <InputField name="website" value={formData.website} onChange={handleChange} placeholder="URL do site da ONG" />

                <label>Email de Contato:</label>
                <InputField name="contactEmail" value={formData.contactEmail} onChange={handleChange} placeholder="Email de contato da ONG" />

                <Button label="Criar ONG" type="submit" />

                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
        </div>
    );
}
