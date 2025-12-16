const API_BASE_URL = "http://127.0.0.1:8000";

// Literatür Analizi (Regex)
export const analyzeLiterature = async (text: string) => {
  try {
    // Python'daki endpoint ismine dikkat et (/analyze-text veya /analyze-literature olabilir)
    // Eğer Python kodunda @app.post("/analyze-text") yazıyorsa burayı değiştirme.
    const response = await fetch(`${API_BASE_URL}/analyze-text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`API Hatası: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Literatür analizi başarısız:", error);
    throw error;
  }
};

// İstatistik Analizi (Dosya Yükleme)
export const analyzeStatistics = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/analyze-data`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API Hatası: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("İstatistik analizi başarısız:", error);
    throw error;
  }
};

// Hakem Analizi (Abstract Kontrolü)
export const reviewAbstract = async (text: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/review-abstract`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ abstract_text: text }),
    });

    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  } catch (error) {
    console.error("Hakem analizi başarısız:", error);
    throw error;
  }
};

export const api = {
  analyzeLiterature,
  analyzeStatistics,
  reviewAbstract // <--- BUNU EKLEDİK
};