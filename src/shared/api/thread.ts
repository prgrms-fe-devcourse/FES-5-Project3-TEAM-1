import supabase from '../libs/supabase';
import type { Tables } from '../types';
import { toastUtils } from '../utils/toastUtils';

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

export const updateThreads = async (data: {
  id: string;
  title: string;
  description: string;
  password: string;
  isPrivate: boolean;
}) => {
  const { error } = await supabase
    .from('threads')
    .update({
      title: data.title,
      description: data.description,
      password: data.password,
      isPrivate: data.isPrivate,
    })
    .eq('id', data.id);
  if (error) throw new Error(`update thread error : ${error.message}`);
};

export const removeThreads = async (threadId: string) => {
  if (!threadId) throw new Error('threadId is required');
  if (!confirm('스레드가 삭제됩니다. 계속하시겠습니까?')) return;
  const { error } = await supabase.from('threads').delete().eq('id', threadId);
  if (error) throw new Error(`remove thread error : ${error.message}`);
  toastUtils.success('스레드 삭제 성공😊');
  return true;
};

/**
 * 특정 유저가 생성한 쓰레드 가져오기
 */
export const getThreadsByUserId = async (
  userId: string,
): Promise<Tables<'threads'>[]> => {
  const { data, error } = await supabase
    .from('threads')
    .select('*')
    .eq('owner_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`get threads by user error: ${error.message}`);
  }

  return data ?? [];
};
