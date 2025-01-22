import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { createWorker } from 'tesseract.js';

const app = express();
const port = 3000;

// Configurar CORS
app.use(cors());

// Configurar multer para el manejo de archivos
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // límite de 5MB
  }
});

// Ruta principal para procesar imágenes
app.post('/ocr', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
    }

    const worker = await createWorker();
    
    // Realizar OCR en la imagen
    const { data: { text } } = await worker.recognize(req.file.buffer);
    
    // Liberar recursos
    await worker.terminate();

    // Enviar resultado
    res.json({
      success: true,
      text: text
    });

  } catch (error) {
    console.error('Error en el procesamiento OCR:', error);
    res.status(500).json({
      success: false,
      error: 'Error en el procesamiento de la imagen'
    });
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API OCR funcionando' });
});

app.listen(port, () => {
  console.log(`Servidor OCR ejecutándose en http://localhost:${port}`);
});