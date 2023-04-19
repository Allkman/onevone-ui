import React, { useEffect, useState } from 'react';
import Player from '../interfaces/Player';
import axios from 'axios';
import './PlayerCard.css';
import PlayerImage from '../interfaces/PlayerImage';

interface PlayerCardProps {
    playerId: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ playerId }) => {

    const [player, setPlayer] = useState<Player | null>(null);
    const [playerImage, setPlayerImage] = useState<PlayerImage | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const [playerResponse, playerImageResponse] = await Promise.all([
                    axios.get<Player>(`https://localhost:5001/Player/${playerId}`),
                    axios.get<PlayerImage>(`https://localhost:5001/PlayerImage?playerId=${playerId}`)
                ]) 
                setPlayer(playerResponse.data);
                setPlayerImage(playerImageResponse.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchPlayer();
    }, [playerId]);

    if (loading) {
        return <div>Loading player details...</div>;
    }

    if (!player) {
        return <div>Player not found.</div>;
    }

    return (
        <div className="card mb-3 custom-shadow">
            <div className="card-inner-border">
                <div className="card-body text-dark">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex justify-content-center">
                                <img src={`data:image/png;base64,${playerImage?.image}`} alt="Player" className="player-image"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 player-name">
                        <p>
                            {player.person?.firstName} {player.person?.lastName}
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-flex justify-content-center">Inside Scoring</div>
                            <div className="d-flex justify-content-center">{player.insideScoring}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex justify-content-center">Defending</div>
                            <div className="d-flex justify-content-center">{player.defending}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-flex justify-content-center">Outside Scoring</div>
                            <div className="d-flex justify-content-center">{player.outsideScoring}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex justify-content-center">Rebounding</div>
                            <div className="d-flex justify-content-center">{player.rebounding}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-flex justify-content-center">Playmaking</div>
                            <div className="d-flex justify-content-center">{player.playmaking}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex justify-content-center">Athleticism</div>
                            <div className="d-flex justify-content-center">{player.athleticism}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;