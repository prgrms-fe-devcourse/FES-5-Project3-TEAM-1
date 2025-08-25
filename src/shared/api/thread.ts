import supabase from '../libs/supabase';

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
