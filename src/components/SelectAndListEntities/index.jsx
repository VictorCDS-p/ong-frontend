import React, { useState, useEffect } from 'react';
import { getONGs, updateONG } from '../../services/ongService';
import { getOpportunities, updateOpportunity } from '../../services/opportunityService';
import { getVolunteers, updateVolunteer } from '../../services/volunteerService';
import InputField from '../../components/InputField';
import Button from '../button';

export default function ListEntities() {
    const [selectedEntity, setSelectedEntity] = useState('');
    const [entities, setEntities] = useState([]);
    const [editData, setEditData] = useState(null);

    const fetchData = async (entityType) => {
        try {
            let data = [];
            if (entityType === 'ongs') {
                const response = await getONGs();
                data = response.ongList || [];
            } else if (entityType === 'opportunities') {
                const response = await getOpportunities();
                data = response.opportunities || [];
            } else if (entityType === 'volunteers') {
                const response = await getVolunteers();
                data = response.volunteers || [];
            }
            console.log(`Dados recebidos para ${entityType}:`, data);
            setEntities(data);
        } catch (error) {
            console.error(`Erro ao buscar ${entityType}:`, error.message);
        }
    };

    useEffect(() => {
        if (selectedEntity) {
            fetchData(selectedEntity);
        }
    }, [selectedEntity]);

    const handleSelectChange = (e) => {
        setSelectedEntity(e.target.value);
        setEditData(null);
    };

    const handleEdit = (entity) => {
        setEditData({ ...entity }); // Cria uma cópia dos dados da entidade
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editData) return;

        try {
            let response;
            if (selectedEntity === 'ongs') {
                response = await updateONG(editData.id, {
                    name: editData.name,
                    description: editData.description,
                });
            } else if (selectedEntity === 'opportunities') {
                response = await updateOpportunity(editData.id, {
                    title: editData.title,
                    description: editData.description,
                });
            } else if (selectedEntity === 'volunteers') {
                response = await updateVolunteer(editData.id, {
                    name: editData.name,
                    description: editData.description,
                });
            }

            console.log("Atualização bem-sucedida:", response);
            fetchData(selectedEntity); // Recarrega os dados
            setEditData(null); // Limpa os dados após a atualização
        } catch (error) {
            console.error("Erro ao atualizar:", error.message);
        }
    };

    return (
        <>
            <select value={selectedEntity} onChange={handleSelectChange}>
                <option value="">Selecione uma opção</option>
                <option value="ongs">ONGs</option>
                <option value="opportunities">Oportunidades</option>
                <option value="volunteers">Voluntários</option>
            </select>

            <div>
                {entities.map((entity) => (
                    <div key={entity.id}>
                        <h2>{entity.name || entity.title}</h2>
                        <button onClick={() => handleEdit(entity)}>Editar</button>
                    </div>
                ))}
            </div>

            {editData && (
                <form onSubmit={handleUpdate}>
                    <InputField
                        name={selectedEntity === 'opportunities' ? "title" : "name"} // Altera para "title" ou "name" conforme a entidade
                        value={selectedEntity === 'opportunities' ? editData.title : editData.name} // Exibe o título ou nome correto
                        onChange={(e) => setEditData({ ...editData, [selectedEntity === 'opportunities' ? 'title' : 'name']: e.target.value })}
                    />
                    <InputField
                        name="description"
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    />
                    <Button label="Atualizar" type="submit" />
                </form>
            )}
        </>
    );
}
