'use strict';

var _search = require('./search');

var _album = require('./album');

module.exports = {
  searchAlbums: _search.searchAlbums,
  searchPlaylists: _search.searchPlaylists,
  searchTracks: _search.searchTracks,
  searchArtists: _search.searchArtists,
  getAlbum: _album.getAlbum,
  getAlbumTracks: _album.getAlbumTracks,
  getAlbums: _album.getAlbums
};