import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import Homepage from './pages/homepage/Homepage'
import { ROUTERS } from './constants'

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          <Route path={ROUTERS.home} element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
