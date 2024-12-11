import './App.css'
import LandingPage from './pages/landing-page/LandingPage'
import { useSelector } from 'react-redux'

function App() {
  const theme = useSelector((state) => state.theme.theme)

  if (theme === 'dark') {
    document.documentElement.style.setProperty('--bg', '#000')
    document.documentElement.style.setProperty('--text', '#fff')
    document.documentElement.style.setProperty('--secondary-bg', '#0D0D0D')
  } else {
    document.documentElement.style.setProperty('--bg', '#fff')
    document.documentElement.style.setProperty('--text', '#000')
    document.documentElement.style.setProperty('--secondary-bg', '#E2E2E2')
  }

  return (
    <>
      <LandingPage />
    </>
  )
}

export default App
