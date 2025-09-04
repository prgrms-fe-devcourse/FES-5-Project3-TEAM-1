import imageCompression from 'browser-image-compression';

const defaultOptions = {
  maxWidthOrHeight: 300,
  initialQuality: 0.7,
  maxSizeMB: 0.4,
  useWebWorker: true,
};

export const resizeImage = async (file: File, options = {}) => {
  try {
    const mergedOptions = { ...defaultOptions, ...options };
    const resizedFile = await imageCompression(file, mergedOptions);
    console.log(resizedFile.type);
    return resizedFile;
  } catch (error) {
    console.error('이미지 압축 실패:', error);
    return file;
  }
};
