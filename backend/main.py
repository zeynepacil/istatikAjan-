from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import re
import time
import random

app = FastAPI()

# --- 1. CORS AYARLARI (İletişim İzni) ---
# Bu kısım olmadan React ile Python konuşamaz!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Her yerden gelen isteğe izin ver (Geliştirme için)
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, vb. hepsine izin ver
    allow_headers=["*"],
)

# --- 2. VERİ MODELLERİ ---
class TextRequest(BaseModel):
    text: str

# --- 3. ENDPOINTLER ---

@app.get("/")
def read_root():
    return {"status": "Backend calisiyor", "message": "Hoşgeldin Zeynep!"}

# Literatür Ajanı için Endpoint
@app.post("/analyze-text")
async def analyze_text(request: TextRequest):
    # LaTeX formüllerini bulan Regex deseni
    # $...$ (inline) veya $$...$$ (blok) ifadeleri yakalar
    pattern = r'\$\$?.*?\$\$?'
    
    # Metin içinde arama yap
    found_equations = re.findall(pattern, request.text, re.DOTALL)
    
    return {"found_equations": found_equations}

# İstatistik Ajanı için Endpoint
@app.post("/analyze-data")
async def analyze_data(file: UploadFile = File(...)):
    # Simülasyon: Dosya büyükmüş gibi bekletiyoruz (2 saniye)
    time.sleep(2)
    
    # Dosya adını okuyoruz (Gerçekte pandas ile işlenir)
    filename = file.filename
    
    # Rastgele bir p-değeri üret (Simülasyon)
    p_value = random.uniform(0.001, 0.10)
    
    # APA Formatlama Fonksiyonu
    # p < .001 ise "< .001", değilse ".123" formatı (başında sıfır olmadan)
    if p_value < 0.001:
        p_apa = "< .001"
    else:
        # Virgülden sonra 3 hane ve baştaki "0"ı at
        p_apa = f"{p_value:.3f}".lstrip('0') 
    
    return {
        "filename": filename,
        "result": {
            "p_value": p_value,
            "p_value_apa": p_apa,
            "test_type": "Independent Samples t-test (Simulated)"
        }
    }


# --- REVEIWER (HAKEM) AJANI İÇİN YENİ ENDPOINT ---

class ReviewRequest(BaseModel):
    abstract_text: str

@app.post("/review-abstract")
async def review_abstract(request: ReviewRequest):
    text = request.abstract_text.lower()
    word_count = len(text.split())
    
    # Basit Kural Tabanlı Kontrol (Simülasyon)
    feedback = []
    score = 100
    
    # 1. Kelime Sayısı Kontrolü
    if word_count < 100:
        feedback.append({"status": "fail", "msg": f"Çok kısa! ({word_count} kelime). En az 150 olmalı."})
        score -= 20
    elif word_count > 300:
        feedback.append({"status": "fail", "msg": f"Çok uzun! ({word_count} kelime). En fazla 250 olmalı."})
        score -= 20
    else:
        feedback.append({"status": "pass", "msg": f"Kelime sayısı ideal ({word_count})."})

    # 2. Anahtar Kelime Kontrolü
    keywords = {
        "purpose": ["amaç", "hedef", "aim", "purpose", "bu çalışmada"],
        "method": ["yöntem", "metod", "method", "approach", "kullanılarak"],
        "result": ["sonuç", "bulgu", "result", "finding", "göstermektedir"]
    }
    
    for key, words in keywords.items():
        if any(w in text for w in words):
            feedback.append({"status": "pass", "msg": f"{key.capitalize()} bölümü tespit edildi."})
        else:
            feedback.append({"status": "warning", "msg": f"{key.capitalize()} ifadesi eksik veya net değil."})
            score -= 15

    return {
        "score": max(0, score),
        "feedback": feedback
    }

# Python dosyasını doğrudan çalıştırırsan (python backend/main.py) bu blok çalışır
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)