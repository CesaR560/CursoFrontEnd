__app.rutas = {

    base: 'http://localhost:5000',

    API: {

        LIBROS: {
            REGISTRAR: {url: '/libros/registrar', metodo: 'POST', datatype:'json' },
            CONSULTAR_TODOS: {url: '/libros/consultar', metodo: 'GET', datatype:'json'},
            CONSULTAR_POR_ID: {url: '/libro/', metodo: 'GET', datatype:'json'},
            CONSULTAR_POR_NOMBRE: {url: '/libros/buscar/:q', metodo: 'GET', datatype:'json'},
            CONSULTAR_POR_AUTOR: {url: '/libros/autor/:autor', metodo: 'GET', datatype:'json'},
        },

        AUTORES: {
            REGISTRAR: {url: '/autores/registrar', metodo: 'POST', datatype:'json'},
            CONSULTAR_TODOS: {url: '/autores/consultar', metodo: 'GET', datatype:'json'},
            CONSULTAR_POR_ID: {url: '/autor/:id', metodo: 'GET', datatype:'json'},
        }

    },

    VISTAS: {

        INDEX: {url: '/index.html'},
        GESTION_LIBROS: {url: 'vistas/gestion/libros.html'},
        GESTION_AUTORES: {url: 'vistas/gestion/autores.html'},
        DETALLES_LIBRO: {url: 'vistas/libros/libro.html'},
        CARRITO_COMPRAS: {url: 'vistas/compras/pedido.html'},
        RESUMEN_COMPRA: {url: 'vistas/compras/resumen.html'},


    }

};