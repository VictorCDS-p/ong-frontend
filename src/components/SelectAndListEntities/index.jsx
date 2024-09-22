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
    const [ongs, setONGs] = useState([]);
    const [opportunities, setOpportunities] = useState([]);

    const fetchEntities = async (entityType) => {
        try {
            let data = [];
            if (entityType === 'ongs') {
                const response = await getONGs();
                data = response.ongList || [];
                setONGs(data);
            } else if (entityType === 'opportunities') {
                const response = await getOpportunities();
                data = response.opportunities || [];
                setOpportunities(data);
            } else if (entityType === 'volunteers') {
                const response = await getVolunteers();
                data = response.volunteers || [];
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
        setEditData({ requirements: [], interests: [] });
        setIsEditing(false);
    };

    const handleEdit = (entity) => {
        setEditData({ ...entity, requirements: entity.requirements || [], interests: entity.interests || [] });
        setIsEditing(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editData) return;

        try {
            let response;
            if (selectedEntity === 'ongs') {
                response = await updateONG(editData.id, editData);
            } else if (selectedEntity === 'opportunities') {
                response = await updateOpportunity(editData.id, editData);
            } else if (selectedEntity === 'volunteers') {
                response = await updateVolunteer(editData.id, editData);
            }

            console.log("Atualização bem-sucedida:", response);
            fetchEntities(selectedEntity);
            setEditData({ requirements: [], interests: [] });
            setIsEditing(false);
        } catch (error) {
            console.error("Erro ao atualizar:", error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            let response;
            if (selectedEntity === 'ongs') {
                response = await deleteONG(id);
            } else if (selectedEntity === 'opportunities') {
                response = await deleteOpportunity(id);
            } else if (selectedEntity === 'volunteers') {
                response = await deleteVolunteer(id);
            }

            console.log("Remoção bem-sucedida:", response);
            fetchEntities(selectedEntity);
        } catch (error) {
            console.error("Erro ao remover:", error.message);
        }
    };

    const handleCancel = () => {
        setEditData({ requirements: [], interests: [] });
        setIsEditing(false);
    };

    const getONGName = (ongId) => {
        const ong = ongs.find(o => o.id === ongId);
        return ong ? ong.name : "Não vinculada";
    };

    const getOpportunityTitle = (opportunityId) => {
        const opportunity = opportunities.find(o => o.id === opportunityId);
        return opportunity ? opportunity.title : "Não vinculada";
    };

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

            <div className="entitiesContainer">
                {entities.map((entity) => (
                    <div key={entity.id} className="entityCard">
                        <h2>{entity.name || entity.title}</h2>

                        <div className="entityDetails">
                            {selectedEntity === 'ongs' && (
                                <>
                                    <p><strong>Descrição:</strong> {entity.description}</p>
                                    <p><strong>Localização:</strong> {entity.location}</p>
                                    <p><strong>Website:</strong><a href={entity.website.startsWith('http') ? entity.website : `http://${entity.website}`}target="_blank"rel="noopener noreferrer"> {entity.website}</a></p>
                                    <p><strong>Email de Contato:</strong> {entity.contactEmail}</p>
                                </>
                            )}

                            {selectedEntity === 'opportunities' && (
                                <>
                                    <p><strong>Descrição:</strong> {entity.description}</p>
                                    <p><strong>Data de Início:</strong> {entity.startDate}</p>
                                    <p><strong>Data de Término:</strong> {entity.endDate}</p>
                                    <p>
                                        <strong>Requisitos:</strong>
                                        {Array.isArray(entity.requirements) && entity.requirements.length > 0
                                            ? entity.requirements.join(', ')
                                            : 'Nenhum requisito'}
                                    </p>
                                    <p><strong>ONGs Vinculadas:</strong> {getONGName(entity.ongId)}</p>
                                </>
                            )}

                            {selectedEntity === 'volunteers' && (
                                <>
                                    <p><strong>Email:</strong> {entity.email}</p>
                                    <p><strong>Telefone:</strong> {entity.phone}</p>
                                    <p>
                                        <strong>Interesses:</strong>
                                        {Array.isArray(entity.interests) ? entity.interests.join(', ') : 'Nenhum interesse'}
                                    </p>
                                    <p><strong>ONG Vinculada:</strong> {getONGName(entity.ongId)}</p>
                                    <p><strong>Oportunidade Vinculada:</strong> {getOpportunityTitle(entity.opportunityId)}</p>
                                </>
                            )}
                        </div>

                        <button onClick={() => handleEdit(entity)}>Editar</button>
                        <button onClick={() => handleDelete(entity.id)}>Remover</button>
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
                                value={editData.name}
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                placeholder="Nome"
                            />
                            <label>Descrição:</label>
                            <InputField
                                name="description"
                                value={editData.description}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                placeholder="Descrição"
                            />
                            <label>Localização:</label>
                            <InputField
                                name="location"
                                value={editData.location}
                                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                placeholder="Localização"
                            />
                            <label>Website:</label>
                            <InputField
                                name="website"
                                value={editData.website}
                                onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                                placeholder="Website"
                            />
                            <label>Email de Contato:</label>
                            <InputField
                                name="contactEmail"
                                value={editData.contactEmail}
                                onChange={(e) => setEditData({ ...editData, contactEmail: e.target.value })}
                                placeholder="Email de Contato"
                            />
                        </>
                    )}

                    {selectedEntity === 'opportunities' && (
                        <>
                            <label>Título:</label>
                            <InputField
                                name="title"
                                value={editData.title}
                                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                placeholder="Título"
                            />
                            <label>Descrição:</label>
                            <InputField
                                name="description"
                                value={editData.description}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                placeholder="Descrição"
                            />
                            <label>Data de Início:</label>
                            <input
                                type="date"
                                name="startDate"
                                value={editData.startDate}
                                onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
                            />
                            <label>Data de Término:</label>
                            <input
                                type="date"
                                name="endDate"
                                value={editData.endDate}
                                onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
                            />
                            <label>Requisitos:</label>
                            <InputField
                                name="requirements"
                                value={Array.isArray(editData.requirements) ? editData.requirements.join(', ') : ''}
                                onChange={(e) => setEditData({ ...editData, requirements: e.target.value.split(',').map(req => req.trim()) })}
                                placeholder="Requisitos (separe com vírgulas)"
                            />
                        </>
                    )}

                    {selectedEntity === 'volunteers' && (
                        <>
                            <label>Nome:</label>
                            <InputField
                                name="name"
                                value={editData.name}
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                placeholder="Nome"
                            />
                            <label>Email:</label>
                            <InputField
                                name="email"
                                value={editData.email}
                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                placeholder="Email"
                            />
                            <label>Telefone:</label>
                            <InputField
                                name="phone"
                                value={editData.phone}
                                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                placeholder="Telefone"
                            />
                            <label>Interesses:</label>
                            <InputField
                                name="interests"
                                value={editData.interests.join(', ')}
                                onChange={(e) => setEditData({ ...editData, interests: e.target.value.split(',').map(i => i.trim()) })}
                                placeholder="Interesses (separe com vírgulas)"
                            />
                        </>
                    )}

                    <Button type="submit" label="Atualizar" />
                    <Button type="button" label="Cancelar" onClick={handleCancel} />
                </form>
            )}
        </>
    );
}
