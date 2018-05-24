import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/search';

describe('Search', () => {

  let fetchedStub;
  let promise;

  beforeEach( () => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach( () => {
    fetchedStub.restore();
  });

  it('should call fetch function', () => {
    const artists = search();
    expect(fetchedStub).to.have.been.calledOnce;
  });

  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    it('should call fetch with the correct URL', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const albums = search('Incubus', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });

    it('should return the JSON Data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Incubus', 'artist');

      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('Search Albums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('album');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albuns = searchAlbums('Death Magnetic');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Death Magnetic&type=albums');

      const albums2 = searchAlbums('Dark Side Of The Moon');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Dark Side Of The Moon&type=albums');
    });
  });

  describe('Search Artists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Wesley Safadao');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Wesley Safadao');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Wesley Safadao&type=artists');

      const artists2 = searchArtists('Avioes');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Avioes&type=artists');
    });
  });

  describe('Search Tracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('track');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = searchTracks('Que pais é esse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Que pais é esse&type=tracks');

      const tracks2 = searchTracks('vida loka');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=vida loka&type=tracks');
    });
  });

  describe('Search Playlists', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists('playlist');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const playlists = searchPlaylists('sertanejo');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=sertanejo&type=playlists');

      const playlists2 = searchPlaylists('rock');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=rock&type=playlists');
    });
  });


});
