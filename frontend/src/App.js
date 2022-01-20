import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import ProductScreen from './screens/ProductScreen';
import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route 
              path='/' 
              element={<HomeScreen />} 
              exact 
            />
            <Route 
              path='/product/:id' 
              element={<ProductScreen />} 
            />
            <Route
              path='privacy-policy'
              element={<PrivacyPolicyScreen />}
              exact
            />
            <Route
              path='terms-and-conditions'
              element={<TermsAndConditionsScreen />}
              exact
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
