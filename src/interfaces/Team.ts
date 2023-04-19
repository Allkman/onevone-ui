import Player from "./Player";

export default interface Team {
    id: string;
    teamName: string;
    city: string;
    country: string;
    teamPlayers: Player[];
  }