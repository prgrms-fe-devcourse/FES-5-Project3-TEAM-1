import supabase from '@/shared/libs/supabase';

interface Props {
  feedId: string;
  file: File;
}

const uploadImage = async ({ feedId, file }: Props) => {
  const { error: storageError } = await supabase.storage
    .from('images')
    .upload(`image/${feedId}.png`, file, { upsert: true });
  if (storageError)
    throw new Error(`storage 업로드 에러 : ${storageError.message}`);

  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(`image/${feedId}.png`);

  if (!urlData?.publicUrl) throw new Error('image publicURL 가져오기 실패');
  const url = urlData.publicUrl;

  const { error: imageError } = await supabase
    .from('image')
    .insert({ feed_id: feedId, url })
    .select();
  if (imageError) throw new Error(`image 업로드 에러 : ${imageError.message}`);
};
export default uploadImage;
