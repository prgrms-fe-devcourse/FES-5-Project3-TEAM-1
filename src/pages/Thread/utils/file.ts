export const downloadImage = async (imageUrl: string) => {
  const res = await fetch(imageUrl);
  const blob = await res.blob();

  const fileName = imageUrl.split('/').pop();

  if (!fileName) {
    console.error('파일명을 찾을 수 없습니다');
    return;
  }

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
};
