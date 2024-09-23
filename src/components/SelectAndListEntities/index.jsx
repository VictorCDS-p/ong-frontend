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
    const [editData, setEditData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (selectedEntity) {
            fetchEntities(selectedEntity);
        }
    }, [selectedEntity]);

    const fetchEntities = async (entityType) => {
        let data = [];
        try {
            if (entityType === 'ongs') {
                data = await getONGs();
                setEntities(data.ongList || []);
            } else if (entityType === 'opportunities') {
                data = await getOpportunities();
                const opportunities = data.opportunities.map(opportunity => ({
                    ...opportunity,
                    requirements: typeof opportunity.requirements === 'string'
                        ? opportunity.requirements.split(',').map(req => req.trim())
                        : opportunity.requirements || []
                }));
                setEntities(opportunities);
            } else if (entityType === 'volunteers') {
                data = await getVolunteers();
                setEntities(data.volunteers || []);
            }
        } catch (error) {
            console.error(`Erro ao buscar ${entityType}:`, error.message);
        }
    };


    const handleSelectChange = (value) => {
        setSelectedEntity(value);
        resetEditData();
    };

    const resetEditData = () => {
        setEditData({});
        setIsEditing(false);
        setSearchTerm('');
    };

    const handleEdit = (entity) => {
        setEditData(entity);
        setIsEditing(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editData.id) return;

        try {
            if (selectedEntity === 'ongs') {
                await updateONG(editData.id, editData);
            } else if (selectedEntity === 'opportunities') {
                if (editData.startDate > editData.endDate) {
                    alert('A data de início não pode ser maior que a data de término.');
                    return;
                }
                await updateOpportunity(editData.id, editData);
            } else if (selectedEntity === 'volunteers') {
                await updateVolunteer(editData.id, editData);
            }
            fetchEntities(selectedEntity);
            resetEditData();
        } catch (error) {
            console.error('Erro ao atualizar:', error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!id) return;
        try {
            if (selectedEntity === 'ongs') {
                await deleteONG(id);
            } else if (selectedEntity === 'opportunities') {
                await deleteOpportunity(id);
            } else if (selectedEntity === 'volunteers') {
                await deleteVolunteer(id);
            }
            fetchEntities(selectedEntity);
        } catch (error) {
            console.error('Erro ao remover:', error.message);
        }
    };

    const filteredEntities = entities.filter(entity => {
        const nameOrTitle = entity.name || entity.title || '';
        return nameOrTitle.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <>
            <SelectDropdown
                label="Selecione uma entidade"
                name="entitySelect"
                value={selectedEntity}
                options={[
                    { id: 'ongs', name: 'ONGs' },
                    { id: 'opportunities', name: 'Oportunidades' },
                    { id: 'volunteers', name: 'Voluntários' }
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
                                        <a href={entity.website?.startsWith('http') ? entity.website : `http://${entity.website}`} target="_blank" rel="noopener noreferrer">
                                            {entity.website}
                                        </a>
                                    </p>
                                    <p><strong>Email de Contato:</strong> {entity.contactEmail}</p>
                                </>
                            )}
                            {selectedEntity === 'opportunities' && (
                                <>
                                    <p><strong>Descrição:</strong> {entity.description}</p>
                                    <p><strong>Data de Início:</strong> {entity.startDate}</p>
                                    <p><strong>Data de Término:</strong> {entity.endDate}</p>
                                    <p><strong>Requisitos:</strong> {(Array.isArray(entity.requirements) && entity.requirements.length > 0) ? entity.requirements.join(', ') : 'Nenhum requisito'}</p>
                                </>
                            )}
                            {selectedEntity === 'volunteers' && (
                                <>
                                    <p><strong>Email:</strong> {entity.email}</p>
                                    <p><strong>Telefone:</strong> {entity.phone}</p>
                                    <p><strong>Interesses:</strong> {entity.interests?.join(', ') || 'Nenhum interesse'}</p>
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
                            />
                            <label>Descrição:</label>
                            <InputField
                                name="description"
                                value={editData.description || ''}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                placeholder="Descrição"
                            />
                            <label>Localização:</label>
                            <InputField
                                name="location"
                                value={editData.location || ''}
                                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                placeholder="Localização"
                            />
                            <label>Website:</label>
                            <InputField
                                name="website"
                                value={editData.website || ''}
                                onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                                placeholder="Website"
                            />
                            <label>Email de Contato:</label>
                            <InputField
                                name="contactEmail"
                                value={editData.contactEmail || ''}
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
                                value={editData.title || ''}
                                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                placeholder="Título"
                            />
                            <label>Descrição:</label>
                            <InputField
                                name="description"
                                value={editData.description || ''}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                placeholder="Descrição"
                            />
                            <label>Data de Início:</label>
                            <input
                                type="date"
                                name="startDate"
                                value={editData.startDate || ''}
                                onChange={(e) => {
                                    const newStartDate = e.target.value;
                                    if (new Date(newStartDate) > new Date(editData.endDate)) {
                                        alert('A data de início não pode ser maior que a data de término.');
                                    } else {
                                        setEditData({ ...editData, startDate: newStartDate });
                                    }
                                }}
                            />

                            <label>Data de Término:</label>
                            <input
                                type="date"
                                name="endDate"
                                value={editData.endDate || ''}
                                onChange={(e) => {
                                    const newEndDate = e.target.value;
                                    if (new Date(newEndDate) < new Date(editData.startDate)) {
                                        alert('A data de término não pode ser menor que a data de início.');
                                    } else {
                                        setEditData({ ...editData, endDate: newEndDate });
                                    }
                                }}
                            />
                            <label>Requisitos:</label>
                            {editData.requirements?.map((req, index) => (
                                <InputField
                                    key={index}
                                    name={`requirement-${index}`}
                                    value={req}
                                    onChange={(e) => {
                                        const newRequirements = [...editData.requirements];
                                        newRequirements[index] = e.target.value;
                                        setEditData({ ...editData, requirements: newRequirements });
                                    }}
                                    placeholder={`Requisito ${index + 1}`}
                                />
                            ))}
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
                            />
                            <label>Email:</label>
                            <InputField
                                name="email"
                                value={editData.email || ''}
                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                placeholder="Email"
                            />
                            <label>Telefone:</label>
                            <InputField
                                name="phone"
                                value={editData.phone || ''}
                                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                placeholder="Telefone"
                            />
                            <label>Interesses:</label>
                            {editData.interests?.map((interest, index) => (
                                <InputField
                                    key={index}
                                    name={`interest-${index}`}
                                    value={interest}
                                    onChange={(e) => {
                                        const newInterests = [...editData.interests];
                                        newInterests[index] = e.target.value;
                                        setEditData({ ...editData, interests: newInterests });
                                    }}
                                    placeholder={`Interesse ${index + 1}`}
                                />
                            ))}
                        </>
                    )}

                    <Button type="submit" label="Salvar" />
                    <Button type="button" label="Cancelar" onClick={resetEditData} />
                </form>
            )}


        </>
    );
}
