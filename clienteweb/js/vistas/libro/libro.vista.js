var vista = null;
var libroVista = {

    init:function(){
        vista.referenciarObjetos();
        vista.referenciarControles();
        vista.asignarEventos();

    },

    referenciarObjetos:function(){
        vista.control = libroControl;
        vista.modelo = libroModelo;
    },

    referenciarControles:function(){

    },

    asignarEventos:function(){
        
    },

};

vista = libroVista;
