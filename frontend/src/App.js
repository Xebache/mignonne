import Container from "react-bootstrap/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ThemeProvider } from '@mui/material/styles';
import theme from "./styles/Theme";

import Header from "./components/Header";
import Footer from "./components/Footer";

import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";
import ProductScreen from "./screens/ProductScreen";
import SignupScreen from "./screens/SignupScreen";
import TermsAndConditionsScreen from "./screens/TermsAndConditionsScreen";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />}>
                {/* <Route path=":id" element={<CartScreen />}/> */}
                <Route path=":id/:qty" element={<CartScreen />} />
              </Route>
              <Route
                path="privacy-policy"
                element={<PrivacyPolicyScreen />}
                exact
              />
              <Route
                path="terms-and-conditions"
                element={<TermsAndConditionsScreen />}
                exact
              />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
