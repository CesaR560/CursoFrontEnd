

$.fn.llenarCombo = function(data, texto, valor, defecto){
    //this: hace referencia al objeto sobre el que se esta trabajando.
    this.empty();
    if (defecto === undefined || defecto === true){
        this.append( $('<option>').val(-1).text('Seleccione una opcion')  );
    }
    for (var i = 0; i<data.length; i++){
        var item = data[i];
        var option = $('<option>').val(item[valor]).text(item[texto]);
        this.append( option );
    }
    return this; //Siempre que se hagan plugins en jQuery, intentar retornar el objeto this
};
