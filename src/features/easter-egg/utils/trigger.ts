export const TRIGGER_CATEGORIES: Record<string, string[]> = {
  congrats: ['축하', '추카', '생일', '생축'],
  teacher: ['범쌤', '심선범'],
  car: ['슝'],
  tarot: ['타로'],
  dog: ['강아지', '모리'],
};

// 모든 트리거를 하나의 배열로
export const ALL_TRIGGER_WORDS = Object.values(TRIGGER_CATEGORIES).flat();

// 단어로 카테고리 찾기
export const findCategory = (word: string): string | null => {
  for (const [category, words] of Object.entries(TRIGGER_CATEGORIES)) {
    if (words.includes(word)) {
      return category;
    }
  }
  return null;
};

// 메시지에서 트리거 단어 체크
export const checkTriggerWord = (message: string): string | null => {
  for (const word of ALL_TRIGGER_WORDS) {
    if (message.includes(word)) {
      return word;
    }
  }
  return null;
};
