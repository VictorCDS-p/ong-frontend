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
    const [ongs, setONGs] = useState([]);
    const [opportunities, setOpportunities] = useState([]);
    const [editData, setEditData] = useState({ interests: [] });
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchONGs();
        fetchOpportunities();
    }, []);

    useEffect(() => {
        if (selectedEntity) {
            fetchEntities(selectedEntity);
        }
    }, [selectedEntity]);

    const fetchONGs = async () => {
        try {
            const data = await getONGs();
            setONGs(data.ongList || []);
        } catch (error) {
            console.error('Erro ao buscar ONGs:', error.message);
        }
    };

    const fetchOpportunities = async () => {
        try {
            const data = await getOpportunities();
            const opportunitiesList = data.opportunities.map(opportunity => ({
                ...opportunity,
                requirements: typeof opportunity.requirements === 'string'
                    ? opportunity.requirements.split(',').map(req => req.trim())
                    : opportunity.requirements || [],
            }));
            setOpportunities(opportunitiesList);
        } catch (error) {
            console.error('Erro ao buscar oportunidades:', error.message);
        }
    };


    const fetchEntities = async (entityType) => {
        let data = [];
        try {
            if (entityType === 'ongs') {
                data = await getONGs();
                setEntities(data.ongList || []);
            } else if (entityType === 'opportunities') {
                data = await getOpportunities();
                const opportunitiesList = data.opportunities.map(opportunity => ({
                    ...opportunity,
                    requirements: typeof opportunity.requirements === 'string'
                        ? opportunity.requirements.split(',').map(req => req.trim())
                        : opportunity.requirements || [],
                    ongs: ongs.filter(ong => opportunity.ongId === ong.id)
                }));
                setOpportunities(opportunitiesList);
                setEntities(opportunitiesList);
            } else if (entityType === 'volunteers') {
                data = await getVolunteers();
                const volunteersList = data.volunteers.map(volunteer => ({
                    ...volunteer,
                    interests: Array.isArray(volunteer.interests) ? volunteer.interests : volunteer.interests.split(',').map(i => i.trim()),
                    opportunities: opportunities.filter(op => volunteer.opportunityId === op.id)
                }));

                setEntities(volunteersList);
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
                                    <p><strong>Requisitos:</strong> {Array.isArray(entity.requirements) && entity.requirements.length > 0 ? entity.requirements.join(', ') : 'Nenhum requisito'}</p>
                                    <p><strong>ONG Vinculada:</strong> {Array.isArray(entity.ongs) && entity.ongs.length > 0 ? entity.ongs.map(ong => ong.name).join(', ') : 'Nenhuma ONG vinculada'}</p>
                                </>
                            )}

                            {selectedEntity === 'volunteers' && (
                                <>
                                    <p><strong>Email:</strong> {entity.email || 'Email não disponível'}</p>
                                    <p><strong>Telefone:</strong> {entity.phone || 'Telefone não disponível'}</p>
                                    <p><strong>Interesses:</strong> {Array.isArray(entity.interests) && entity.interests.length > 0 ? entity.interests.join(', ') : 'Nenhum interesse'}</p>
                                    <p><strong>Oportunidade Vinculada:</strong> {entity.opportunityId ? opportunities.find(op => op.id === entity.opportunityId)?.title || 'Nenhuma oportunidade vinculada' : 'Nenhuma oportunidade vinculada'}</p>
                                    <p><strong>ONG Vinculada:</strong> {ongs.find(ong => ong.id === entity.ongId)?.name || 'Nenhuma ONG vinculada'}</p>
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
                                value={editData.requirements?.join(', ') || ''}
                                onChange={(e) => setEditData({ ...editData, requirements: e.target.value.split(',').map(req => req.trim()) })}
                                placeholder="Requisitos"
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
                            <InputField
                                name="interests"
                                value={Array.isArray(editData.interests) ? editData.interests.join(', ') : ''}
                                onChange={(e) => setEditData({ ...editData, interests: e.target.value.split(',').map(i => i.trim()) })}
                                placeholder="Interesses"
                            />
                        </>
                    )}
                    <Button type="submit" label="Salvar" />
                    <Button type="button" onClick={resetEditData} label="Cancelar" />
                </form>
            )}
        </>
    );
}
