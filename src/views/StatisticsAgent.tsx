import React, { useState, useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
// DÜZELTME 1: { api } yerine direkt fonksiyonu çağırdık
import { analyzeStatistics } from '../services/api';
import { BarChart3, UploadCloud, FileSpreadsheet, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';

export const StatisticsAgent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  // Backend'den gelen veriyi tutacak yapı
  const [result, setResult] = useState<{ value: number; formatted: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    setResult(null);
    setError(null);

    try {
      // DÜZELTME 2: api.analyzeStatistics yerine direkt fonksiyon kullanımı
      const response = await analyzeStatistics(file);
      
      // DÜZELTME 3: Backend'den gelen veriyi senin UI yapına uydurma (Mapping)
      // Python'dan { result: { p_value: ..., p_value_apa: ... } } geliyor.
      if (response && response.result) {
        setResult({
          value: response.result.p_value,       // Sayısal değer
          formatted: response.result.p_value_apa // APA formatlı string
        });
      }

    } catch (err) {
      console.error(err);
      setError("Veri seti işlenemedi. Lütfen Backend bağlantısını kontrol edin.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card 
        title="İstatistiksel Analiz Ajanı" 
        description="Büyük veri setlerini işler ve APA formatında anlamlılık testi raporlar."
      >
        <div className="space-y-6">
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
              file ? 'border-academic-500 bg-academic-50' : 'border-slate-300 hover:border-academic-400 hover:bg-slate-50'
            }`}
            onClick={() => !isProcessing && fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange}
              accept=".csv,.xlsx,.sav,.json,.txt"
              disabled={isProcessing}
            />
            
            {file ? (
              <div className="flex flex-col items-center">
                <FileSpreadsheet className="w-12 h-12 text-academic-600 mb-2" />
                <p className="font-medium text-slate-900">{file.name}</p>
                <p className="text-sm text-slate-500">{(file.size / 1024).toFixed(2)} KB</p>
                {!isProcessing && <p className="text-xs text-academic-600 mt-2 font-medium">Dosyayı değiştirmek için tıkla</p>}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <UploadCloud className="w-12 h-12 text-slate-400 mb-2" />
                <p className="font-medium text-slate-900">Dosyayı buraya sürükle veya seç</p>
                <p className="text-sm text-slate-500 mt-1">Desteklenen: CSV, Excel, TXT (Simülasyon)</p>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <Button 
              onClick={handleProcess} 
              disabled={!file} 
              isLoading={isProcessing}
              // Eğer senin Button bileşeninde variant prop'u varsa buraya ekleyebilirsin
            >
              {!isProcessing && <BarChart3 className="w-4 h-4 mr-2" />}
              {isProcessing ? 'Veri Seti İşleniyor...' : 'Analizi Başlat'}
            </Button>
          </div>
        </div>
      </Card>

      {result && (
        <Card className="animate-fade-in border-l-4 border-l-academic-600">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full ${result.value < 0.05 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {result.value < 0.05 ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Analiz Tamamlandı</h3>
              <p className="text-slate-600 mb-4">
                Hipotez testi tamamlandı. Sonuçlar APA 7. Sürüm standartlarına göre formatlandı.
              </p>
              
              <div className="bg-slate-100 p-4 rounded-lg border border-slate-200 inline-block">
                <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold mr-3">p-değeri</span>
                <span className="text-2xl font-mono font-bold text-slate-900 italic">p {result.formatted.startsWith('<') ? '' : '= '}{result.formatted}</span>
              </div>
              
              <p className="text-sm text-slate-500 mt-3">
                {result.value < 0.05 
                  ? "Sonuç istatistiksel olarak anlamlıdır (α = .05 düzeyinde)." 
                  : "Sonuç istatistiksel olarak anlamlı değildir (α = .05 düzeyinde)."}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};