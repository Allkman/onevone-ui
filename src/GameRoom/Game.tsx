import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamPlayersDropdown from './TeamPlayersDropdown';
import './Game.css';
import ActionButton from './ActionButton';
import './ActionButton.css';
import PlayerCard from '../PlayerCard/PlayerCard';

interface Person {
    id: string;
    firstName: string;
    lastName: string
}

interface Player {
    id: string;
    position: string | null;
    outsideScoring: number;
    insideScoring: number;
    defending: number;
    athleticism: number;
    playmaking: number;
    rebounding: number;
    isAttacker: boolean;
    teamId: string;
    person: Person | null | undefined;
}

interface Team {
    id: number;
    teamName: string;
    city: string;
    country: string;
    teamPlayers: Player[];
}

interface TeamPlayers {
    [teamId: string]: Player[];
}

const Game: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeamOne, setSelectedTeamOne] = useState<string>();
    const [selectedTeamTwo, setSelectedTeamTwo] = useState<string>();
    const [selectedPlayerOne, setSelectedPlayerOne] = useState<string | undefined>(undefined);
    const [selectedPlayerTwo, setSelectedPlayerTwo] = useState<string | undefined>(undefined);
    const [teamPlayers, setTeamPlayers] = useState<TeamPlayers>({});
    const [coinTossClicked, setCoinTossClicked] = useState(false);

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await axios.get('https://localhost:5001/Team');
            setTeams(response.data);
        };
        fetchTeams();
    }, []);

    useEffect(() => {
        const fetchTeamPlayers = async (teamId: string | undefined) => {
            if (teamId) {
                const response = await axios.get<Player[]>(`https://localhost:5001/Player/teamplayers/${teamId}`);
                setTeamPlayers((prevTeamPlayers) => ({
                    ...prevTeamPlayers,
                    [teamId]: response.data,
                }));
            }
        };

        fetchTeamPlayers(selectedTeamOne);
        fetchTeamPlayers(selectedTeamTwo);
    }, [selectedTeamOne, selectedTeamTwo]);

    const handleTeamOneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTeamOne(event.target.value);
        setSelectedPlayerOne(undefined);
    };

    const handleTeamTwoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTeamTwo(event.target.value);
        setSelectedPlayerTwo(undefined);
    };

    const handlePlayerOneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPlayerId = event.target.value.toString();
        if (selectedPlayerId !== selectedPlayerOne) {
            setSelectedPlayerOne(selectedPlayerId);
        }
    };

    const handlePlayerTwoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPlayerId = event.target.value.toString();
        if (selectedPlayerId !== selectedPlayerTwo) {
            setSelectedPlayerTwo(selectedPlayerId);
        }
    };

    const getTeamPlayersForSelectedTeamOne = () => {
        return selectedTeamOne ? teamPlayers[selectedTeamOne] || [] : [];
    };

    const getTeamPlayersForSelectedTeamTwo = () => {
        return selectedTeamTwo ? teamPlayers[selectedTeamTwo] || [] : [];
    };

    const sendPlayerIdsForCoinToss = async (playerOneId: string, playerTwoId: string) => {
        try {
            const response = await axios.put(`https://localhost:5001/Game/CoinToss?playerOneId=${playerOneId}&playerTwoId=${playerTwoId}`, {
                playerOneId,
                playerTwoId
            });
            console.log(response.data); // Handle response data as needed
        } catch (error) {
            console.error(error);
            // Handle error as needed
        }
    }
    const sendPlayerIdsToPlayGame = async (playerOneId: string, playerTwoId: string) => {
        try {
            const response = await axios.post(`https://localhost:5001/Game/PlayGame?playerOneId=${playerOneId}&playerTwoId=${playerTwoId}`)
        } catch (error) {
            console.error(error)
        }
    }
    const handleClick = () => {
        if (selectedPlayerOne && selectedPlayerTwo) {
            sendPlayerIdsForCoinToss(selectedPlayerOne, selectedPlayerTwo);
            setCoinTossClicked(true); // Set coinTossClicked to true when the CoinToss button is clicked

            console.log(selectedPlayerOne, selectedPlayerTwo)
        }
    }
    const handlePlayGameClick = () => {
        if (coinTossClicked && selectedPlayerOne && selectedPlayerTwo) {
            sendPlayerIdsToPlayGame(selectedPlayerOne, selectedPlayerTwo);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="d-flex justify-content-center">
                    <h1>One on One</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 mb-2">
                    <TeamPlayersDropdown
                        teams={teams}
                        selectedTeam={selectedTeamOne}
                        selectedTeamPlayer={selectedPlayerOne}
                        onTeamChange={handleTeamOneChange}
                        onTeamPlayerChange={handlePlayerOneChange}
                        teamPlayers={getTeamPlayersForSelectedTeamOne()}
                    />
                </div>
                <div className="col-md-4 mb-2">
                    <div className="col-md-12 text-center">
                        <ActionButton
                            onClick={handleClick}
                            disabled={!selectedPlayerOne || !selectedPlayerTwo}
                            className="coin-toss-button">
                            Flip a coin
                        </ActionButton>
                    </div>
                    <div className="col-md-12 text-center mt-2">
                        <ActionButton
                            onClick={handlePlayGameClick}
                            disabled={!coinTossClicked || !selectedPlayerOne || !selectedPlayerTwo}
                            className="play-game-button">
                            Play Game
                        </ActionButton>
                    </div>
                </div>
                <div className="col-md-4">
                    <TeamPlayersDropdown
                        teams={teams}
                        selectedTeam={selectedTeamTwo}
                        selectedTeamPlayer={selectedPlayerTwo}
                        onTeamChange={handleTeamTwoChange}
                        onTeamPlayerChange={handlePlayerTwoChange}
                        teamPlayers={getTeamPlayersForSelectedTeamTwo()}
                    />
                </div>
            </div>

            <div className="row">
                <div className="d-flex justify-content-start col-md-6 mt-2">
                    {selectedPlayerOne && (
                        <PlayerCard playerId={selectedPlayerOne} />
                    )}
                </div>
                <div className="d-flex justify-content-end col-md-6 mt-2">
                    {selectedPlayerTwo && (
                        <PlayerCard playerId={selectedPlayerTwo} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Game;
