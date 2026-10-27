import { Capacitor } from '@capacitor/core';
import { Media } from '@capacitor-community/media';

const ALBUM_NAME = 'Cleanily';

async function getOrCreateCleanilyAlbum() {
  const response = await Media.getAlbums();
  let album = (response.albums || []).find(item => item.name === ALBUM_NAME);

  if (!album) {
    await Media.createAlbum({ name: ALBUM_NAME });
    const refreshed = await Media.getAlbums();
    album = (refreshed.albums || []).find(item => item.name === ALBUM_NAME);
  }

  if (!album?.identifier) {
    throw new Error('Nie udało się utworzyć albumu Cleanily.');
  }

  return album.identifier;
}

window.CleanilyNative = {
  isNative() {
    return Capacitor.isNativePlatform();
  },

  async saveImageToGallery(dataUrl, fileName) {
    const albumIdentifier = await getOrCreateCleanilyAlbum();

    return Media.savePhoto({
      path: dataUrl,
      albumIdentifier,
      fileName
    });
  }
};
