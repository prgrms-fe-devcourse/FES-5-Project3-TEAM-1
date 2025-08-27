import supabase from '@/shared/libs/supabase';

interface UploadDrawingProps {
  feedId: string;
  file: Blob;
}

/**
 * 피드 업로드
 */
export const uploadDrawing = async ({ feedId, file }: UploadDrawingProps) => {
  const { error: storageError } = await supabase.storage
    .from('images')
    .upload(`drawing/${feedId}.png`, file, { upsert: true });

  if (storageError) {
    throw new Error(`storage 업로드 에러 : ${storageError.message}`);
  }

  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(`drawing/${feedId}.png`);

  if (!urlData?.publicUrl) {
    throw new Error('drawing publicUrl 가져오기 실패');
  }

  const url = urlData.publicUrl;
  console.log('[uploadDrawing] publicUrl:', url);

  const { error: drawingError } = await supabase
    .from('drawing')
    .insert({ feed_id: feedId, url })
    .select();

  if (drawingError) {
    throw new Error(`drawing 업로드 에러 : ${drawingError.message}`);
  }

  return url;
};
