export default interface PlayerImage {
    id: string;
    image: Uint8Array | null;
    playerId: string | null;
}