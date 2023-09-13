// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { GlobalStyles } from "../styles/global-styles";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { asPath, route, pathname } = router;

  if (asPath === "/" || asPath === "/register") {
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }
}

export default MyApp;
