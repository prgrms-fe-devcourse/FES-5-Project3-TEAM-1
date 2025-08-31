import type { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import supabase from '../libs/supabase';
import type { Tables } from '../types';

/**
 * trigger_events 구독
 */
export const createTriggerEventChannel = ({
  threadId,
  onMountEasterEgg,
}: {
  threadId: string;
  onMountEasterEgg: (
    payload: RealtimePostgresInsertPayload<Tables<'trigger_events'>>,
  ) => void;
}) => {
  return supabase
    .channel('trigger-events')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'trigger_events',
        filter: `thread_id=eq.${threadId}`,
      },
      onMountEasterEgg,
    )
    .subscribe();
};

/**
 *  트리거 단어 insert
 */
export const insertTriggerEvent = async ({
  threadId,
  word,
}: {
  threadId: string;
  word: string;
}): Promise<void> => {
  const { error } = await supabase
    .from('trigger_events')
    .insert({ trigger_word: word, thread_id: threadId });

  if (error) {
    throw new Error(
      `threadId: ${threadId} - trigger_events table insert error :${error.message}`,
    );
  }
};
