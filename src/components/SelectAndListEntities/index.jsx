import React, { useState, useEffect } from 'react';
import { getONGs, updateONG, deleteONG } from '../../services/ongService';
import { getOpportunities, updateOpportunity, deleteOpportunity } from '../../services/opportunityService';
import { getVolunteers, updateVolunteer, deleteVolunteer } from '../../services/volunteerService';
import InputField from '../../components/InputField';
import Button from '../button';

export default function ListEntities() {
    const [selectedEntity, setSelectedEntity] = useState('');
    const [entities, setEntities] = useState([]);
    const [editData, setEditData] = useState(null);
    const [expandedEntity, setExpandedEntity] = useState(null); // Estado para controle de "Mostrar Mais"
    const [ongs, setONGs] = useState([]); // Armazena as ONGs
    const [opportunities, setOpportunities] = useState([]); // Armazena as Oportunidades

    // Função para buscar ONGs e Oportunidades ao carregar a página
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

    const handleSelectChange = (e) => {
        setSelectedEntity(e.target.value);
        setEditData(null);
        setExpandedEntity(null); // Reseta o estado de "Mostrar Mais" ao trocar de entidade
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
                response = await updateONG(editData.id, editData);
            } else if (selectedEntity === 'opportunities') {
                response = await updateOpportunity(editData.id, editData);
            } else if (selectedEntity === 'volunteers') {
                response = await updateVolunteer(editData.id, editData);
            }

            console.log("Atualização bem-sucedida:", response);
            fetchEntities(selectedEntity); // Recarrega os dados
            setEditData(null); // Limpa os dados após a atualização
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
            fetchEntities(selectedEntity); // Recarrega os dados
        } catch (error) {
            console.error("Erro ao remover:", error.message);
        }
    };

    const handleExpand = (entity) => {
        setExpandedEntity(expandedEntity === entity.id ? null : entity.id); // Alterna o estado de "Mostrar Mais"
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
            <select value={selectedEntity} onChange={handleSelectChange}>
                <option value="">Selecione uma opção</option>
                <option value="ongs">ONGs</option>
                <option value="opportunities">Oportunidades</option>
                <option value="volunteers">Voluntários</option>
            </select>

            <div>
                {entities.map((entity) => (
                    <div key={entity.id} className="entity-card">
                        <h2>{entity.name || entity.title}</h2>

                        {/* Exibe informações adicionais com "Mostrar Mais" */}
                        {expandedEntity === entity.id && (
                            <div className="entity-details">
                                {selectedEntity === 'ongs' && (
                                    <>
                                        <p><strong>Descrição:</strong> {entity.description}</p>
                                        <p><strong>Localização:</strong> {entity.location}</p>
                                        <p><strong>Website:</strong> <a href={entity.website} target="_blank" rel="noopener noreferrer">{entity.website}</a></p>
                                        <p><strong>Email de Contato:</strong> {entity.contactEmail}</p>
                                    </>
                                )}

                                {selectedEntity === 'opportunities' && (
                                    <>
                                        <p><strong>Descrição:</strong> {entity.description}</p>
                                        <p><strong>Data de Início:</strong> {entity.startDate}</p>
                                        <p><strong>Data de Término:</strong> {entity.endDate}</p>
                                        <p><strong>Requisitos:</strong> {entity.requirements.join(', ')}</p>
                                        <p><strong>ONGs Vinculadas:</strong> {getONGName(entity.ongId)}</p>
                                    </>
                                )}

                                {selectedEntity === 'volunteers' && (
                                    <>
                                        <p><strong>Email:</strong> {entity.email}</p>
                                        <p><strong>Telefone:</strong> {entity.phone}</p>
                                        <p><strong>Interesses:</strong> {entity.interests}</p>
                                        <p><strong>ONG Vinculada:</strong> {getONGName(entity.ongId)}</p>
                                        <p><strong>Oportunidade Vinculada:</strong> {getOpportunityTitle(entity.opportunityId)}</p>
                                    </>
                                )}
                            </div>
                        )}

                        <button onClick={() => handleExpand(entity)}>
                            {expandedEntity === entity.id ? "Mostrar Menos" : "Mostrar Mais"}
                        </button>
                        <button onClick={() => handleEdit(entity)}>Editar</button>
                        <button onClick={() => handleDelete(entity.id)}>Remover</button>
                    </div>
                ))}
            </div>

            {editData && (
                <form onSubmit={handleUpdate}>
                    <InputField
                        name={selectedEntity === 'opportunities' ? "title" : "name"}
                        value={selectedEntity === 'opportunities' ? editData.title : editData.name}
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
