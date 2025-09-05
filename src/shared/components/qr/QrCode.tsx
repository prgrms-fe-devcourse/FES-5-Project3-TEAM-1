import { type RefObject } from 'react';
import { QRCode } from 'react-qrcode-logo';

import logoImage from '/src/assets/nimo/nimo_welcome.png';
import { MdOutlineFileDownload } from 'react-icons/md';

const QrCode = ({
  url,
  qrRef,
  title,
}: {
  url: string;
  title: string;
  qrRef: RefObject<any>;
}) => {
  const handleDownload = () => {
    const canvas: HTMLCanvasElement | null = qrRef.current?.canvasRef?.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}_qr.png`;
    link.click();
  };

  return (
    <div className="flex justify-center items-end">
      <QRCode
        value={url}
        logoImage={logoImage}
        removeQrCodeBehindLogo
        ref={qrRef}
      />
      <button onClick={handleDownload} aria-label="다운로드">
        <MdOutlineFileDownload size={24} aria-hidden="true" />
      </button>
    </div>
  );
};
export default QrCode;
