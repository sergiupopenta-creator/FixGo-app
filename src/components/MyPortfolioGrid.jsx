import { useRef } from 'react';
import { Camera, X } from 'lucide-react';
import { C } from '../styles/theme';
import { compressImage } from '../utils/compressImage';

export default function MyPortfolioGrid({ photos, onAdd, onRemove }) {
  const fileInputRef = useRef(null);
  async function handlePick(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    e.target.value = '';
    onAdd(await compressImage(file));
  }
  return (
    <div className="grid grid-cols-3 gap-2">
      {photos.map((url, i) => (
        <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 12, overflow: 'hidden' }}>
          <img src={url} alt="lucrare" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <button onClick={() => onRemove(i)} aria-label="Șterge poza" style={{
            position: 'absolute', top: 4, right: 4, width: 20, height: 20, borderRadius: 9999,
            background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
          }}>
            <X size={11} color="#fff" />
          </button>
        </div>
      ))}
      <button onClick={() => fileInputRef.current?.click()} aria-label="Adaugă o poză în portofoliu" style={{
        aspectRatio: '1', borderRadius: 12, border: `1px dashed ${C.border}`, background: 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Camera size={18} color={C.textFaint} />
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePick} />
    </div>
  );
}
