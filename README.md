# API OCR con Node.js y Tesseract.js

Esta API permite extraer texto de imágenes utilizando OCR (Reconocimiento Óptico de Caracteres).

## Endpoints

### POST /ocr
Procesa una imagen y devuelve el texto extraído.

**Parámetros:**
- `image`: Archivo de imagen (multipart/form-data)

**Ejemplo de uso con cURL:**
```bash
curl -X POST -F "image=@ruta/a/tu/imagen.jpg" http://localhost:3000/ocr
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "text": "Texto extraído de la imagen"
}
```

## Límites
- Tamaño máximo de archivo: 5MB
- Formatos soportados: PNG, JPEG, GIF, BMP

## Instalación y Uso

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar el servidor:
   ```bash
   npm run dev
   ```

3. El servidor estará disponible en http://localhost:3000