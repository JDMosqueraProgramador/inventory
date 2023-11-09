import { toString } from 'qrcode';

export const generateQR = async (data: string) => {
  const qr = await toString(data, { type: 'utf8' });
  return qr;
};
