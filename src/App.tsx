// import { createClient } from '@supabase/supabase-js'

import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Signup from './Signup'

function App() {
  // const supabase = createClient('https://rfgnubwzhqzpkttafojn.supabase.co','sb_publishable_gLq9mShgW_mQu6NDFGdN1g_K_i8sBxt')
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  )
}

export default App
