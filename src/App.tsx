import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TestPurchase from './pages/TestPurchase';
import Wardrobe from './pages/Wardrobe';
import Dashboard from './pages/Dashboard';
import Cashback from './pages/Cashback';
import Rewards from './pages/Rewards';
import ExtensionDemo from './pages/ExtensionDemo';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tester" element={<TestPurchase />} />
          <Route path="dressing" element={<Wardrobe />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cashback" element={<Cashback />} />
          <Route path="recompenses" element={<Rewards />} />
          <Route path="extension" element={<ExtensionDemo />} />
          <Route path="a-propos" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
