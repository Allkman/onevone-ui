import React, { useState } from 'react';
import Game from './GameRoom/Game';

const App: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');

  return (
    <div>
      {/* <TeamPlayersDropdown /> */}
      <Game />
    </div>
  );
};

export default App;
