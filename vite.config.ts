import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ajuste para caminho relativo ("./") para evitar erros de carregamento (tela branca)
  // quando o servidor de preview não está na raiz exata "/SP-CREATIVE/".
  base: "./",
})