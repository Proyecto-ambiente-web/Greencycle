import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export function Home() {
    return (
        <Container sx={{ p: 2 }} maxWidth='sm'>
            <Typography
                component='h1'
                variant='h2'
                align='center'
                color='green'
                gutterBottom
            >
            GreenCycle
            </Typography>
            <Typography variant='h6' align='center' color='text.secondary' paragraph>
           Canjea tus eco-monedas por un futuro más verde, cosechando descuentos y cupones eco-amigables mientras transformas tus acciones en semillas de sostenibilidad digital
            </Typography>
        </Container>
    )
}