var aplicacion = angular.module('aplicacion', []);
aplicacion.controller('Municipios', function($scope, $http) {
    var map, geocoder;

    // Instancia del geocodificador

    geocoder = new google.maps.Geocoder();


    // Propiedades iniciales del mapa



    var options = {
        zoom: 5,
        //minZoom: 5,
        minZoom: 5,
       // center: new google.maps.LatLng(4, -72),
        center: new google.maps.LatLng(5.1573603, -74.982409),
        mapTypeId: google.maps.MapTypeId.ROADMAP
     };



    // Instancia del mapa

    map = new google.maps.Map(document.getElementById('map'), options);

    /*$scope._id = null;
    $scope.municipio = '';
    $scope.chikungunya = ''
    $scope.dengue = '';
    $scope.coordenadas.latitud = '';
    $scope.coordenadas.longitud = '';*/
    $scope.datosMunicipio = [];
    $scope.cargarMunicipio = function(){
        $http({
            method: 'GET', url: '/listar'
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.datosMunicipio = data;
             
                function d2h(d) { return (+d).toString(16); }
	
                
                	
                    var coordenadas_Mun= new Array();
                    var coordenadas_Mun_aux= new Array();




                   
     
                   $('.ocultar').hide();  //oculta elementos del menu
                
                
                    var vector_lat= new Array(); //vector que almacena la latitud
                    var vector_long= new Array(); //vector que almacena la longitud

                
                        ////los vectores almacenaran el conjunto de las coordenadas, quedaran almacenando todo un vector, vector_lat y vector_long en cada posicion tienen un vector completo con las coordenadas de latitud y longitud respectivmanete

                    for (var i in  $scope.datosMunicipio){
                          vector_lat.push($scope.datosMunicipio[i].mun_coordenadas.mun_latitud);
                          vector_long.push($scope.datosMunicipio[i].mun_coordenadas.mun_longitud);

                    }
	
 
	
                
                
                                     //la i representa la posicion donde esta el vector de coordenadas y el a la posicion de alguna coordenada
                     for (var i  in   vector_lat){
                           for (var a  in  vector_lat[i]){
                                coordenadas_Mun.push(new google.maps.LatLng(vector_lat[i][a],vector_long[i][a]));
                            }
                         coordenadas_Mun_aux[i]= coordenadas_Mun;
                         coordenadas_Mun=new Array();

                    }              
                    var alturaBarra=0;
                    var municipios= new Array();
                    var aux_mun=new Array();
                    var rios=new Array();
                    var array_chikungunya= new Array();
                    var infowindow = new google.maps.InfoWindow({  
                        content: ''
                    });           
                
                    for(var i in  $scope.datosMunicipio){
                        var contenido = "<center><h2>Municipio: "+$scope.datosMunicipio[i].mun_nombre+"</h2></center><center>Casos registrados: "+$scope.datosMunicipio[i].mun_chikungunya+"</center>";
                        var  indice=i;


                        array_chikungunya.push($scope.datosMunicipio[i].mun_chikungunya);
                        var municipios_opciones= ({
                        path: coordenadas_Mun_aux[i],
                        strokeColor: 'black',
                        strokeOpacity: 0.3,

                        strokeWeight: 1,
                        fillColor: "#FF00FF",
                        fillOpacity: 0.9,
                        zIndex: 1,
                        //contenido:  "<center><h2>Municipio: "+$scope.datosMunicipio[i].mun_nombre+"</h2></center><center>Casos registrados: "+$scope.datosMunicipio[i].mun_chikungunya+"</center>",
                        nombre: $scope.datosMunicipio[i].mun_nombre,
                        valorChicungunya: $scope.datosMunicipio[i].mun_chikungunya 
                        //map:map

                    });

                    municipios[i]=new google.maps.Polygon(municipios_opciones);
                    aux_mun[i]=municipios[i];

                    (function(aux_mun, contenido, indice) {
                      google.maps.event.addListener((aux_mun[i]), 'click', function(evt) {
                      infowindow.setContent(contenido);
                      infowindow.open(map, aux_mun[i]);
                      infowindow.setPosition(evt.latLng);


                        for(var a in aux_mun){
                            if(aux_mun[a]==null){
                                continue;
                            }
                             aux_mun[a].setMap(null)
                                     aux_mun[a].strokeOpacity= 0.3;

                            aux_mun[a].strokeWeight= 1;
                            aux_mun[a].setMap(map)
                        }
                        aux_mun[indice].setMap(null)
                        aux_mun[indice].strokeWeight= 2;
                        aux_mun[indice].strokeOpacity= 1;
                        aux_mun[indice].setMap(map)

                    });



                  })(aux_mun, contenido, indice);
                   google.maps.event.addListener(map, 'click', function() {
                      infowindow.close();
                      for(var a in aux_mun){
                            if(aux_mun[a]==null){
                                continue;
                            }
                        aux_mun[a].setMap(null)
                        aux_mun[a].strokeWeight= 1;
                        aux_mun[a].strokeOpacity= 0.3;
                        aux_mun[a].setMap(map)
                        }

                   });



                }   
        

                for (var i  in municipios) {
                    $('#mun').append("<center>"+"<label for="+"'"+"c"+i+"'"+">"+"<input type='checkbox'  id="+"'"+"c"+i+"'"+" value="+i+"  class='mun_checkbox' />  "+municipios[i].nombre+ "</label></center>");
                }
               for (i in array_chikungunya){
                   array_chikungunya[i]=null;
                   aux_mun[i]=null;
               }
       
               function pintarMun(){
           
                           //se calcula el menor de  esta manera,  ya que si es null será cero, este comportamiento no sucede con el max
                           var  min=array_chikungunya[0]==null?Infinity:array_chikungunya[0];

                           for(var n in array_chikungunya){
                                    if(array_chikungunya[n]==null){
                                       continue;
                                    }
                                if (array_chikungunya[n]<min){
                                    min = array_chikungunya[n];
                                }
                            }

                           var max = Math.max.apply(null, array_chikungunya); 
                           var nulos=0; 
                           for(var i in aux_mun){
                                if ((aux_mun[i])==null){
                                    nulos++;
                                 }
                            }

                           if(nulos!=aux_mun.length){  // si todos los elementos son nulos no habrá que pintar, por eso si hay alguno marcado sigue por este medio
                               if(nulos==0){
                                       document.getElementById('marcarTodo').checked=true;
                                }

                               $('.ocultar').show('fade'); 

                               var tabla="<table id='example' border='1' style='float: left;'> <thead><tr><th  style='text-align:center;' >Municipio</th><th style='text-align:center;'>Casos             Registrados</th>                           <th style='text-align:center;'>Riesgo</th></tr> </thead>";

                               for (var i in  aux_mun){
                                    if((aux_mun[i])==null){
                                        continue;
                                    }


                                       var denominador=parseInt(max)-parseInt(min);

                                       if(denominador==0){
                                        aux_mun[i].fillColor="#FF"+"00"+"00";
                                              aux_mun[i].setMap(map);

                                       }
                                       else{
                                        // var numerador=it[i].valorChicungunya-min; amarillo primero
                                        //var colorhex=parseInt((((numerador)/(denominador)))*255);


                                        var numerador=max-aux_mun[i].valorChicungunya;

                                        var colorhex=parseInt((((numerador)/(denominador)))*255);
                                        colorhex=(d2h(colorhex));
                                        colorhex="#FF"+(colorhex.length==1?"0"+colorhex:colorhex)+"00";
                                        colorhex=colorhex.toUpperCase();


                                        aux_mun[i].fillColor=colorhex;

                                       }	

                                        aux_mun[i].setMap(null);                  
                                        aux_mun[i].setMap(map);

                                    /*	municipios[i].setMap(map);

                                            if($("#municipios").is(':checked')) {  
                                            municipios[i].setMap(map);
                                        } else {  
                                             municipios[i].setMap(null);

                                        }  */
                                        tabla+=	 "<tr><td align='center' style='height:1px;' bgcolor='white'>"+aux_mun[i].nombre+"</td><td align='center' bgcolor='white'>"+aux_mun[i].valorChicungunya+"</td><td align='center' bgcolor="+"'"+aux_mun[i].fillColor+"'"+">"+"</td></tr>";  


                                                /*$("#municipios").click(function() {
                                                        for (var i in municipios){
                                                            if($("#municipios").is(':checked')) {  
                                                                municipios[i].setMap(map);
                                                            } else {  
                                                                municipios[i].setMap(null);
                                                            }  
                                                        }
                                                    });  		
                                                */	

                                     } //for de pintado de municipios
                                    tabla+="</table>";


                           }//cierre del nulos
                       else{
                                 $('.ocultar').hide({ effect: "fade"}); 
                                 document.getElementById('tablas').innerHTML ='';
                                 document.getElementById('marcarTodo').checked=false;

                            }



                       var alturaBarra=0;
                       var tabla2="";

                       google.maps.event.addListener(map, 'click', function() {
                          infowindow.close();
                        });


                                    /*for (var i=0; i<=255; i++){
                                        var colorhex=i;
                                        colorhex=(d2h(colorhex));
                                        colorhex="#FF"+(colorhex.length==1?"0"+colorhex:colorhex)+"00";
                                    //	alert(colorhex);
                                        tabla2+="<tr><td width='25'  align='center' bgcolor="+"'"+colorhex+"'"+"> </td></tr>";  

                                    }*/

                    tabla2+="<tr><td class='degradado'> </td></tr>";  
                    tabla2+="</table>";

                    for (var i in aux_mun){
                         if((aux_mun[i])==null){
                              continue;
                        }
                    alturaBarra+=23;
                    document.getElementById('tablas').innerHTML = "<br>"+tabla+"<table style='position: absolute;  height: "+ (alturaBarra)+"px; top:54px; left: 336px;' align='center'>"+tabla2+"<img style='position: absolute; left: 352px; top: 49px;' src='img/indicador.png'></img>"+"<div style='position: absolute; left: 376px; top: 53px;'>"+(max.length==1?"  "+max:max)+"</div>"+"<img style='position: absolute; left: 352px; top:"+(alturaBarra+25)+"px;' src='img/indicador.png'></img>"+"<div style='position: absolute; left: 376px; top: "+(alturaBarra+30)+"px;'>"+(min.length==1?"  "+min:min)+"</div>";

                    }
           
           
               }//fin funcion
                       
                
                
                
               $("#cargar").click(function() {

        //})
                    $("#marcarTodo").change(function() {
                                if($(".marcarTodo").is(':checked')){               
                                        $("input[class='mun_checkbox']").prop('checked', true);        
                                        //$("input[type=checkbox]").prop('checked', true); 


                                     for(var i in aux_mun){
                                        aux_mun[i]=municipios[i];
                                        array_chikungunya[i]=municipios[i].valorChicungunya;
                                     }
                                }
                                else{               
                                        $("input[class='mun_checkbox']").prop('checked', false);        
                                        //$("input[type=checkbox]").prop('checked', true); 
                                                            //     $("#mostrarTabla").hide();


                                         for(var i in aux_mun){
                                             if(aux_mun[i]==null){
                                                continue;
                                             }
                                             aux_mun[i].setMap(null);
                                             document.getElementById('tablas').innerHTML ='';
                                         }    

                                         for(var i in aux_mun){
                                            aux_mun[i]=null;
                                            array_chikungunya[i]=null;
                                         }
                                }
                                pintarMun();
                             });



                           $(".mun_checkbox").click(function() {
                               var tabla="";
                               var alturaBarra=0;

                               var indice=$(this).val();




                                          //console.log("indice"+indice);

                                      /*$("input[type=checkbox]").prop('checked', false);        
                                           */

                                        /*$("input[type=checkbox]:checked").each(function(){
                                    //cada elemento seleccionado
                                    alert($(this).val());
                                });   /*
                                */

                                         /*  if(($('input:checkbox:checked').size())==0){
                                              for (i in aux_mun){
                                               aux_mun[i]=null;
                                                console.log(aux_mun);
                                              }
                                           }
                                           else{*/
                          if($("#c"+indice).is(':checked')){

                                     aux_mun[indice]=municipios[indice];
                                     array_chikungunya[indice]=municipios[indice].valorChicungunya;
                                     aux_mun[indice].setMap(map);

                                }
                               else{

                                            if(aux_mun[indice]!=null){
                                                 aux_mun[indice].setMap(null);
                                                 array_chikungunya[indice]=null;
                                                 aux_mun[indice]=null;
                                            }



                               }

                              pintarMun();



                        }); //cierre de change
                   
                  $( "#cargar_datos" ).dialog({
                                        show: { effect: "blind", duration: 400 } ,
                                        height: 'auto',
                                        //width: 420,
                                        width: 500,
                                        position: ["right",100],	
                                        hide: { effect: "blind", duration: 400 } /*,
                                        buttons: {
                    'Aceptar': function() {

                    }
                           */
                    })

                                     //$( "#txtFileUpload" ).button()
                    $( "#cargar_datos").data('dialog').uiDialog.draggable('option', {
                        cancel: '.ui-dialog-titlebar-close',
                        handle: '.ui-dialog-titlebar, .ui-dialog-content'
                    }); 
                   $( "#tabs" ).tabs();
                   
            
                  /* $(document).on('click','.mun_checkbo',function(){
                        $('#example').dataTable();

                   })
                  */
                });//fina del  click cargar
    
    
                
     
											
                $(function() {

                $("#mostrarTabla").click(function() {
                    $( "#tablas" ).dialog({
                        show: { effect: "blind", duration: 400 } ,
                        height: 'auto',
                        width: 420,
                        position: ["right",100],	
                        hide: { effect: "blind", duration: 400 } 


                });
                 //$( "#txtFileUpload" ).button()
                $( "#tablas" ).data('dialog').uiDialog.draggable('option', {
                    cancel: '.ui-dialog-titlebar-close',
                    handle: '.ui-dialog-titlebar, .ui-dialog-content'
                });
						
						
						
                            
                        
				});
                
                });
          
                
                
                
            
            } else{
                alert('Error al intentar recuperar los municipios.');
            }
        }).
        error(function() {
            alert('Error al intentar recuperar los municipios.');
        });
    };// Fin de metodo para manejo de municipios
    
    
    
    
    //Inicio metodo de rios
    $scope.datosRio = [];
   
    $http({
            method: 'GET', url: '/listarRio'
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.datosRio = data;
                
                
                   var coordenadas_Rio= new Array();
                   var coordenadas_Rio_aux= new Array();
                
                
                    var vectorRio_lat= new Array(); //vector que almacena la latitud
                    var vectorRio_long= new Array(); //vector que almacena la longitud

                
                        ////los vectores almacenaran el conjunto de las coordenadas, quedaran almacenando todo un vector, vector_lat y vector_long en cada posicion tienen un vector completo con las coordenadas de latitud y longitud respectivmanete

                    for (var i in  $scope.datosRio){
                          vectorRio_lat.push($scope.datosRio[i].rio_coordenadas.rio_latitud);
                          vectorRio_long.push($scope.datosRio[i].rio_coordenadas.rio_longitud);

                    }
	
 
	
                
                
                                     //la i representa la posicion donde esta el vector de coordenadas y el a la posicion de alguna coordenada
                     for (var i  in   vectorRio_lat){
                           for (var a  in  vectorRio_lat[i]){
                                coordenadas_Rio.push(new google.maps.LatLng(vectorRio_lat[i][a],vectorRio_long[i][a]));
                            }
                         coordenadas_Rio_aux[i]= coordenadas_Rio;
  
                         coordenadas_Rio=new Array();
                    }              
                    
                    var rios=new Array();
                   
                    var infowindow = new google.maps.InfoWindow({  
                        content: ''
                    });           
                
                    for(var i in  $scope.datosRio){
                        var contenido = "<center><h2>"+$scope.datosRio[i].rio_nombre+"</h2></center>";
                        var  indice=i;


                        var rio_opciones= ({
                        path: coordenadas_Rio_aux[i],
                        strokeColor: 'blue',
                        strokeOpacity: 0.3,

                        strokeWeight: 1,
                        fillColor: "#0000FF",
                        fillOpacity: 0.9,
                        zIndex: 2,
                        nombre: $scope.datosRio[i].rio_nombre
                        
                      //  map:map

                    });

                    rios[i]=new google.maps.Polygon(rio_opciones);
                    //aux_rio[i]=rios[i];

                    (function(rios, contenido, indice) {
                      google.maps.event.addListener((rios[i]), 'click', function(evt) {
                      infowindow.setContent(contenido);
                      infowindow.open(map, rios[i]);
                      infowindow.setPosition(evt.latLng);


                        for(var a in rios){
                            if(rios[a]==null){
                                continue;
                            }
                            rios[a].setMap(null)
                                     rios[a].strokeOpacity= 0.3;

                            rios[a].strokeWeight= 1;
                            rios[a].setMap(map)
                        }
                       rios[indice].setMap(null)
                        rios[indice].strokeWeight= 2;
                       rios[indice].strokeOpacity= 1;
                        rios[indice].setMap(map)

                    });



                  })(rios, contenido, indice);
                   google.maps.event.addListener(map, 'click', function() {
                      infowindow.close();
                    /*  for(var a in rios){
                            if(rios[a]==null){
                                continue;
                            }
                      rios[a].setMap(null)
                        rios[a].strokeWeight= 1;
                        rios[a].strokeOpacity= 0.3;
                        rios[a].setMap(map)
                        }
*/
                   });



                }   //fin ciclo generar coordenadas
                
                $("#marcarRios").click(function() {
                    for (var i in rios){
                        if($("#marcarRios").is(':checked')) {  
                            rios[i].setMap(map);
                        } else {  
                            rios[i].setMap(null);
                        }  
                    }
                });  
                
              
            }//data
        });//fin del success de rios
    
});