var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectID;

var db = null;



var app = express();
app.use(bodyParser.urlencoded({encoded:true, extended:true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


app.post('/libros/registrar', registrarLibro);
app.post('/autores/registrar', registrarAutor);

app.get('/libros/consultar', consultarLibros);
app.get('/autores/consultar', consultarAutores);

app.get('/libro/:id', consultarLibroId);

app.get('/libros/autor/:autor', consultarLibrosPorAutor);
app.get('/libros/buscar/:q', consultarLibrosPorNombre);
app.get('/autor/:id', consultarAutorPorId);


function registrarLibro(req, res){
    var libros = db.collection('libros');
    var nuevoLibro = {
        nombre: req.body.nombre,
        autor: new ObjectId(req.body.autor),
        precio: parseFloat(req.body.precio),
        portada: req.body.portada
    };

    libros.insertOne(nuevoLibro, function(err, resultado){
        if (err) { return validarError(res, err, 'Ocurrió un error al registrar el libro') }
        res.send({mensaje:'Libro registrado exitosamente', codigo: 2 });
    });
};



function registrarAutor(req, res){
    var autores = db.collection('autores');
    var nuevoAutor = {
        nombre: req.body.nombre
    };
    autores.insertOne(nuevoAutor, function(err, resultado){
        if (err) { return validarError(res, err, 'Ocurrió un error al registrar el autor') }
        res.send({mensaje:'Autor registrado exitosamente', codigo: 2});
    });
};


function consultarLibros(req, res){
	var libros = db.collection('libros');
	var opciones = {
        collation:{locale:'es'},
		sort:{'precio': -1, 'nombre': 1}
	};
	libros.find({}, opciones).toArray(function(err, data){
        if (err) { return validarError(res, err, 'Ocurrió un error al consultar los libros') }
        res.send(construirRespuestaDatos(data, 'Libros encontrados'));
	});
}


function consultarAutores(req, res){
	var libros = db.collection('autores');
	var opciones = {
        collation:{locale:'es'},
	    sort:{'nombre': 1}
    };
	libros.find({}, opciones).toArray(function(err, data){
        if (err) { return validarError(res, err, 'Ocurrió un error al consultar los autores') }
        res.send(construirRespuestaDatos(data, 'Autores encontrados'));
	});
}



function consultarLibroId(req, res){
	var id = new ObjectId(req.params.id);
	var post = db.collection('libros');
	post.findOne({_id:id}, function(err, data){
        if (err) { return validarError(res, err, 'Error al consultar el libro por ID') }
        res.send({mensaje:'Libro encontrado', codigo:1, data:data});
	});
}

function consultarAutorPorId(req, res){
    var id = new ObjectId(req.params.id);
    var post = db.collection('autores');
    post.findOne({_id:id}, function(err, data){
        if (err) { return validarError(res, err, 'Error al consultar el autor por ID') }
        res.send({mensaje:'Autor encontrado', codigo:1, data:data});
    });
}



function consultarLibrosPorAutor(req, res){
	var autores = db.collection('libros');
	var idAutor = req.params.autor;
	console.log(idAutor);
	autores.find({autor:new ObjectId(idAutor)}).toArray(function(err, data){
        if (err) { return validarError(res, err, 'Error al consultar libros por autor') }
        res.send(construirRespuestaDatos(data, 'Libros encontrados por autor'));
	});
}

function consultarLibrosPorNombre(req, res){
    var q = req.params.q;
    console.log(q);
    var regExpr = new RegExp(q, 'i');

    var libros = db.collection('libros');
    libros.find({nombre:regExpr}).toArray(function(err, data){
        if (err) { return validarError(res, err, 'Error al consultar libros por nombre') }
        res.send(construirRespuestaDatos(data, 'Libros encontrados por nombre'));
    });
}

function validarError(res, err, mensaje) {
    console.error(err);
    res.send({mensaje:mensaje, codigo:-1 });
    return false;
}

function construirRespuestaDatos(data, mensaje) {
    var respuesta = {};
    if (data && data.length > 0 ){
        respuesta.codigo = 1;
        respuesta.mensaje = mensaje;
        respuesta.data = data;
        return respuesta;
    }

    return {
        codigo:0,
        mensaje:'No se encontraron resultados'
    }
}



MongoClient.connect('mongodb://jsvanegas:123@ds225028.mlab.com:25028/tiendalibros', function(err, client){
	if (err) { return console.log(err); }
	db = client.db('tiendalibros');
	app.listen(5000);
	console.log('Servidor corriendo en puerto 5000');	
});

