import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ContextProvider } from './context/MyContext';
import Dashboard from './components/Dashboard'

const App = () => {
  
  return (
    <ContextProvider>
      <Router>
        <div className='App container'>
          <Routes>
            <Route exact path='/' element={<Dashboard/>}/>
          </Routes>
        </div>
      </Router>
    </ContextProvider>
  )
}

export default App;
