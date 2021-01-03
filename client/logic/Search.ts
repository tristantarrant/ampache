import axios from 'axios';
import { Song } from './Song';
import { AuthKey } from './Auth';
import { Album } from './Album';
import { Artist } from '~logic/Artist';

const searchSongs = (searchQuery: string, authKey: AuthKey, limit = 100) => {
    return axios
        .get(
            `${process.env.ServerURL}/server/json.server.php?action=search_songs&filter=${searchQuery}&limit=${limit}&auth=${authKey}&version=400001`
        )
        .then((response) => {
            const JSONData = response.data;
            if (!JSONData) {
                throw new Error('Server Error');
            }
            if (JSONData.error) {
                throw new Error(JSONData.error);
            }
            return JSONData.song as Song[];
        });
};

//Finds albums by matching either artist name or album name.
const searchAlbums = (searchQuery: string, authKey: AuthKey, limit = 100) => {
    return axios
        .get(
            `${process.env.ServerURL}/server/json.server.php?action=advanced_search&rule_1=title&rule_1_operator=0&rule_1_input=${searchQuery}&rule_2=artist&rule_2_operator=0&rule_2_input=${searchQuery}&type=album&operator=or&limit=${limit}&auth=${authKey}&version=400001
            `
        )
        .then((response) => {
            const JSONData = response.data;
            if (!JSONData) {
                throw new Error('Server Error');
            }
            if (JSONData.error) {
                throw new Error(JSONData.error);
            }
            return JSONData.album as Album[];
        });
};

//Finds artist by matching artist name. TODO: Need a way to match by album/song name
const searchArtists = (searchQuery: string, authKey: AuthKey, limit = 100) => {
    return axios
        .get(
            `${process.env.ServerURL}/server/json.server.php?action=advanced_search&rule_1=title&rule_1_operator=0&rule_1_input=${searchQuery}&type=artist&operator=or&limit=${limit}&auth=${authKey}&version=400001
            `
        )
        .then((response) => {
            const JSONData = response.data;
            if (!JSONData) {
                throw new Error('Server Error');
            }
            if (JSONData.error) {
                throw new Error(JSONData.error);
            }
            return JSONData.artist as Artist[];
        });
};

export { searchSongs, searchAlbums, searchArtists };
