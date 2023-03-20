import { Routes, Route } from 'react-router-dom';
import FormSecurePlace from 'components/FormSecurePlace/FormSecurePlace';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<FormSecurePlace />} />
      </Routes>

    </div>
  );
}

export default App;
