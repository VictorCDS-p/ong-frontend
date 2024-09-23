import React, { useState } from "react";  // Certifique-se de importar o useState
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

            // Limpar o formulário
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
                <label htmlFor="name">Nome da ONG:</label>
                <InputField id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Nome da ONG" autocomplete="name" />

                <label htmlFor="description">Descrição:</label>
                <InputField id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Descrição breve da ONG" autocomplete="off" />

                <label htmlFor="location">Localização:</label>
                <InputField id="location" name="location" value={formData.location} onChange={handleChange} placeholder="Cidade/Estado" autocomplete="address-level2" />

                <label htmlFor="website">Website:</label>
                <InputField id="website" name="website" value={formData.website} onChange={handleChange} placeholder="URL do site da ONG" autocomplete="url" />

                <label htmlFor="contactEmail">Email de Contato:</label>
                <InputField id="contactEmail" name="contactEmail" value={formData.contactEmail} onChange={handleChange} placeholder="Email de contato da ONG" autocomplete="email" />

                <Button label="Criar ONG" type="submit" />

                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
        </div>
    );
}
