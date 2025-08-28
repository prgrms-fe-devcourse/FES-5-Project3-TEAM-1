import { createEmojiCountSubscription } from '@/shared/api/emoji';
import type { Tables } from '@/shared/types';
import type { EmojiCount } from '@/shared/types/emoji';
import type {
  RealtimeChannel,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js';
import { useEffect, useRef } from 'react';

// export const useEmojiSubscription = ({ feeds }: { feeds: Feed[] }) => {
//   const [subscribedFeedIds, setSubscribedFeedIds] = useState<Set<string>>(
//     new Set(),
//   );
//   const channelRef = useRef<RealtimeChannel | null>(null);

// const handleNewEmojiInsert = (
//   payload: RealtimePostgresInsertPayload<Tables<'emoji_counts'>>,
// ) => {
//   const {} = payload.new;
//   console.log('Emoji insert');
// };
// const handleEmojiUpdate = (
//   payload: RealtimePostgresUpdatePayload<Tables<'emoji_counts'>>,
// ) => {
//   const {} = payload.new;
//   console.log('Emoji update');
// };

//   useEffect(() => {
//     const currentFeedIds = new Set(feeds.map((feed) => feed.id));
//     const newFeedIds = Array.from(currentFeedIds).filter(
//       (id) => !subscribedFeedIds.has(id),
//     );

//     // 새로 추가된 피드가 없을 경우
//     if (newFeedIds.length === 0) return;

//     // 이미 구독되어 있는 채널 구독 해제
//     if (channelRef.current) {
//       channelRef.current.unsubscribe();
//     }

//     channelRef.current = createEmojiCountSubscription({
//       feedIds: Array.from(currentFeedIds),
//       onNewEmojiInsert: handleNewEmojiInsert,
//       onEmojiUpdate: handleEmojiUpdate,
//     });

//     setSubscribedFeedIds(currentFeedIds);

//     return () => {
//       channelRef.current?.unsubscribe();
//     };
//   }, [feeds.length]);

//   return subscribedFeedIds;
// };

export const useEmojiSubscription = ({
  feedId,
  setEmojiCounts,
}: {
  feedId: string;
  setEmojiCounts: React.Dispatch<React.SetStateAction<EmojiCount[]>>;
}) => {
  const channelRef = useRef<RealtimeChannel | null>(null);
  useEffect(() => {
    if (!feedId) return;

    channelRef.current = createEmojiCountSubscription({
      feedId,
      onNewEmojiInsert: handleNewEmojiInsert,
      onEmojiUpdate: handleEmojiUpdate,
    });

    return () => {
      channelRef.current?.unsubscribe();
    };
  }, []);

  const handleNewEmojiInsert = (
    payload: RealtimePostgresInsertPayload<Tables<'emoji_counts'>>,
  ) => {
    const { counts: newCounts, emoji: newEmoji } = payload.new;

    // 실제 이모지 리스트 렌더링
    setEmojiCounts((prev) => {
      const existingEmoji = prev.findIndex(({ emoji }) => emoji === newEmoji);

      if (existingEmoji !== -1) {
        return prev.map((item) =>
          item.emoji === newEmoji ? { ...item, counts: newCounts } : item,
        );
      }
      return [...prev, { emoji: newEmoji, counts: newCounts }];
    });
  };
  const handleEmojiUpdate = (
    payload: RealtimePostgresUpdatePayload<Tables<'emoji_counts'>>,
  ) => {
    const { counts: newCounts, emoji: newEmoji } = payload.new;

    // 실제 이모지 리스트 렌더링
    setEmojiCounts((prev) => {
      if (newCounts === 0)
        return prev.filter(({ emoji }) => emoji !== newEmoji);

      const existingEmoji = prev.findIndex(({ emoji }) => emoji === newEmoji);

      if (existingEmoji !== -1) {
        return prev.map((item) =>
          item.emoji === newEmoji ? { ...item, counts: newCounts } : item,
        );
      }
      return [...prev, { emoji: newEmoji, counts: newCounts }];
    });
  };
};
