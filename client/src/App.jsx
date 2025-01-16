import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/landing-page/LandingPage'
import Login from './pages/Account/login/Login'
import SignUp from './pages/Account/signup/SignUp'
import Demo from './pages/dashboard/Demo';
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/protectedroute/ProtectedRoute';

function App() {
  const theme = useSelector((state) => state.theme.theme)

  if (theme === 'dark') {
    document.documentElement.style.setProperty('--bg', '#000')
    document.documentElement.style.setProperty('--text', '#fff')
    document.documentElement.style.setProperty('--primary', 'var(--dark-primary)')
    document.documentElement.style.setProperty('--secondary', 'var(--dark-secondary)')
  } else {
    document.documentElement.style.setProperty('--bg', '#fff')
    document.documentElement.style.setProperty('--text', '#000')
    document.documentElement.style.setProperty('--primary', 'var(--light-primary)')
    document.documentElement.style.setProperty('--secondary', 'var(--light-secondary)')
  }

  return (
    <>
      <Router>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<ProtectedRoute element={<Demo />} />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
