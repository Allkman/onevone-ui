import Person from './Person';

export default interface Player {
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
  person: Person | null;
  }