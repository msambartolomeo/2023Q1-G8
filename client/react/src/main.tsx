import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeConfig } from './config/theme.config.tsx'
import { AuthProvider } from './api/useAuth.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ThemeConfig>
    <App />
    </ThemeConfig>
  </AuthProvider>
)
