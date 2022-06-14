import { AlbumType } from './album';
import { ArtistType } from './artist';
export interface SongType {
    id: number;
    name: string;
    ar?: ArtistType[];
    al?: AlbumType;
    dt: number;
}
