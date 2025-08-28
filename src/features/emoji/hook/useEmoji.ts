import {
  addEmojiReaction,
  getEmojiCounts,
  getReactionsByToken,
  removeEmojiReaction,
} from '@/shared/api/emoji';
import type { EmojiCount } from '@/shared/types/emoji';
import { useEffect, useState } from 'react';
import { useEmojiSubscription } from './useEmojiSubscription';

export const useEmoji = ({
  feedId,
  token,
}: {
  feedId: string;
  token: string;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [emojiCounts, setEmojiCounts] = useState<EmojiCount[]>([]);
  const [myReactions, setMyReactions] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getEmojiCounts({ feedId }),
      getReactionsByToken({ feedId, token }),
    ])
      .then(([counts, reactions]) => {
        setEmojiCounts(counts);
        setMyReactions(new Set(reactions.map((r) => r.emoji)));
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.error(error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [feedId, token]);

  useEmojiSubscription({ feedId, setEmojiCounts });

  // 이모지 추가
  const removeEmoji = (emoji: string) => {
    setMyReactions((prev) => {
      const newSet = new Set(prev);
      newSet.delete(emoji);
      return newSet;
    });
    setEmojiCounts((prev) =>
      prev
        .map((item) =>
          item.emoji === emoji ? { ...item, counts: item.counts - 1 } : item,
        )
        .filter((item) => item.counts > 0),
    );
  };
  // 이모지 삭제
  const addEmoji = (emoji: string) => {
    setMyReactions((prev) => new Set([...prev, emoji]));
    setEmojiCounts((prev) => {
      const existingEmoji = prev.find((item) => item.emoji === emoji);
      if (existingEmoji) {
        return prev.map((item) =>
          item.emoji === emoji ? { ...item, counts: item.counts + 1 } : item,
        );
      }
      return [...prev, { emoji, counts: 1 }];
    });
  };

  // 이모디 등록 및 제거
  const handleEmojiClick = async (targetEmoji: string) => {
    const isMyReaction = myReactions.has(targetEmoji);

    if (isMyReaction) {
      // 낙관적 업데이트
      removeEmoji(targetEmoji);

      try {
        await removeEmojiReaction({ emoji: targetEmoji, feedId, token });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
        // 에러 케이스 ( 낙관적업데이트 로백 로직 )
        addEmoji(targetEmoji);
      }
    } else {
      // 낙관적 업데이트
      addEmoji(targetEmoji);

      try {
        // 실제 서버 통신
        await addEmojiReaction({ emoji: targetEmoji, feedId, token });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
        // 에러 케이스 ( 낙관적업데이트 로백 로직 )
        removeEmoji(targetEmoji);
      }
    }
  };

  return {
    emojiCounts,
    myReactions,
    handleEmojiClick,
    isLoading,
  };
};
