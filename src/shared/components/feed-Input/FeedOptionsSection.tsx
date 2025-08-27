import type { CanvasRefHandle } from '@/features/drawing/types/drawing';
import DrawingForm from '@/features/drawing/ui/DrawingForm';
interface Props {
  selectedChkbox: string | null;
  chkboxContentRef: React.RefObject<HTMLDivElement | null>;
  drawingRef: React.RefObject<CanvasRefHandle | null>;
}

function FeedOptionsSection({
  selectedChkbox,
  chkboxContentRef,
  drawingRef,
}: Props) {
  if (!selectedChkbox) return null;

  return (
    <div
      ref={chkboxContentRef}
      id="feedsContent"
      role="region"
      aria-live="polite"
      tabIndex={-1}
      aria-label="선택된 옵션"
      className="mt-3 pt-5 w-full border-t-1 border-dashed border-gray-dark order-3 focus:ring-none"
      style={{ maxHeight: selectedChkbox ? '62.5rem' : '0px' }}
    >
      {selectedChkbox === 'drawing' && <DrawingForm drawingRef={drawingRef} />}
    </div>
  );
}
export default FeedOptionsSection;
