import toast from 'react-hot-toast';
import CloseSVG from '@/assets/icon/close-24.svg?react';
import ErrorSVG from '@/assets/icon/error-16.svg?react';
import SuccessSVG from '@/assets/icon/success-16.svg?react';
import InfoSvg from '@/assets/icon/info-16.svg?react';

const ToastStyle = {
  style: {
    width: '400px',
    border: '2px solid #2463EB',
    background: '#DCEBFE',
  },
};

export const toastUtils = {
  info: (message: string) => {
    toast.dismiss();
    toast(
      <div className="flex justify-between items-center w-full">
        <div className="flex-center gap-3 text-info-400">
          <InfoSvg />
          <p className="font-semibold">{message}</p>
        </div>
        <div className="flex-center">
          <button type="button" onClick={() => toast.dismiss()}>
            <CloseSVG className="size-5" />
          </button>
        </div>
      </div>,
      {
        style: {
          width: '600px',
          border: '2px solid #2463EB',
          background: '#DCEBFE',
        },
      },
    );
  },
  success: (message: string) => {
    toast.dismiss();
    toast(
      <div className="flex justify-between items-center w-full">
        <div className="flex-center gap-3 text-success-400">
          <SuccessSVG />
          <p className="font-semibold">{message}</p>
        </div>
        <div className="flex-center">
          <button type="button" onClick={() => toast.dismiss()}>
            <CloseSVG className="size-3" />
          </button>
        </div>
      </div>,
      {
        style: {
          width: '600px',
          border: '2px solid #16A249',
          background: '#DEFCE9',
        },
      },
    );
  },
  error: (message: string) => {
    toast.dismiss();
    toast(
      <div className="flex justify-between items-center w-full">
        <div className="flex-center gap-3 text-error-400">
          <ErrorSVG />
          <p className="font-semibold">{message}</p>
        </div>
        <div className="flex-center">
          <button type="button" onClick={() => toast.dismiss()}>
            <CloseSVG className="size-3" />
          </button>
        </div>
      </div>,
      {
        style: {
          width: '600px',
          border: '2px solid #981b1b',
          background: '#FFDCDC',
        },
      },
    );
  },
};
