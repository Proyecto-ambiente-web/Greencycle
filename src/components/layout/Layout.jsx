import { Footer } from "./Footer";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "../../themes/theme";
import PropTypes from "prop-types";
import Header from './Header';

Layout.propTypes = { children: PropTypes.node.isRequired };
Layout.propTypes = { setIdUsuario: PropTypes.func.isRequired };

export function Layout({ children, setIdUsuario }) {
    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />
            <Header setIdUsuario={setIdUsuario} />
            <Container
                maxWidth="xl"
                style={{ paddingTop: "1rem", paddingBottom: "4.5rem" }}
            >
                {children}
            </Container>
            <Footer />
        </ThemeProvider>
    );
}
