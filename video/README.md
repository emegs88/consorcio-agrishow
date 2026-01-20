# 📹 Vídeos do Projeto

Esta pasta contém os arquivos de vídeo utilizados no site **Prospere Agro Credit**.

## 🎬 Vídeo Principal

**Nome do arquivo:** `video.mp4`

### 📋 Especificações Recomendadas

- **Formato:** MP4 (H.264 codec)
- **Resolução:** 1920x1080 (Full HD) ou superior
- **Duração:** 30-60 segundos (para loop suave)
- **Tamanho:** Recomendado máximo de 10-15 MB (para web)
- **Aspect Ratio:** 16:9

### 📍 Onde é Usado

1. **Hero Section** - Background principal do site
2. **Agrishow Experience** - Background da seção especial

### ✅ Conteúdo Recomendado

O vídeo deve conter:
- Imagens de lavouras e colheitadeiras
- Drones sobrevoando plantações
- Gado em pastagens
- Máquinas agrícolas em operação
- Gráficos e elementos tecnológicos (opcional)
- Estética profissional e moderna

### 🔄 Otimização

Para reduzir o tamanho do arquivo:

```bash
# Usando FFmpeg (exemplo)
ffmpeg -i video-original.mp4 -vcodec h264 -acodec aac -crf 23 -preset slow video.mp4
```

### 📝 Nota

Por padrão, arquivos `.mp4`, `.mov` e `.avi` estão no `.gitignore` para não versionar vídeos grandes. Se quiser versionar o vídeo, edite o `.gitignore` na raiz do projeto.
