import { useState } from 'react';
import { Bot, Camera, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { C, GRADIENT, inputStyle } from '../styles/theme';
import BackButton from '../components/BackButton';
import CategoryChip from '../components/CategoryChip';
import Field from '../components/Field';

export default function EstimatorScreen({ goBack, push }) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [photos, setPhotos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generate() {
    if (!description.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const catName = category ? CATEGORIES.find(c => c.id === category)?.name : 'General';
      const prompt = 'Ești un motor de estimare a prețurilor pentru FixGo, o platformă din România care conectează clienți cu meseriași (electricieni, instalatori, zugravi etc). Primești o descriere a unei lucrări și trebuie să răspunzi DOAR cu un obiect JSON valid, fără text suplimentar, fără markdown, fără backticks, fără explicații înainte sau după. Folosește prețuri realiste de piață din România, în RON. Format exact: {"category":"string","summary":"o propoziție scurtă în română","laborMin":number,"laborMax":number,"materialsMin":number,"materialsMax":number,"otherMin":number,"otherMax":number,"totalMin":number,"totalMax":number}\n\nCategorie sugerată: ' + catName + '. Descrierea lucrării: ' + description;
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [
            { role: 'user', content: prompt },
          ],
        }),
      });
      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        throw new Error(`Cerere eșuată (${response.status}) ${errText.slice(0, 150)}`);
      }
      const data = await response.json();
      const raw = (data.content || []).map(b => b.text || '').join('');
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      const clean = (jsonMatch ? jsonMatch[0] : raw).replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      push('estimateResult', { result: parsed });
    } catch (e) {
      setError('Nu am putut genera estimarea. ' + (e.message || 'Încearcă din nou.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>AI Estimator</h1>
      </div>

      <div className="flex flex-col items-center mb-6 mt-2">
        <div style={{
          width: 88, height: 88, borderRadius: 9999, background: GRADIENT,
          boxShadow: loading ? '0 0 0 8px rgba(249,115,22,0.15)' : 'none', transition: 'box-shadow 0.3s',
        }} className="flex items-center justify-center mb-3">
          <Bot size={40} color="#fff" />
        </div>
        <p className="text-xs text-center" style={{ color: C.textMuted, maxWidth: 260 }}>
          Descrie lucrarea de care ai nevoie și AI-ul nostru îți oferă o estimare de preț în câteva secunde.
        </p>
      </div>

      <Field label="Descrie lucrarea ta">
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="ex. Vreau să schimb instalația electrică într-un apartament de 2 camere, aproximativ 50mp." style={{ ...inputStyle, resize: 'none' }} />
      </Field>

      <Field label="Adaugă poze (opțional)">
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <button key={i} onClick={() => setPhotos(p => Math.max(p, i + 1))} style={{ width: 60, height: 60, borderRadius: 12, background: photos > i ? C.surface2 : 'transparent', border: `1px dashed ${C.border}` }} className="flex items-center justify-center">
              <Camera size={18} color={C.textFaint} />
            </button>
          ))}
        </div>
      </Field>

      <Field label="Categorie (opțional)">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.filter(c => c.id !== 'altele').map(c => (
            <CategoryChip key={c.id} label={c.name} active={category === c.id} onClick={() => setCategory(category === c.id ? null : c.id)} />
          ))}
        </div>
      </Field>

      {error && <p className="text-xs mb-3" style={{ color: C.red }}>{error}</p>}

      <button
        disabled={!description.trim() || loading}
        onClick={generate}
        style={{ background: (!description.trim() || loading) ? C.surface2 : GRADIENT, opacity: (!description.trim() || loading) ? 0.6 : 1 }}
        className="w-full rounded-xl py-3.5 text-sm font-semibold text-white flex items-center justify-center gap-2 mt-2">
        {loading ? (<><Loader2 size={16} className="animate-spin" /> Se generează...</>) : 'Generează estimare'}
      </button>
    </div>
  );
}
