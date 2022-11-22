import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

/**
 * Загрузка файлов на Firebase
 * @param {*} file - передаваемый файл
 */
export function UploadFile(file) {
  // Загружает файл в облако
  const storageRef = ref(storage, 'images/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Прослушивает изменения состояния, ошибки и завершение загрузки.
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default:
      }
    },
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          // У пользователя нет разрешения на доступ к объекту
          break;
        case 'storage/canceled':
          // Пользователь отменил загрузку
          break;
        case 'storage/unknown':
          // Произошла неизвестная ошибка
          break;
        default:
      }
    },
    () => {
      // Загрузка завершена успешно. URL-адрес загрузки
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    },
  );
}
