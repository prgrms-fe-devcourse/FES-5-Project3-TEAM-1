import {
  addEmojiReaction,
  getEmojiCounts,
  getReactionsByToken,
  removeEmojiReaction,
} from '@/shared/api/emoji';
import type { EmojiCount } from '@/shared/types/emoji';
import { useEffect, useState } from 'react';
import { useEmojiSubscription } from './useEmojiSubscription';
import { getBrowserTokenFromSession } from '@/shared/utils/token';

export const useEmoji = ({ feedId }: { feedId: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [emojiCounts, setEmojiCounts] = useState<EmojiCount[]>([]);
  const [myReactions, setMyReactions] = useState<Set<string>>(new Set());
  const myToken = getBrowserTokenFromSession();

  // 초기 데이터 fetch
  useEffect(() => {
    if (!myToken) return;

    setIsLoading(true);
    Promise.all([
      getEmojiCounts({ feedId }),
      getReactionsByToken({ feedId, token: myToken }),
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
  }, [feedId, myToken]);

  // 구독
  /**
   * 문제 : 내가 등록한 이모지는 잘 카운트 되는데 실시간으로 다른 사용자가 업데이트한 이모지를 클릭하면 실패
   *
   * 가설  1: 다른 사람이 추가한 이모지에는 feed_id가 없어서 이모지 등록에 실패함.
   * 디비와 실제 프로젝트에서 가져오는 feed_id를 콘솔로 찍어봄
   * feed_id 정상적으로 잘 들어옴
   *
   * 새로 생성되는 이모지에 feed_id가 필요한가? 서버로 전달하는 params에 누락된 부분이 있나 확인 필요.
   *
   * 콘솔 찍어본 결과 :
   * 피드 아이디는 있지만 token이 누락 됨을 확인
   * 확인 결과
   * useEmoji에서 token을 받아서 사용할 수 있게 만들었더니 코어워커가 이 token을 다른 종류의 토큰으로 오해하고 잘 못 연결하여 동작이 안되는 것 확인
   */
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
    if (!myToken) return;
    const isMyReaction = myReactions.has(targetEmoji);

    // 이미 등록한 이모지 클릭시
    if (isMyReaction) {
      // 낙관적 업데이트
      removeEmoji(targetEmoji);

      try {
        // 실제 서버 통신
        await removeEmojiReaction({
          emoji: targetEmoji,
          feedId,
          token: myToken,
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
        // 에러 케이스 ( 낙관적업데이트 로백 로직 )
        addEmoji(targetEmoji);
      }
    }
    // 새로 등록한 이모지
    else {
      // 낙관적 업데이트
      addEmoji(targetEmoji);

      try {
        // 실제 서버 통신
        await addEmojiReaction({ emoji: targetEmoji, feedId, token: myToken });
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
