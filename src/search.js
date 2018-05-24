/* global fetch */

import { API_URL } from './config';
import { toJson } from './utils';

export const search = (query, type) =>
  fetch(`${API_URL}search?q=${query}&type=${type}`).then(toJson);

export const searchArtists = query => search(query, 'artists');
export const searchAlbums = query => search(query, 'albums');
export const searchTracks = query => search(query, 'tracks');
export const searchPlaylists = query => search(query, 'playlists');
