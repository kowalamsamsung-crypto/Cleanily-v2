import { Capacitor } from '@capacitor/core';
import { Media } from '@capacitor-community/media';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

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
  },

  async shareImage(dataUrl, fileName) {
    const safeName = String(fileName || `Cleanily-${Date.now()}.jpg`)
      .replace(/[^a-zA-Z0-9._-]/g, '-');
    const base64Data = String(dataUrl).replace(/^data:image\/jpeg;base64,/, '');

    await Filesystem.writeFile({
      path: safeName,
      data: base64Data,
      directory: Directory.Cache
    });

    const { uri } = await Filesystem.getUri({
      path: safeName,
      directory: Directory.Cache
    });

    try {
      return await Share.share({
        title: 'Raport Cleanily',
        text: 'Raport zdjęciowy audytu czystości — Laboratorium OQC WM',
        files: [uri],
        dialogTitle: 'Udostępnij raport Cleanily'
      });
    } finally {
      try {
        await Filesystem.deleteFile({ path: safeName, directory: Directory.Cache });
      } catch (error) {
        console.warn('Nie udało się usunąć pliku tymczasowego:', error);
      }
    }
  }
};
