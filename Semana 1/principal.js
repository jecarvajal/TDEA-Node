const fs = require('fs')
let courses = [
    {
        id      : '1',
        nombre  : 'Node Js',
        duracion: '2 Meses',
        valor   : '350000'
    },
    
    {
        id      : '2',
        nombre  : 'Fundamentos PHP',
        duracion: '1 Meses',
        valor   : '250000'
    },
    
    {
        id      : '3',
        nombre  : 'Java',
        duracion: '3 Meses',
        valor   : '400000'
    }
];

const opciones = {
    id:{
        demand : true
    },
    nombre:{
        demand : true
    },
    cedula:{
        demand : true
    }
}
const argv = require('yargs').command('inscribir','Inscripcion de curso',opciones).argv

let crearArchivo = (nombre,texto)=>{
    fs.writeFile(nombre,texto,(err)=>{
        if (err) throe (err);
        console.log("El archivo se ha creado correctamente");
    })
}

if(process.argv[2] === "inscribir"){
    let nombre = "Inscripcion.txt";
    
    let variable = courses.find(function(courses){
        return courses.id == argv.id;
    });

    let texto = "El curso seleccionado no ha sido encontrado , por favor verifique el ID"
    if (typeof variable !== 'undefined' ){
         texto  = "El estudiante: " + argv.nombre + " con cedula: " + argv.cedula + "\n" +
                     "se ha inscrito a el curso con ID: " + argv.id + " nombrado: " + variable.nombre + "\n" +
                     "duracion de: " + variable.duracion + " y valor de: " + variable.valor
                      ;
    }else{
        console.log(texto);
    }
    crearArchivo(nombre,texto);
}else if(typeof process.argv[2] === 'undefined' ){
    showCourses(function(id,courseName,duracion,valor){
        console.log("Identificado de curso: " + id + " Nombre: " + courseName + " Duracion: " + duracion + " Valor: " + valor);
    });
}

function showCourses(callback){
    for(var i=0 ;  i< courses.length ; i++){
        let courseName = courses[i].nombre;
        let id =  courses[i].id;
        let valor = courses[i].valor;
        let duracion = courses[i].duracion;
        setTimeout( function(){
            callback(id,courseName,duracion,valor);
        },(i+1)*2000);
    }
}



module.exports = {
    courses
};