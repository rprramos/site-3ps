# Site 3P's Produções

Site estático (HTML, CSS e JavaScript), pronto para o GitHub Pages.

## Como publicar pelo navegador (sem instalar nada)
1. Em github.com, clique em **New** e crie um repositório **público** chamado `site-3ps`.
2. Na página do repositório vazio, clique em **uploading an existing file**.
3. O GitHub aceita até 100 arquivos por envio, então envie em 3 levas:
   - **Leva 1:** `index.html`, `README.md` e as pastas `.github`, `css`, `js`, `data`, `scripts`, `assets/img`, `assets/reels`, `assets/video`. → **Commit changes**
   - **Leva 2:** a pasta `assets/photos` (arraste a pasta `assets` contendo só `photos`, ou entre em `assets` e use Add file → Upload files). → **Commit changes**
   - **Leva 3:** a pasta `assets/thumbs`. → **Commit changes**
4. **Settings → Pages → Branch: main / (root) → Save.** Em 1 a 2 minutos o site estará em `https://SEU-USUARIO.github.io/site-3ps/`.
5. **Settings → Actions → General → Workflow permissions → Read and write** (para o portfólio do YouTube se atualizar sozinho).

## Portfólio automático
- `.github/workflows/youtube.yml` roda todo dia e adiciona os vídeos novos do canal em `data/youtube.json`.
- Para atualizar na hora: aba **Actions → Atualizar portfólio do YouTube → Run workflow**.
- `data/portfolio-config.json`: `destaque` = vídeo em destaque; `ocultar` = lista de IDs que não aparecem.
