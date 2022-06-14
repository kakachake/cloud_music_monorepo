import { ArtistType } from './artist';
export interface MVType {
    id: string;
    cover: string;
    name: string;
    playCount: number;
    briefDesc?: any;
    desc?: any;
    artistName: string;
    artistId: number;
    duration: number;
    mark: number;
    subed: boolean;
    artists: ArtistType[];
}
