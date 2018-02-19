var libroControl = {

    consultarLibro:function(id, success){
        __app.ajax({
            ruta:__app.rutas.API.LIBROS.CONSULTAR_POR_ID,
            success:success,
            data:id
        })
    },

};