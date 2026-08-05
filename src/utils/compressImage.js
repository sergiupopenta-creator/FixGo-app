// Photos (avatar, portfolio, chat images, materials attachments) are stored
// as base64 strings in localStorage, which has a small quota (~5-10MB per
// site) — a handful of full-resolution phone photos can fill it up and
// start silently failing to save. Resizing + re-encoding as JPEG here keeps
// each photo to a few hundred KB instead of several MB.
export function compressImage(file, { maxDimension = 1024, quality = 0.75 } = {}) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Nu am putut procesa imaginea.'));
    };

    img.src = objectUrl;
  });
}
