var __app = {


    ajax:function (config) {
        var params = {
            url: __app.obtenerURL(config),
            data:config.data,
            type:config.ruta.metodo,
            dataType:config.ruta.datatype,
            success:function(respuesta) {
                __app.validarRespuestaAjax(respuesta, config);
            },
            error:function (err) {
                __app.controlarErrorAjax(err, config);
            },
            beforeSend:function () {
                __dom.mostrarCargador( config.background );
            }
        };
        $.ajax(params);
    },

    obtenerURL:function(config) {
        var posicionParametro = config.ruta.url.indexOf(':');
        if (posicionParametro === -1) {
            return __app.rutas.base + config.ruta.url;
        }
        var url = config.ruta.url.substring(0, posicionParametro);
        var param = config.ruta.url.substring(posicionParametro + 1); //+1 para omitir los dos puntos
        var rutaCompleta = __app.rutas.base + url + config.data[param];
        delete config.data;
        return rutaCompleta;
    },


    validarRespuestaAjax:function(respuesta, config){
        __dom.ocultarCargador();
        switch (respuesta.codigo ){
            case -1:
                __dom.mostrarMensajeError(respuesta);
                return;
                break;
            case 0:
                __dom.mostrarMensajeSinDatos(respuesta);
                if (config.success){
                    config.success(respuesta);
                    return;
                }
                return;
                break;
            case 1:
            case 2:
                if (config.success){
                    config.success(respuesta);
                    return;
                }
        }
    },

    controlarErrorAjax:function(err, config){
        console.error(err);
        __dom.mostrarMensajeErrorAjax(err);
    },

    redireccionar:function(ruta){
        if (!ruta.url) {
            return;
        }
        location.href = ruta.url;
    }


};