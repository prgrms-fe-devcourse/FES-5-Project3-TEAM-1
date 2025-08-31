import type { Tables } from '@/shared/types';
import type { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { useEasterEggStore } from '../utils/store';
import { createTriggerEventChannel } from '@/shared/api/easter-egg';

// trigger-events 실시간 감지 hook
export const useCreateTriggerEventChannel = (threadId: string) => {
  const setTriggerWord = useEasterEggStore((state) => state.setTriggerWord);

  useEffect(() => {
    const channel = createTriggerEventChannel({
      threadId,
      onMountEasterEgg: handleShowEasterEgg,
    });

    return () => {
      channel.unsubscribe();
    };
  }, [threadId]);

  // 실시간 trigger_events 테이블 insert 감지 핸들러
  const handleShowEasterEgg = (
    payload: RealtimePostgresInsertPayload<Tables<'trigger_events'>>,
  ) => {
    const { trigger_word } = payload.new;
    setTriggerWord(trigger_word);
  };
};
