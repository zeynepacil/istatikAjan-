import { useState } from 'react';
import { BookOpen, Code, Copy, Check, AlertTriangle, Play } from 'lucide-react';
// Senin özel Buton bileşenin:
import { Button } from '../components/ui/Button'; 
import { analyzeLiterature } from '../services/api';

export default function LiteratureAgent() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<string[] | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await analyzeLiterature(input);
      
      let extracted: string[] = [];
      if (response && response.found_equations) {
         extracted = Array.isArray(response.found_equations) 
            ? response.found_equations 
            : [...(response.found_equations.blocks || []), ...(response.found_equations.inline || [])];
      }
      setResults(extracted);
    } catch (err) {
      console.error(err);
      setError("Bağlantı Hatası: Backend (main.py) çalışıyor mu?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Kart Yapısı */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-academic-600" />
                Literatür Analiz Ajanı
            </h3>
            <p className="text-sm text-slate-500 mt-1">
                Akademik metinleri tarar ve LaTeX formatındaki denklemleri ayıklar.
            </p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Girdi Metni</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-40 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-academic-500 focus:border-transparent font-mono text-sm resize-none transition-all outline-none"
              placeholder="Metni buraya yapıştırın... (Örn: Enerji $E=mc^2$ formülü ile ifade edilir.)"
              disabled={isLoading}
            />
          </div>
          
          {error && (
            <div className="flex items-center text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* --- SENİN ÖZEL BUTONUN --- */}
          <div className="flex justify-end">
            <Button 
              onClick={handleAnalyze} 
              disabled={!input.trim()} 
              isLoading={isLoading}
              variant="primary" // Senin kodundaki varsayılan stil
            >
              {!isLoading && <Play className="w-4 h-4 mr-2" />}
              Analiz Et
            </Button>
          </div>
        </div>
      </div>

      {/* Sonuçlar */}
      {results && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center">
              <Code className="w-5 h-5 mr-2 text-academic-600" />
              Bulunan Denklemler
              <span className="ml-3 px-2.5 py-0.5 bg-academic-100 text-academic-800 text-xs font-bold rounded-full">
                {results.length} Adet
              </span>
            </h3>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              Metin içinde LaTeX formatında denklem bulunamadı.
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {results.map((eq, idx) => (
                <div key={idx} className="group relative bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center justify-between hover:border-academic-300 hover:shadow-sm transition-all">
                  <code className="text-sm font-mono text-slate-800 break-all pr-12">{eq}</code>
                  <button 
                    onClick={() => handleCopy(eq, idx)}
                    className="absolute right-3 top-3 p-2 text-slate-400 hover:text-academic-600 hover:bg-academic-50 rounded-md transition-all"
                    title="Kopyala"
                  >
                    {copiedIndex === idx ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}