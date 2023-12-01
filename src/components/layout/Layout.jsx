import { Footer } from "./Footer";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "../../themes/theme";
import PropTypes from "prop-types";
import Header from './Header';
import { Toaster } from 'react-hot-toast';
<Toaster position='top-center' />

Layout.propTypes = { children: PropTypes.node.isRequired };

export function Layout({ children }) {
    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />
            <Header />
            <Container
                maxWidth="xl"
                style={{ paddingTop: "1rem", paddingBottom: "4.5rem" }}
            >
                <Toaster position='top-center' />

                {children}
            </Container>
            <Footer />
        </ThemeProvider>
    );
}
