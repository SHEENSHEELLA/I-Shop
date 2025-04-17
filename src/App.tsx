import './App.css'
import { Route, Routes } from 'react-router'
import { BestSellers } from './components/BestSellers/BestSellers'
import Header from './components/Header/Header'
import { Product } from './components/Product/Product'

function App() {
  return (
    <div className="appContainer">
      <Header />
      <Routes>
        <Route path="/" element={<BestSellers />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </div>
  )
}

export default App
