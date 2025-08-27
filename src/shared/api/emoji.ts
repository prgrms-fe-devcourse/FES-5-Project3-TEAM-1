import supabase from '../libs/supabase';

/**
 * 피드 별 이모지 리스트
 */
export const getEmojiCounts = async ({
  feedId,
}: {
  feedId: string;
}): Promise<{ emoji: string; counts: number }[]> => {
  const { data, error } = await supabase
    .from('emoji_counts')
    .select('emoji, counts')
    .eq('feed_id', feedId);

  if (error) {
    throw new Error(
      `해당 피드의 이모지 리스틀를 불러오는데 실패했습니다. feed id : ${feedId}`,
    );
  }

  return data;
};

/**
 * 피드 id, token으로 등록된 이미조 가져오기
 * 내가 등록한 이모지와 아닌 이모지를 구분하기 위한 fetch
 */
export const getReactionsByToken = async ({
  feedId,
  token,
}: {
  feedId: string;
  token: string;
}): Promise<{ emoji: string }[] | []> => {
  const { data } = await supabase
    .from('emoji_reactions')
    .select('emoji')
    .eq('feed_id', feedId)
    .eq('token', token);
  return data || [];
};

// 이모지 등록
export const addEmojiReaction = async ({
  feedId,
  emoji,
  token,
}: {
  feedId: string;
  emoji: string;
  token: string;
}): Promise<void> => {
  const { error } = await supabase
    .from('emoji_reactions')
    .upsert({ token, emoji, feed_id: feedId });

  if (error) {
    throw new Error(`emoji_reactions insert Error feed_id : ${feedId}`);
  }
};

// 이모지 제거
export const removeEmojiReaction = async ({
  feedId,
  emoji,
  token,
}: {
  feedId: string;
  emoji: string;
  token: string;
}): Promise<void> => {
  const { error } = await supabase
    .from('emoji_reactions')
    .delete()
    .eq('feed_id', feedId)
    .eq('emoji', emoji)
    .eq('token', token);

  if (error) {
    throw new Error(`emoji_reactions remove Error feed_id : ${feedId}`);
  }
};

//전체 이모지 불러오기
export const fetchEmojis = async (): Promise<
  { feed_id: string; emoji: string; counts: number }[]
> => {
  const { data, error } = await supabase.from('emoji_counts').select('*');

  if (error) {
    throw new Error(`전체 이모지 리스트를 불러오는데 실패했습니다.`);
  }

  return data;
};
