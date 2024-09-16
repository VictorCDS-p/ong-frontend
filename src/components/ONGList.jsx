import React, { useEffect, useState } from 'react';
import { getONGs } from '../services/ongService';

function ONGList() {
    const [ongs, setONGs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(ongs);

    useEffect(() => {
        const fetchONGs = async () => {
            try {
                const data = await getONGs();
                setONGs(data.ongList || []);
                setLoading(false);
            } catch (error) {
                setError('Erro ao carregar ONGs');
                setLoading(false);
            }
        }
        fetchONGs();
    }, []);

    if (loading) {
        return <div>Carregando ONGs...</div>;
      }

      if (error) {
        return <div>{error}</div>;
      }

    return (
        <>
            <h1>Lista de ONGs</h1>
            {ongs.map((ong) => (
                <div key={ong.id}>
                    <h2>{ong.name}</h2>
                    <p>{ong.description}</p>
                    <p>{ong.location}</p>
                    <a href={ong.website} target="_blank" rel="noopener noreferrer">
                        Visitar site
                    </a>
                </div>
            ))}
        </>
    )
}

export default ONGList;


