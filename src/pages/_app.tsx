// import "../styles/globals.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { theme } from "../styles/theme";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";

// Create a client
const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }
}

export default MyApp;
