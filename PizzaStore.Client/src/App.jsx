import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import FloatingShape from './components/FloatingShape'
import HomePage from "./pages/HomePage";

import './index.css'

function App() {
  return (
    <>
      <div className='min-h-screen bg-gradient-to-br
        from-gray-900 via-green-900 to-sky-900 flex bg-
        items-center justify-center relative overflow-hidden'
      >
        <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
        <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
        <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
