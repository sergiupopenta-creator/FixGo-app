import { useEffect, useRef, useState } from 'react';
import { Ban, Bell, BellOff, Briefcase, Calendar as CalendarIcon, Camera, ChevronRight, ClipboardList, FileText, MapPin, MoreVertical, Send, User } from 'lucide-react';
import { C, GRADIENT, MONO, inputStyle } from '../styles/theme';
import { fmt } from '../utils/helpers';
import Avatar from '../components/Avatar';
import BackButton from '../components/BackButton';

export default function ChatScreen({ chat, goBack, onSend, onOpenMaterials, onOpenMaterialsDetail, onOpenAssignmentClient, onToggleMute, onToggleBlock, onOpenProfile, onCreateAppointment }) {
  const [text, setText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const endRef = useRef(null);
  const fileInputRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chat.messages.length]);

  function sendText() {
    if (!text.trim()) return;
    onSend({ type: 'text', text: text.trim() });
    setText('');
  }

  function handlePickImage(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { onSend({ type: 'image', url: reader.result }); };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-2 pb-3 flex items-center gap-2 flex-shrink-0" style={{ borderBottom: `1px solid ${C.border}`, position: 'relative' }}>
        <BackButton onClick={goBack} />
        <button onClick={onOpenProfile} style={{ background: 'none', border: 'none', padding: 0 }} className="flex items-center gap-2 flex-1 min-w-0 ml-1 text-left">
          <Avatar name={chat.workerName} size={38} online={chat.online} />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate flex items-center gap-1" style={{ color: C.text }}>
              <span className="truncate">{chat.workerName}</span>
              {chat.muted && <BellOff size={12} color={C.textFaint} />}
            </div>
            <div className="text-xs" style={{ color: chat.blocked ? C.red : (chat.online ? C.green : C.textFaint) }}>
              {chat.blocked ? 'Blocat' : (chat.online ? 'Online' : 'Offline')}
            </div>
          </div>
        </button>
        {onCreateAppointment && (
          <button onClick={onCreateAppointment} style={{ background: C.surface2 }} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
            <CalendarIcon size={14} color={C.text} />
          </button>
        )}
        <button onClick={onOpenMaterials} style={{ background: C.surface2 }} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
          <ClipboardList size={14} color={C.text} />
        </button>
        <button onClick={() => setMenuOpen(o => !o)} style={{ background: C.surface2 }} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
          <MoreVertical size={16} color={C.text} />
        </button>
        {menuOpen && (
          <div style={{
            position: 'absolute', top: 54, right: 20, background: C.surface2, border: `1px solid ${C.border}`,
            borderRadius: 12, overflow: 'hidden', zIndex: 30, minWidth: 190, boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}>
            <button onClick={() => { onToggleMute(); setMenuOpen(false); }} style={{ borderBottom: `1px solid ${C.border}` }} className="w-full flex items-center gap-2 px-3.5 py-3 text-left">
              {chat.muted ? <Bell size={14} color={C.text} /> : <BellOff size={14} color={C.text} />}
              <span className="text-xs" style={{ color: C.text }}>{chat.muted ? 'Anulează silențios' : 'Silențios (mute)'}</span>
            </button>
            <button onClick={() => { onToggleBlock(); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3.5 py-3 text-left">
              <Ban size={14} color={C.red} />
              <span className="text-xs" style={{ color: C.red }}>{chat.blocked ? 'Deblochează' : 'Blochează'}</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3" style={{ minHeight: 0 }}>
        {chat.messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start', maxWidth: (m.type === 'materials' || m.type === 'appointment' || m.type === 'assignment') ? '85%' : '78%' }}>
            {m.type === 'image' ? (
              <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${C.border}` }}>
                <img src={m.url} alt="atașament" style={{ display: 'block', width: 200, height: 'auto' }} />
              </div>
            ) : m.type === 'appointment' ? (
              <div style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="rounded-2xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarIcon size={14} color={C.purple} />
                  <span className="text-xs font-semibold" style={{ color: C.text }}>Programare propusă</span>
                </div>
                <div className="text-sm font-semibold mb-1" style={{ color: C.text }}>{m.title}</div>
                <div className="text-xs capitalize" style={{ color: C.textMuted }}>{m.dayLabel} · ora {m.time}</div>
              </div>
            ) : m.type === 'assignment' ? (
              <button
                onClick={() => m.clientId && onOpenAssignmentClient(m)}
                style={{ background: C.surface2, border: `1px solid ${C.border}`, textAlign: 'left', display: 'block', width: '100%' }}
                className="rounded-2xl p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase size={14} color={C.purple} />
                  <span className="text-xs font-semibold flex-1" style={{ color: C.text }}>Lucrare atribuită</span>
                  {m.clientId && <ChevronRight size={13} color={C.textFaint} />}
                </div>
                <div className="text-sm font-semibold mb-2" style={{ color: C.text }}>{m.title}</div>
                <div className="flex items-center gap-1.5 text-xs mb-1" style={{ color: C.textMuted }}>
                  <User size={11} /> <span>Contactează pe: <span style={{ color: C.text, fontWeight: 600 }}>{m.clientName}</span></span>
                </div>
                {m.address && (
                  <div className="flex items-center gap-1.5 text-xs mb-1" style={{ color: C.textMuted }}>
                    <MapPin size={11} /> {m.address}
                  </div>
                )}
                {m.budget && (
                  <div className="flex items-center justify-between text-xs pt-2 mt-1" style={{ borderTop: `1px solid ${C.border}` }}>
                    <span style={{ color: C.textMuted }}>Buget</span>
                    <span style={{ color: C.purple, fontFamily: MONO, fontWeight: 600 }}>{m.budget}</span>
                  </div>
                )}
                {m.clientId && (
                  <div className="text-xs pt-2 mt-1" style={{ color: C.purple, borderTop: m.budget ? 'none' : `1px solid ${C.border}` }}>
                    Apasă ca să scrii clientului →
                  </div>
                )}
              </button>
            ) : m.type === 'materials' ? (
              <button onClick={() => onOpenMaterialsDetail(m)} style={{ background: C.surface2, border: `1px solid ${C.border}`, textAlign: 'left', display: 'block', width: '100%' }} className="rounded-2xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList size={14} color={C.purple} />
                  <span className="text-xs font-semibold flex-1" style={{ color: C.text }}>Listă materiale</span>
                  <ChevronRight size={13} color={C.textFaint} />
                </div>
                <div className="flex flex-col gap-1 mb-2">
                  {m.laborCost > 0 && (
                    <div className="flex items-center justify-between text-xs" style={{ color: C.textMuted }}>
                      <span>Manoperă</span>
                      <span style={{ fontFamily: MONO, color: C.text }}>{fmt(m.laborCost)} RON</span>
                    </div>
                  )}
                  {m.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs" style={{ color: C.textMuted }}>
                      <span>{it.qty} × {it.name}</span>
                      <span style={{ fontFamily: MONO, color: C.text }}>{fmt(it.qty * it.price)} RON</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2" style={{ borderTop: `1px solid ${C.border}` }}>
                  <span className="text-xs font-semibold" style={{ color: C.text }}>Total</span>
                  <span className="text-sm font-bold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(m.total)} RON</span>
                </div>
                {m.attachments && m.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 pt-2" style={{ borderTop: `1px solid ${C.border}` }}>
                    {m.attachments.map(att => (
                      att.type === 'image' ? (
                        <img key={att.id} src={att.url} alt={att.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
                      ) : (
                        <div key={att.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex items-center gap-1 rounded-lg px-2 py-1.5">
                          <FileText size={12} color={C.red} />
                          <span className="text-xs truncate" style={{ color: C.text, maxWidth: 80 }}>{att.name}</span>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </button>
            ) : (
              <div style={{ background: m.from === 'me' ? GRADIENT : C.surface2, border: m.from === 'me' ? 'none' : `1px solid ${C.border}` }} className="rounded-2xl px-3.5 py-2.5">
                <span className="text-sm" style={{ color: m.from === 'me' ? '#fff' : C.text }}>{m.text}</span>
              </div>
            )}
            <div style={{ textAlign: m.from === 'me' ? 'right' : 'left', color: C.textFaint }} className="text-xs mt-1">{m.time}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {chat.blocked ? (
        <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: `1px solid ${C.border}` }}>
          <p className="text-xs text-center mb-2" style={{ color: C.textMuted }}>Ai blocat această conversație. Nu mai puteți face schimb de mesaje.</p>
          <button onClick={onToggleBlock} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-full rounded-xl py-2.5 text-xs font-semibold">
            <span style={{ color: C.text }}>Deblochează</span>
          </button>
        </div>
      ) : (
        <>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePickImage} />
          <div className="px-4 py-3 flex items-center gap-2 flex-shrink-0" style={{ borderTop: `1px solid ${C.border}` }}>
            <button onClick={() => fileInputRef.current?.click()} style={{ background: C.surface2 }} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
              <Camera size={16} color={C.text} />
            </button>
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') sendText(); }}
              placeholder="Scrie un mesaj..."
              style={{ ...inputStyle, borderRadius: 9999 }}
            />
            <button onClick={sendText} style={{ background: GRADIENT }} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
              <Send size={15} color="#fff" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
