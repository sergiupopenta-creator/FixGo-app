import { useState } from 'react';
import { CheckCircle2, Copy, Mail, MessageCircle, MessageSquare, Share2 } from 'lucide-react';
import { C } from '../styles/theme';
import Avatar from './Avatar';
import ShareAppIcon from './ShareAppIcon';
import ShareAppLink from './ShareAppLink';

export default function ShareSheet({ worker, onClose }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://fixgo.ro/meseriasi/${worker.id}`;
  const shareText = `${worker.name} - ${worker.category} · ${worker.rating.toFixed(1)}★ (${worker.reviews} recenzii) · ${worker.area}`;
  const fullMessage = `${shareText}\n${shareUrl}`;

  const whatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`;
  const smsHref = `sms:?body=${encodeURIComponent(fullMessage)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(worker.name + ' - FixGo')}&body=${encodeURIComponent(fullMessage)}`;

  function copyToClipboard() {
    let ok = false;
    try {
      const textarea = document.createElement('textarea');
      textarea.value = fullMessage;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      ok = document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch { ok = false; }
    if (ok) {
      setCopied(true);
      setTimeout(() => { setCopied(false); onClose(); }, 900);
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullMessage).then(() => {
        setCopied(true);
        setTimeout(() => { setCopied(false); onClose(); }, 900);
      }).catch(() => {});
    }
  }

  async function handleMore() {
    if (navigator.share) {
      try {
        await navigator.share({ title: `${worker.name} - FixGo`, text: shareText, url: shareUrl });
        return;
      } catch { /* utilizatorul a anulat sau share nu e permis aici */ }
    }
    copyToClipboard();
  }

  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 40 }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 50, padding: '0 10px 10px' }}>
        <div style={{ background: C.surface2, borderRadius: 20, overflow: 'hidden', marginBottom: 8 }}>
          <div className="flex items-center gap-3 p-4" style={{ borderBottom: `1px solid ${C.border}` }}>
            <Avatar name={worker.name} size={40} />
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{worker.name}</div>
              <div className="text-xs truncate" style={{ color: C.textMuted }}>fixgo.ro</div>
            </div>
          </div>
          <div className="flex items-center justify-around px-3 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
            <ShareAppLink icon={MessageCircle} bg="#25D366" label="WhatsApp" href={whatsappHref} newTab />
            <ShareAppLink icon={MessageSquare} bg="#34C759" label="Mesaje" href={smsHref} />
            <ShareAppLink icon={Mail} bg="#3B82F6" label="Mail" href={mailHref} />
            <ShareAppIcon icon={Share2} bg="#8B8FA3" label="Mai multe" onClick={handleMore} />
          </div>
          <div className="flex items-center px-3 py-4">
            <ShareAppIcon icon={copied ? CheckCircle2 : Copy} bg={copied ? C.green : C.surface} label={copied ? 'Copiat!' : 'Copiază'} onClick={copyToClipboard} />
          </div>
        </div>
        <button onClick={onClose} style={{ background: C.surface2, borderRadius: 20 }} className="w-full py-3.5 text-center text-sm font-semibold">
          <span style={{ color: C.purple }}>Anulează</span>
        </button>
      </div>
    </>
  );
}
