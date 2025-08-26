import supabase from '../libs/supabase';
import type { Tables } from '../types';

export const insertThreads = async ({
  id,
  owner_id,
  title,
  description,
  password,
  link,
  isPrivate,
}: {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  password: string;
  link: string;
  isPrivate: boolean;
}): Promise<void> => {
  const { error } = await supabase.from('threads').insert([
    {
      id,
      owner_id,
      title,
      description,
      password,
      link,
      isPrivate,
    },
  ]);

  if (error) {
    throw new Error(`Threads add error: ${error.message}`);
  }
};

/**
 * 쓰레드 전체 정보 가져오기
 */
export const getThreadInfo = async (
  threadId: string,
): Promise<Tables<'threads'> | null> => {
  const { data, error } = await supabase
    .from('threads')
    .select()
    .eq('id', threadId)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error(`get threads info error : ${error}`);
  }

  return data;
};

/**
 * 쓰레드 비밀번호 가져오기
 */
export const getThreadPassword = async (
  threadId: string,
): Promise<string | null> => {
  const { data, error } = await supabase
    .from('threads')
    .select('password')
    .eq('id', threadId)
    .single();

  if (error) {
    throw new Error(`get threads password error : ${error}`);
  }
  return data.password;
};
