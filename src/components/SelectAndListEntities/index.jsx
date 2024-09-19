import "./style.css";
import React, { useState, useEffect } from 'react';

import { getONGs } from '../../services/ongService';
import { getOpportunities } from '../../services/opportunityService';
import { getVolunteers } from '../../services/volunteerService';
import InputField from '../../components/InputField';
import Button from '../button';

export default function ListEntities() {
    const [selectedEntity, setSelectedEntity] = useState('');
    const [entities, setEntities] = useState([]);
    const [editData, setEditData] = useState(null);

    const fetchData = async (entityType) => {
        let data = [];
        if (entityType === 'ongs') {
            const response = await getONGs();
            data = response.ongList || [];
        } else if (entityType === 'opportunities') {
            const response = await getOpportunities();
            data = response.opportunityList || [];
        } else if (entityType === 'volunteers') {
            const response = await getVolunteers();
            data = response.volunteerList || [];
        }
        setEntities(data);
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
        setEditData(entity);
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
                <form>
                    <InputField
                        name="name"
                        value={editData.name || editData.title}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                    <InputField
                        name="description"
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    />
                    <Button label="Atualizar" />
                </form>
            )}
        </>
    );

}
