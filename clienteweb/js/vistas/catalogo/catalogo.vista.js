var vista = null;
var catalogoVista = {

    init:function () {
        vista.referenciarObjetos();
        vista.referenciarControles();
        vista.asignarEventos();
        vista.consultarAutores();
        vista.consultarLibros();
        vista.renderTemplateLibros = vista.obtenerTemplateCatalogo();
    },


	referenciarObjetos:function(){
		vista.control = catalogoControl;
		vista.modelo = catalogoModelo;
	},

	referenciarControles:function(){
		vista.form = $('#formulario');
		vista.txtNombre = vista.form.find('#txtNombre');
		vista.btnBuscarNombre = vista.form.find('#btnBuscarNombre');
		vista.cmbAutores = vista.form.find('#cmbAutores');
		vista.contenedorCatalogo = vista.form.find('#contenedor-catalogo');
	},

	asignarEventos:function(){
		vista.txtNombre.on('keyup', vista.filtrarPorNombre);
		vista.btnBuscarNombre.on('click', vista.filtrarPorNombre);
		vista.cmbAutores.on('change', vista.filtrarPorAutor);
	},

	consultarAutores:function(){
		vista.control.consultarAutores(vista.onConsultarAutoresCompleto);
	},

	onConsultarAutoresCompleto:function(respuesta){
		vista.cmbAutores.llenarCombo(respuesta.data, '_id', 'nombre');
	},

	consultarLibros:function(){
		vista.control.consultarTodos(vista.onConsultarLibrosCompleto);
	},

	onConsultarLibrosCompleto:function(respuesta){
		vista.modelo.libros = respuesta.data;
		vista.contenedorCatalogo.empty();
		var items = $(vista.renderTemplateLibros({libros:respuesta.data}));
		vista.contenedorCatalogo.append( items );

		if (respuesta.data && respuesta.data.length>0){
			vista.contenedorCatalogo.find('.btn-detalles').on('click', vista.cargarDetallesLibro);
			vista.contenedorCatalogo.find('.btn-carrito').on('click', vista.agregarLibroCarrito);
		}
	},

	cargarDetallesLibro:function(){
		var btn = $(this);
		var idLibro = btn.attr('data-id');
		sessionStorage.setItem('detalle_libro', idLibro);
		__app.redireccionar(__app.rutas.VISTAS.DETALLES_LIBRO);
	},

	agregarLibroCarrito:function(){

	},

	filtrarPorNombre:function(){
		var nombre = vista.txtNombre.val().trim();
		if (nombre.length === 0) {
			vista.consultarLibros();
			return;
		}
		if (nombre.length>=3) {
			vista.control.consultarPorNombre(nombre, vista.onConsultarLibrosCompleto);
			return;
		}
	},

	filtrarPorAutor:function(){
		var idAutor = vista.cmbAutores.val();
		if (idAutor==='-1') {
			vista.consultarLibros();
			return;
		}
		vista.control.consultarPorAutor(idAutor, vista.onConsultarLibrosCompleto);
	},

	obtenerTemplateCatalogo:function(){
		return Handlebars.compile( $('#tpl-libro').html() );
	},

};

vista = catalogoVista;
catalogoVista.init();