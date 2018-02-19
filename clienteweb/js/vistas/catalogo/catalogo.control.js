var catalogoControl = {


    consultarTodos:function(success){
		__app.ajax({
			ruta:__app.rutas.API.LIBROS.CONSULTAR_TODOS,
			success:success
		});
    },

    consultarPorAutor:function (autor, success) {
		__app.ajax({
			ruta:__app.rutas.API.LIBROS.CONSULTAR_POR_AUTOR,
			success:success,
			data:{autor:autor}
		});
    },
    
    consultarPorNombre:function (nombre, success) {
		__app.ajax({
			ruta:__app.rutas.API.LIBROS.CONSULTAR_POR_NOMBRE,
			success:success,
			data:{q:nombre}
		});
    },

    consultarAutores:function (success) {
		__app.ajax({
			ruta:__app.rutas.API.AUTORES.CONSULTAR_TODOS,
			success:success
		});
    },




};
