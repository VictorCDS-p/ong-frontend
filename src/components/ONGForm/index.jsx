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
        contactEmail: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await createONG(formData);
            console.log('ONG criada com sucesso:', data);
        } catch (error) {
            console.error('Erro ao criar ONG:', error.message);
        }
    };

  return(
    <>
    <form onSubmit={handleSubmit}>
         <InputField name={"name"} value={formData.name} onChange={handleChange} placeholder={"Nome"} />
         <InputField name={"description"} value={formData.description} onChange={handleChange} placeholder={"Descrição"} />
         <InputField name={"location"} value={formData.location} onChange={handleChange} placeholder={"Localização"} />
         <InputField name={"website"} value={formData.website} onChange={handleChange} placeholder={"Website"} />
         <InputField name={"contactEmail"} value={formData.contactEmail} onChange={handleChange} placeholder={"Email de Contato"} />
         <Button label="Criar ONG" type="submit" />
    </form> 
    </>
  )
}
