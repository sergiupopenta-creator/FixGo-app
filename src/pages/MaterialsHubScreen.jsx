import { ChevronRight, ClipboardList, FileText } from 'lucide-react';
import { C } from '../styles/theme';
import BackButton from '../components/BackButton';

export default function MaterialsHubScreen({ materialsLists, myLists, push, goBack }) {
  const clientListsCount = Object.values(materialsLists).filter(d => (d.items || []).length > 0 || (d.laborCost || 0) > 0).length;
  return (
    <div className="px-5 pt-2 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <BackButton onClick={goBack} />
        <h1 className="text-base font-semibold" style={{ color: C.text }}>Liste de materiale</h1>
      </div>

      <button onClick={() => push('clientMaterialsLists', {})} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full rounded-2xl p-4 mb-3 flex items-center justify-between text-left">
        <div className="flex items-center gap-3">
          <div style={{ background: 'rgba(249,115,22,0.15)' }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
            <ClipboardList size={18} color={C.purple} />
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: C.text }}>Pentru clienți</div>
            <div className="text-xs" style={{ color: C.textMuted }}>{clientListsCount} liste trimise</div>
          </div>
        </div>
        <ChevronRight size={18} color={C.textMuted} />
      </button>

      <button onClick={() => push('myNotes', {})} style={{ background: C.surface, border: `1px solid ${C.border}` }} className="w-full rounded-2xl p-4 flex items-center justify-between text-left">
        <div className="flex items-center gap-3">
          <div style={{ background: 'rgba(52,211,153,0.15)' }} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText size={18} color={C.green} />
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: C.text }}>Listele mele</div>
            <div className="text-xs" style={{ color: C.textMuted }}>{myLists.length} notițe personale</div>
          </div>
        </div>
        <ChevronRight size={18} color={C.textMuted} />
      </button>
    </div>
  );
}
