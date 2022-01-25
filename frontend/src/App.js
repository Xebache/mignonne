import Router from "./routes/Router";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Theme";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main className="py-3">
        <Router />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
