import React, { useState } from 'react';
import './TeamPlayersDropdown.css';

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

interface TeamPlayersDropdownProps {
  teams: Team[];
  selectedTeam: string | undefined;
  selectedTeamPlayer: string | undefined;
  onTeamChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onTeamPlayerChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  teamPlayers: Player[];
}

const TeamPlayersDropdown: React.FC<TeamPlayersDropdownProps> = ({
  teams,
  selectedTeam,
  selectedTeamPlayer,
  onTeamChange,
  onTeamPlayerChange,
  teamPlayers,
}) => {

  const getTeamPlayersForSelectedTeam = () => {
    return teamPlayers.filter((tp) => tp.teamId === selectedTeam);
  };

  return (
<div className="team-players-dropdown">
  <select className="mb-3" value={selectedTeam ?? ''} onChange={onTeamChange}>
    <option value="">Select a team</option>
    {teams.map((team) => (
      <option key={team.id} value={team.id}>
        {team.teamName}
      </option>
    ))}
  </select>
  <select value={selectedTeamPlayer ?? ''} onChange={onTeamPlayerChange} disabled={!selectedTeam}>
    <option value="">Select a player</option>
    {getTeamPlayersForSelectedTeam().map((tp) => (
      <option key={tp?.id} value={tp?.id ?? ''}>
        {tp.person?.firstName} {tp.person?.lastName}
      </option>
    ))}
  </select>
</div>


  );
};

export default TeamPlayersDropdown;