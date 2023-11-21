
export function CanjeoMateriales() {




    return (
        <>
            <section className="headerFactura">
                <div style={{ textAlign: 'left' }}>
                    <h2>Canjeo</h2>
                    <p>Fecha: {`${new Date().getDate()}/${(new Date().getMonth()) + 1}/${new Date().getFullYear()}`}</p>
                    <br />
                    <h1>Cetro de acopio </h1>
                    <p>Nombre: {}</p>
                    <p>Administrador: {}</p>

                </div>
                <div style={{ textAlign: 'right' }}>
                    <h2>Facturado a:</h2>
                    <p style={{ textAlign: 'left' }}>{"Nombre"}</p>
                    <p style={{ textAlign: 'left' }}>{"Correo"}</p>
                    <p style={{ textAlign: 'left' }}>{"identificación"}</p>

                    <br />
                    
                </div>
            </section>
        </>
    )
}