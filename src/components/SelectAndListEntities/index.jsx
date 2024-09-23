import './style.css';
import React, { useState, useEffect } from 'react';
import { getONGs, updateONG, deleteONG } from '../../services/ongService';
import { getOpportunities, updateOpportunity, deleteOpportunity } from '../../services/opportunityService';
import { getVolunteers, updateVolunteer, deleteVolunteer } from '../../services/volunteerService';
import InputField from '../../components/InputField';
import Button from '../button';
import SelectDropdown from '../../components/SelectDropdown';

export default function ListEntities() {
    const [selectedEntity, setSelectedEntity] = useState('');
    const [entities, setEntities] = useState([]);
    const [editData, setEditData] = useState({ requirements: [], interests: [] });
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchEntities = async (entityType) => {
        try {
            let data = [];
            switch (entityType) {
                case 'ongs':
                    data = (await getONGs()).ongList || [];
                    break;
                case 'opportunities':
                    data = (await getOpportunities()).opportunities || [];
                    break;
                case 'volunteers':
                    data = (await getVolunteers()).volunteers || [];
                    break;
                default:
                    return;
            }
            setEntities(data);
        } catch (error) {
            console.error(`Erro ao buscar ${entityType}:`, error.message);
        }
    };

    useEffect(() => {
        if (selectedEntity) {
            fetchEntities(selectedEntity);
        }
    }, [selectedEntity]);

    const handleSelectChange = (value) => {
        setSelectedEntity(value);
        resetEditData();
    };

    const resetEditData = () => {
        setEditData({ requirements: [], interests: [] });
        setIsEditing(false);
        setSearchTerm('');
    };

    const handleEdit = (entity) => {
        console.log("Entidade sendo editada:", entity); // Adicionado para depuração
        setEditData({
            ...entity,
            requirements: entity.requirements || [],
        
        });
        setIsEditing(true);
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editData.id) return;

        if (selectedEntity === 'opportunities' && editData.startDate > editData.endDate) {
            alert('A data de início não pode ser maior que a data de término.');
            return;
        }

        try {
            let response;
            switch (selectedEntity) {
                case 'ongs':
                    response = await updateONG(editData.id, editData);
                    break;
                case 'opportunities':
                    response = await updateOpportunity(editData.id, editData);
                    break;
                case 'volunteers':
                    response = await updateVolunteer(editData.id, editData);
                    break;
                default:
                    return;
            }
            console.log("Atualização bem-sucedida:", response);
            fetchEntities(selectedEntity);
            resetEditData();
        } catch (error) {
            console.error("Erro ao atualizar:", error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!id) return;
        try {
            let response;
            switch (selectedEntity) {
                case 'ongs':
                    response = await deleteONG(id);
                    break;
                case 'opportunities':
                    response = await deleteOpportunity(id);
                    break;
                case 'volunteers':
                    response = await deleteVolunteer(id);
                    break;
                default:
                    return;
            }
            console.log("Remoção bem-sucedida:", response);
            fetchEntities(selectedEntity);
        } catch (error) {
            console.error("Erro ao remover:", error.message);
        }
    };

    const handleCancel = () => {
        resetEditData();
    };

    const filteredEntities = entities.filter(entity =>
        (entity.name || entity.title || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <SelectDropdown
                label="Selecione uma entidade"
                name="entitySelect"
                value={selectedEntity}
                options={[
                    { id: 'ongs', name: 'ONGs' },
                    { id: 'opportunities', name: 'Oportunidades' },
                    { id: 'volunteers', name: 'Voluntários' },
                ]}
                onChange={handleSelectChange}
                placeholder="Selecione uma opção"
            />

            <InputField
                name="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquise por nome ou título"
                autoComplete="off"
            />

            <div className="entitiesContainer">
                {filteredEntities.map((entity) => (
                    <div key={entity.id} className="entityCard">
                        <h2>{entity.name || entity.title}</h2>
                        <div className="entityDetails">
                            {selectedEntity === 'ongs' && (
                                <>
                                    <p><strong>Descrição:</strong> {entity.description}</p>
                                    <p><strong>Localização:</strong> {entity.location}</p>
                                    <p><strong>Website:</strong>
                                        <a href={entity.website?.startsWith('http') ? entity.website : `http://${entity.website}`} target="_blank" rel="noopener noreferrer"> {entity.website}</a>
                                    </p>
                                    <p><strong>Email de Contato:</strong> {entity.contactEmail}</p>
                                </>
                            )}
                            {selectedEntity === 'opportunities' && (
                                <>
                                    <p><strong>Descrição:</strong> {entity.description}</p>
                                    <p><strong>Data de Início:</strong> {entity.startDate}</p>
                                    <p><strong>Data de Término:</strong> {entity.endDate}</p>
                                    <p><strong>Requisitos: </strong>
                                        {Array.isArray(entity.requirements) && entity.requirements.length > 0
                                            ? entity.requirements.join(', ')
                                            : 'Nenhum requisito'}
                                    </p>
                                </>
                            )}
                            {selectedEntity === 'volunteers' && (
                                <>
                                    <p><strong>Email: </strong> {entity.email}</p>
                                    <p><strong>Telefone: </strong> {entity.phone}</p>
                                    <p><strong>Interesses: </strong>{entity.interests}
                                    </p>
                                </>
                            )}
                        </div>
                        <Button onClick={() => handleEdit(entity)} label="Editar" />
                        <Button onClick={() => handleDelete(entity.id)} label="Remover" />
                    </div>
                ))}
            </div>

            {isEditing && (
                <form onSubmit={handleUpdate}>
                    {selectedEntity === 'ongs' && (
                        <>
                            <label>Nome:</label>
                            <InputField
                                name="name"
                                value={editData.name || ''}
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                placeholder="Nome"
                                autoComplete="off"
                            />
                            <label>Descrição:</label>
                            <InputField
                                name="description"
                                value={editData.description || ''}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                placeholder="Descrição"
                                autoComplete="off"
                            />
                            <label>Localização:</label>
                            <InputField
                                name="location"
                                value={editData.location || ''}
                                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                placeholder="Localização"
                                autoComplete="off"
                            />
                            <label>Website:</label>
                            <InputField
                                name="website"
                                value={editData.website || ''}
                                onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                                placeholder="Website"
                                autoComplete="off"
                            />
                            <label>Email de Contato:</label>
                            <InputField
                                name="contactEmail"
                                value={editData.contactEmail || ''}
                                onChange={(e) => setEditData({ ...editData, contactEmail: e.target.value })}
                                placeholder="Email de Contato"
                                autoComplete="email"
                            />
                        </>
                    )}

                    {selectedEntity === 'opportunities' && (
                        <>
                            <label>Título:</label>
                            <InputField
                                name="title"
                                value={editData.title || ''}
                                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                placeholder="Título"
                                autoComplete="off"
                            />
                            <label>Descrição:</label>
                            <InputField
                                name="description"
                                value={editData.description || ''}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                placeholder="Descrição"
                                autoComplete="off"
                            />
                            <label>Localização:</label>
                            <InputField
                                name="location"
                                value={editData.location || ''}
                                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                placeholder="Localização"
                                autoComplete="off"
                            />
                            <label>Data de Início:</label>
                            <InputField
                                type="date"
                                name="startDate"
                                value={editData.startDate || ''}
                                onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
                            />
                            <label>Data de Término:</label>
                            <InputField
                                type="date"
                                name="endDate"
                                value={editData.endDate || ''}
                                onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
                            />
                            <label>Requisitos:</label>
                            <InputField
                                name="requirements"
                                value={editData.requirements.join(', ') || ''}
                                onChange={(e) => setEditData({ ...editData, requirements: e.target.value.split(',').map(req => req.trim()) })}
                                placeholder="Requisitos (separe por vírgula)"
                                autoComplete="off"
                            />
                        </>
                    )}

                    {selectedEntity === 'volunteers' && (
                        <>
                            <label>Nome:</label>
                            <InputField
                                name="name"
                                value={editData.name || ''}
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                placeholder="Nome"
                                autoComplete="off"
                            />
                            <label>Email:</label>
                            <InputField
                                name="email"
                                value={editData.email || ''}
                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                placeholder="Email"
                                autoComplete="email"
                            />
                            <label>Telefone:</label>
                            <InputField
                                name="phone"
                                value={editData.phone || ''}
                                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                placeholder="Telefone"
                                autoComplete="off"
                            />
                            <label>Interesses:</label>
                            <InputField
                                name="interests"
                                value={editData.interests || ''}
                                onChange={(e) => setEditData({ ...editData, interests: e.target.value.split(',').map(interest => interest.trim()) })}
                                placeholder="Interesses (separe por vírgula)"
                                autoComplete="off"
                            />
                        </>
                    )}

                    <Button type="submit" label="Salvar" />
                    <Button onClick={handleCancel} label="Cancelar" />
                </form>
            )}
        </>
    );
}
