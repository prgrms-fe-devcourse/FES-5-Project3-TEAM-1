import supabase from '@/shared/libs/supabase';
import { useThreadStore } from '@/features/thread/utils/store';
import { resizeImage } from '@/pages/Thread/utils/resizeImage';

interface Props {
  feedId: string;
  file: File;
}

/* 이미지 업로드 */
const uploadImage = async ({ feedId, file }: Props) => {
  try {
    const threadId = useThreadStore.getState().thread?.id;
    if (!threadId) throw new Error('ThreadId가 없습니다');

    // 확장자 추출
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext) throw new Error('파일 확장자를 알 수 없습니다');

    // 리사이즈 이미지 생성
    const resizedFile = ext === 'gif' ? file : await resizeImage(file);

    // 원본 업로드
    const { error: storageError } = await supabase.storage
      .from('images')
      .upload(`image/${threadId}/${feedId}.${ext}`, file, { upsert: true });

    if (storageError)
      throw new Error(`storage 업로드 에러 : ${storageError.message}`);

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(`image/${threadId}/${feedId}.png`);

    if (!urlData?.publicUrl) throw new Error('image publicURL 가져오기 실패');

    // 리사이즈 업로드 (_400_ 네이밍 추가, gif는 그대로)
    const { error: resizedError } = await supabase.storage
      .from('images')
      .upload(`image/${threadId}/${feedId}_400_.${ext}`, resizedFile, {
        upsert: true,
      });

    if (resizedError)
      throw new Error(`리사이즈 업로드 에러: ${resizedError.message}`);

    const { data: resizedData } = supabase.storage
      .from('images')
      .getPublicUrl(`image/${threadId}/${feedId}_400_.${ext}`);

    if (!resizedData?.publicUrl)
      throw new Error('resize된 Image publicURL 가져오기 실패');

    // const url = urlData.publicUrl;

    const { error: imageError } = await supabase.from('image').insert({
      feed_id: feedId,
      url: resizedData?.publicUrl,
    });

    if (imageError)
      throw new Error(`image 업로드 에러 : ${imageError.message}`);
  } catch (error) {
    console.error('uploadImage 에러:', error);
    throw error;
  }
};
export default uploadImage;
