# 🎓 Akademik Araştırma Asistanı (Academic Research Agent)

Bu proje, akademik süreçleri hızlandırmak amacıyla geliştirilmiş, **Mikroservis Mimarisine** dayalı modern bir web uygulamasıdır. 

Proje, araştırmacılara literatür taraması, istatistiksel analiz ve makale yazımı konularında yardımcı olan 3 farklı yapay zeka ajanından oluşur.

---

## 🚀 Özellikler (Ajanlar)

### 1. 📚 Literatür Analiz Ajanı (Literature Agent)
* **Görevi:** Akademik metinleri tarar ve matematiksel formülleri (LaTeX formatında) ayıklar.
* **Teknoloji:** Python (Regex & Text Processing).
* **Kullanım:** Metni yapıştırın, `$E=mc^2$` gibi formülleri anında listelesin.

### 2. 📊 İstatistik Analiz Ajanı (Statistics Agent)
* **Görevi:** Büyük veri setlerini (CSV/Excel) işleyerek anlamlılık testleri (t-test simülasyonu) yapar.
* **Çıktı:** Sonuçları bilimsel standartlara uygun **APA 7 Formatında** (örn: *p < .001*) raporlar.
* **Teknoloji:** Python (Data Simulation & Formatting).

### 3. ⚖️ Hakem/Reviewer Ajanı (Abstract Check)
* **Görevi:** Makale özetlerini (Abstract) yapısal olarak denetler.
* **Kontroller:** Kelime sayısı (150-300 arası), Anahtar kelimeler (Amaç, Yöntem, Sonuç) ve genel yapı.
* **Çıktı:** 100 üzerinden puanlama ve detaylı geri bildirim raporu.

---

## 🛠️ Teknolojiler

Bu proje **Client-Server (İstemci-Sunucu)** mimarisi ile geliştirilmiştir.

### Frontend (Ön Yüz)
* **Framework:** React 18
* **Dil:** TypeScript
* **Build Tool:** Vite
* **Stil:** Tailwind CSS
* **İkonlar:** Lucide React

### Backend (Arka Yüz)
* **Framework:** FastAPI (Python)
* **Sunucu:** Uvicorn
* **Özellikler:** CORS, Pydantic Models, Async/Await

---
