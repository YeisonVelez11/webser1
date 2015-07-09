
/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

//app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Conexión a Mongoose.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose.connect('mongodb://localhost/mapamun_Dengue', function(error){
//mongoose.connect('mongodb://localhost/mapamun_Dengue', function(error){

mongoose.connect('mongodb://yeison:oncecaldas11@ds053320.mongolab.com:53320/mapamun_dengue', function(error){
    
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
   }
});

//Documentos
var municipioSchema = mongoose.Schema({
	
});

app.get('/', function(req, res){
	res.sendfile('./public/index_dengue.html');
});




///app.get('/sample/:id',routes.sample);

var municipio = mongoose.model('municipio', 
               new Schema({ }), 
               'municipio'); 


app.get('/Dengue_listar', function(req, res){
   console.log("recibo el municipio");
    
 console.log(req.query.anio); //recibir
   var anio=parseInt(req.query.anio);
    
 municipio.find({
    
    },{"coordenadas": 0}, function(error,resultadoMun){
      	if(error){
      		res.send('Error.');
      	}else{
        	res.send(resultadoMun);        	
      	}
   }).sort({ "nombre":1})
});
    /*
	municipio.find({
    "mun_historico.mun_anio": anio
    },{"mun_nombre":1,"mun_historico.mun_anio.$":1}, function(error,resultadoMun){
      	if(error){
      		res.send('Error.');
      	}else{
        	res.send(resultadoMun);        	
      	}
   }).sort({ "mun_nombre":1})
});
*/

   var rio = mongoose.model('rio', 
               new Schema({ }), 
               'rio'); 
app.get('/Dengue_listarRio', function(req, res){
 console.log("recibo el rio");
	rio.find({}, function(error,resultadoRio){
      	if(error){
      		res.send('Error.');
      	}else{
        	res.send(resultadoRio);        	
      	}
   })
});



/*
app.get('/recuperar', function(req, res){
	Cliente.findById(req.query._id, function(error, documento){
      	if(error){
         	res.send('Error.');
      	}else{
         	res.send(documento);
      	}
   });
});

app.post('/guardar', function(req, res){
	if(req.query._id == null){
		//Inserta
		var cliente = new Cliente({
		   nombre: req.query.nombre,
		   apellido: req.query.apellido,
		   domicilio: req.query.domicilio,
		   telefono: req.query.telefono,
		   email: req.query.email
		});
		cliente.save(function(error, documento){
			if(error){
			 	res.send('Error.');
			}else{
			 	res.send(documento);
			}
	   	});
	}else{
		//Modifica
		Cliente.findById(req.query._id, function(error, documento){
		  	if(error){
				res.send('Error.');
		  	}else{
				var cliente = documento;
				cliente.nombre = req.query.nombre,
			   	cliente.apellido = req.query.apellido,
			   	cliente.domicilio = req.query.domicilio,
			   	cliente.telefono = req.query.telefono,
			   	cliente.email = req.query.email
				cliente.save(function(error, documento){
			    	if(error){
			       		res.send('Error.');
			    	}else{ 
			       		res.send(documento);
			    	}
			 	});
			}
		});
	}
});

app.post('/eliminar', function(req, res){
	Cliente.remove({_id: req.query._id}, function(error){
		if(error){
			res.send('Error.');
		}else{
			res.send('Ok');
		}
   });
});
*/
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
