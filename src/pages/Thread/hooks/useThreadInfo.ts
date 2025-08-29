import { getThreadInfo } from '@/shared/api/thread';
import type { Tables } from '@/shared/types';
import { useEffect, useState } from 'react';

export function useThreadInfo(threadId: string | null) {
  const [data, setData] = useState<Tables<'threads'> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!threadId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const info = await getThreadInfo(threadId);
        setData(info);
      } catch (error) {
        console.error('useThreadInfo 에러:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [threadId]);

  return { data, loading };
}
