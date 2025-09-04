import supabase from '@/shared/libs/supabase';
import { useThreadStore } from '@/features/thread/utils/store';
import { resizeImage } from '@/pages/Thread/utils/resizeImage';

interface UploadDrawingProps {
  feedId: string;
  file: Blob;
}

/* 드로잉 업로드 */
export const uploadDrawing = async ({ feedId, file }: UploadDrawingProps) => {
  try {
    const threadId = useThreadStore.getState().thread?.id;
    if (!threadId) throw new Error('ThreadId가 없습니다');

    const fileObj = new File([file], `${feedId}.png`, { type: file.type });

    // 리사이즈 이미지 생성
    const resizedFile = await resizeImage(fileObj);

    // 원본 업로드
    const { error: storageError } = await supabase.storage
      .from('images')
      .upload(`drawing/${threadId}/${feedId}.png`, file, { upsert: true });

    if (storageError) {
      throw new Error(`storage 업로드 에러 : ${storageError.message}`);
    }

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(`drawing/${threadId}/${feedId}.png`);

    if (!urlData?.publicUrl) {
      throw new Error('drawing publicUrl 가져오기 실패');
    }

    // 리사이즈 업로드 (_400_ 네이밍 추가)
    const { error: resizedError } = await supabase.storage
      .from('images')
      .upload(`drawing/${threadId}/${feedId}_400_.png`, resizedFile, {
        upsert: true,
      });

    if (resizedError)
      throw new Error(`리사이즈 업로드 에러: ${resizedError.message}`);

    const { data: resizedData } = supabase.storage
      .from('images')
      .getPublicUrl(`drawing/${threadId}/${feedId}_400_.png`);

    if (!resizedData?.publicUrl)
      throw new Error('resize된 Image publicURL 가져오기 실패');

    // const url = urlData.publicUrl;

    const { error: drawingError } = await supabase
      .from('drawing')
      .insert({ feed_id: feedId, url: resizedData?.publicUrl });

    if (drawingError) {
      throw new Error(`drawing 업로드 에러 : ${drawingError.message}`);
    }
  } catch (error) {
    console.error('uploadDrawing 에러:', error);
    throw error;
  }
};
