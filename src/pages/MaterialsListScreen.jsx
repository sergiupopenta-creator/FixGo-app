import { useRef, useState } from 'react';
import { Camera, FileText, Loader2, Plus, Search, X } from 'lucide-react';
import { C, GRADIENT, MONO, inputStyle } from '../styles/theme';
import { fmt } from '../utils/helpers';
import { callAI } from '../utils/aiClient';
import Avatar from '../components/Avatar';
import BackButton from '../components/BackButton';
import EmptyState from '../components/EmptyState';
import Field from '../components/Field';

export default function MaterialsListScreen({ workerId, workerName, clients, initialItems, initialAttachments, initialLaborCost, onSave, goBack }) {
  const [items, setItems] = useState(initialItems || []);
  const [attachments, setAttachments] = useState(initialAttachments || []);
  const [laborCost, setLaborCost] = useState(initialLaborCost ? String(initialLaborCost) : '');
  const [name, setName] = useState('');
  const [qty, setQty] = useState('1');
  const [price, setPrice] = useState('');
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState(null);
  const [selectedClient, setSelectedClient] = useState(workerId ? { clientId: workerId, clientName: workerName } : null);
  const [clientQuery, setClientQuery] = useState('');
  const photoInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const needsClientPick = !workerId;

  function addItem() {
    if (!name.trim() || !price) return;
    setItems(list => [...list, { id: Date.now(), name: name.trim(), qty: Number(qty) || 1, price: Number(price) || 0 }]);
    setName(''); setQty('1'); setPrice('');
  }
  function removeItem(id) {
    setItems(list => list.filter(i => i.id !== id));
  }

  function handlePickPhoto(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAttachments(list => [...list, { id: Date.now(), type: 'image', url: reader.result, name: file.name }]);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function handlePickPdf(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result;
      setAttachments(list => [...list, { id: Date.now(), type: 'pdf', url: dataUrl, name: file.name }]);
      setExtracting(true);
      setExtractError(null);
      try {
        const base64Data = dataUrl.split(',')[1];
        const promptText = 'Ești un asistent care extrage articole (materiale/piese) și costurile lor dintr-o factură pentru un meseriaș din România. Analizează documentul PDF atașat și răspunde DOAR cu un obiect JSON valid, fără text suplimentar, fără markdown, fără backticks, fără explicații înainte sau după. Format exact: {"items":[{"name":"string","qty":number,"price":number}]}. "price" este prețul unitar în RON (calculează total împărțit la cantitate dacă factura arată doar valoarea totală pe linie). Dacă nu poți identifica articole individuale, returnează un singur articol cu denumirea "Materiale conform factură", cantitatea 1 și prețul egal cu totalul general al facturii. Extrage lista de materiale și costul lor din această factură.';
        const raw = await callAI({
          maxTokens: 1500,
          messages: [
            {
              role: 'user',
              content: [
                { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64Data } },
                { type: 'text', text: promptText },
              ],
            },
          ],
        });
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        const clean = (jsonMatch ? jsonMatch[0] : raw).replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(clean);
        if (parsed.items && parsed.items.length > 0) {
          setItems(list => [...list, ...parsed.items.map(it => ({
            id: Date.now() + Math.random(), name: it.name, qty: Number(it.qty) || 1, price: Number(it.price) || 0,
          }))]);
        }
      } catch (err) {
        setExtractError('Nu am putut calcula costul automat din factură (' + (err.message || 'eroare necunoscută') + '). Poți adăuga materialele manual.');
      } finally {
        setExtracting(false);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function removeAttachment(id) {
    setAttachments(list => list.filter(a => a.id !== id));
  }

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const filteredClients = (clients || []).filter(c => c.clientName.toLowerCase().includes(clientQuery.toLowerCase()));

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <div>
          <h1 className="text-base font-semibold" style={{ color: C.text }}>Listă materiale</h1>
          {!needsClientPick && <div className="text-xs" style={{ color: C.textMuted }}>{workerName}</div>}
        </div>
      </div>

      {needsClientPick && (
        <Field label="Pentru cine e lista?">
          {selectedClient ? (
            <div style={{ background: C.surface, border: `1px solid ${C.purple}` }} className="flex items-center justify-between rounded-xl p-2.5">
              <div className="flex items-center gap-2.5">
                <Avatar name={selectedClient.clientName} size={32} />
                <span className="text-sm" style={{ color: C.text }}>{selectedClient.clientName}</span>
              </div>
              <button onClick={() => setSelectedClient(null)} style={{ background: 'none', border: 'none', padding: 0 }}>
                <X size={16} color={C.textMuted} />
              </button>
            </div>
          ) : (!clients || clients.length === 0) ? (
            <p className="text-xs" style={{ color: C.textMuted }}>Nu ai încă niciun client cu care să vorbești.</p>
          ) : (
            <>
              <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-2">
                <Search size={15} color={C.textMuted} />
                <input value={clientQuery} onChange={e => setClientQuery(e.target.value)} placeholder="Caută o persoană..." className="bg-transparent outline-none text-sm flex-1" style={{ color: C.text }} />
              </div>
              <div className="flex flex-col gap-2">
                {filteredClients.length === 0 && <p className="text-xs" style={{ color: C.textMuted }}>Nicio persoană găsită.</p>}
                {filteredClients.map(c => (
                  <button key={c.clientId} onClick={() => setSelectedClient(c)} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full flex items-center gap-3 rounded-xl p-2.5 text-left">
                    <Avatar name={c.clientName} size={32} />
                    <span className="text-sm flex-1" style={{ color: C.text }}>{c.clientName}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </Field>
      )}

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 mb-5">
        <div className="text-xs font-medium mb-2" style={{ color: C.textMuted }}>Manoperă</div>
        <input value={laborCost} onChange={e => setLaborCost(e.target.value)} type="number" min="0" placeholder="Cost manoperă (RON)" style={inputStyle} />
      </div>

      <div className="flex flex-col gap-2 mb-5">
        {items.length === 0 && <EmptyState text="Nu ai adăugat încă niciun material." />}
        {items.map(item => (
          <div key={item.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: C.text }}>{item.name}</div>
              <div className="text-xs" style={{ color: C.textMuted }}>{item.qty} buc × {fmt(item.price)} RON</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm font-semibold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(item.qty * item.price)} RON</span>
              <button onClick={() => removeItem(item.id)} style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center">
                <X size={13} color={C.textMuted} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-2xl p-3.5 mb-5">
        <div className="text-xs font-medium mb-2" style={{ color: C.textMuted }}>Adaugă material</div>
        <div className="mb-2">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Denumire material" style={inputStyle} />
        </div>
        <div className="flex gap-2 mb-2">
          <input value={qty} onChange={e => setQty(e.target.value)} type="number" min="1" placeholder="Cantitate" style={{ ...inputStyle, flexGrow: 1, flexBasis: 0, minWidth: 0 }} />
          <input value={price} onChange={e => setPrice(e.target.value)} type="number" min="0" placeholder="Preț unitar (RON)" style={{ ...inputStyle, flexGrow: 1, flexBasis: 0, minWidth: 0 }} />
        </div>
        <button onClick={addItem} style={{ background: C.surface2, border: `1px solid ${C.border}` }} className="w-full rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5">
          <Plus size={14} color={C.text} /> <span style={{ color: C.text }}>Adaugă în listă</span>
        </button>
      </div>

      <div className="mb-5">
        <div className="text-xs font-medium mb-2" style={{ color: C.textMuted }}>Atașamente (opțional)</div>
        {attachments.length > 0 && (
          <div className="flex flex-col gap-2 mb-2">
            {attachments.map(att => (
              <div key={att.id} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="rounded-xl p-2 flex items-center gap-2">
                {att.type === 'image' ? (
                  <img src={att.url} alt={att.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: C.surface2, flexShrink: 0 }} className="flex items-center justify-center">
                    <FileText size={18} color={C.red} />
                  </div>
                )}
                <span className="text-xs flex-1 truncate" style={{ color: C.text }}>{att.name}</span>
                <button onClick={() => removeAttachment(att.id)} style={{ background: C.surface2 }} className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
                  <X size={13} color={C.textMuted} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <button onClick={() => photoInputRef.current?.click()} style={{ background: C.surface, border: `1px dashed ${C.border}` }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5">
            <Camera size={14} color={C.textMuted} /> <span style={{ color: C.textMuted }}>Adaugă poză</span>
          </button>
          <button onClick={() => pdfInputRef.current?.click()} style={{ background: C.surface, border: `1px dashed ${C.border}` }} className="flex-1 rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5">
            <FileText size={14} color={C.textMuted} /> <span style={{ color: C.textMuted }}>Adaugă PDF</span>
          </button>
        </div>
        <input ref={photoInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePickPhoto} />
        <input ref={pdfInputRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={handlePickPdf} />
        {extracting && (
          <div className="flex items-center gap-2 mt-2 text-xs" style={{ color: C.textMuted }}>
            <Loader2 size={13} className="animate-spin" /> Se calculează costul din factură...
          </div>
        )}
        {extractError && <p className="text-xs mt-2" style={{ color: C.red }}>{extractError}</p>}
      </div>

      <div className="flex flex-col gap-1.5 mb-5 px-1">
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: C.textMuted }}>Manoperă</span>
          <span className="text-xs font-semibold" style={{ color: C.text, fontFamily: MONO }}>{fmt(Number(laborCost) || 0)} RON</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: C.textMuted }}>Materiale</span>
          <span className="text-xs font-semibold" style={{ color: C.text, fontFamily: MONO }}>{fmt(total)} RON</span>
        </div>
        <div className="flex items-center justify-between pt-1.5 mt-0.5" style={{ borderTop: `1px solid ${C.border}` }}>
          <span className="text-sm font-semibold" style={{ color: C.text }}>Total</span>
          <span className="text-base font-bold" style={{ color: C.purple, fontFamily: MONO }}>{fmt(total + (Number(laborCost) || 0))} RON</span>
        </div>
      </div>

      <button
        disabled={(items.length === 0 && !(Number(laborCost) > 0)) || (needsClientPick && !selectedClient)}
        onClick={() => onSave(items, attachments, Number(laborCost) || 0, selectedClient)}
        style={{
          background: ((items.length === 0 && !(Number(laborCost) > 0)) || (needsClientPick && !selectedClient)) ? C.surface2 : GRADIENT,
          opacity: ((items.length === 0 && !(Number(laborCost) > 0)) || (needsClientPick && !selectedClient)) ? 0.6 : 1,
        }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white"
      >
        Trimite lista în conversație
      </button>
    </div>
  );
}
