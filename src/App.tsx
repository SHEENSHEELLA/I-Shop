import './App.css'
import { Route, Routes } from 'react-router'
import { BestSellers } from './components/BestSellers/BestSellers'
import Header from './components/Header/Header'

function App() {
  return (
    <div className="appContainer">
      <Header />
      <Routes>
        <Route path="/" element={<BestSellers />} />
      </Routes>
    </div>
  )
}

export default App
