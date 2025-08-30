import { useEffect } from 'react';
import { useEasterEggStore } from '../utils/store';
import { getComponentByCategory } from '../utils/triggerRegistry';
import { findCategory } from '../utils/trigger';

// 이스터 에그 렌더링용 컴포넌트
const EasterEggSection = () => {
  const triggerWord = useEasterEggStore((state) => state.triggerWord);
  const setTriggerWord = useEasterEggStore((state) => state.setTriggerWord);

  // 5초 후 언마운트
  useEffect(() => {
    const time = setTimeout(() => {
      setTriggerWord('');
    }, 5000);

    return () => {
      clearTimeout(time);
    };
  }, [triggerWord, setTriggerWord]);

  const renderComponent = () => {
    if (!triggerWord) return null;

    const category = findCategory(triggerWord);

    if (category) {
      const Component = getComponentByCategory(category);
      return Component ? <Component /> : null;
    }
  };

  return <div className="fixed -bottom-5 -left-10">{renderComponent()}</div>;
};
export default EasterEggSection;
