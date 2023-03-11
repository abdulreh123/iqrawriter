import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'
import Subscribers from './Subscribers'

function App() {
  return (
    <Router>
      <Routes >
        <Route exact path="/" element={<Home/>} />
        <Route path="/JpzAa4KvMlscSVpPEELB" element={<Subscribers />} />
      </Routes >
    </Router>
  );
}

export default App;