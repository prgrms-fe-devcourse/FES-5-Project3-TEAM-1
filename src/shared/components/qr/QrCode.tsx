import { type RefObject } from 'react';
import { QRCode } from 'react-qrcode-logo';

import logoImage from '/src/assets/nimo/nimo_welcome.png';

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
    <div className="flex-center">
      <QRCode
        value={url}
        logoImage={logoImage}
        removeQrCodeBehindLogo
        ref={qrRef}
      />
      <button onClick={handleDownload}>다운로드</button>
    </div>
  );
};
export default QrCode;
