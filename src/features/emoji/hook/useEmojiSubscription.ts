import { createEmojiCountSubscription } from '@/shared/api/emoji';
import type { Tables } from '@/shared/types';
import type { EmojiCount } from '@/shared/types/emoji';
import type {
  RealtimeChannel,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from '@supabase/supabase-js';
import { useEffect, useRef } from 'react';

export const useEmojiSubscription = ({
  feedId,
  setEmojiCounts,
}: {
  feedId: string;
  setEmojiCounts: React.Dispatch<React.SetStateAction<EmojiCount[]>>;
}) => {
  const channelRef = useRef<RealtimeChannel | null>(null);

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
  }, [feedId]);
};
