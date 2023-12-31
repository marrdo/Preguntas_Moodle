"use strict";


/**
 * @description Obtiene un cuestionario almacenado en el almacenamiento local (localStorage) y realiza operaciones relacionadas con él.
 * - Recupera el cuestionario del almacenamiento local, si existe.
 * - Selecciona el elemento con el id "divPreguntas" del DOM.
 * - Declara las variables 'cuestionario' y 'pregunta' para su uso posterior.
 */

let hay_cuestionario = localStorage.getItem("cuestionario");
const divPreguntas = document.querySelector("#divPreguntas");
let divURL = document.querySelector('#urlFichero');
let cuestionario;
let pregunta;

/**
 * @description Verifica la existencia del objeto 'cuestionario' en el almacenamiento local (localStorage).
 * Si existe, se analiza y se extrae el array de preguntas. Si no existe, se instancia un nuevo 'Cuestionario' y se guarda en localStorage.
 */

if (hay_cuestionario != null) {
  divPreguntas.innerHTML = " ";
  cuestionario = JSON.parse(hay_cuestionario);

  let arrPreguntas = cuestionario.preguntas;

  /**
 * @description Procesa el array de preguntas (arrPreguntas) y las agrega al cuestionario.
 * Si el array contiene al menos una pregunta, crea una instancia de 'Cuestionario', recorre el array de preguntas y las agrega al cuestionario.
 * Si tanto la pregunta como el cuestionario son instancias válidas, se realiza la adición.
 * Si el array de preguntas está vacío, se inicializa un nuevo 'Cuestionario' y se muestra un mensaje en el elemento 'divPreguntas' en caso de que no haya preguntas creadas.
 */

    
   if(arrPreguntas.length > 0){

    cuestionario=new Cuestionario();

    
    arrPreguntas.forEach(pregunta => {

      let pregunta_Imprimir_HTML = new Pregunta(pregunta.id, pregunta.texto, pregunta.respuestaCorrecta,pregunta.respuestasIncorrecta1,pregunta.respuestasIncorrecta2,pregunta.respuestasIncorrecta3)
      
      if (pregunta_Imprimir_HTML instanceof Pregunta) {
        
        if (cuestionario instanceof Cuestionario) {

          console.log(pregunta_Imprimir_HTML.id);
          cuestionario.aniadirPregunta(pregunta_Imprimir_HTML);

        }else{
          console.log('no esta instanciado');
        }

      } else {
        console.error('El objeto pregunta no es una instancia de la clase Pregunta.');

      }

    });
   }else{
    cuestionario = new Cuestionario();
    divPreguntas.innerHTML = `<p>Todavía no hay preguntas creadas</p>`;
   }


  console.log("El cuestionario existe");
  console.log(cuestionario);

  cuestionario.preguntas.forEach((pregunta)=>{
    let id= pregunta.id;
    if(cuestionario instanceof Cuestionario){
      cuestionario.preguntaToHTMLDiv(id);
    }
  });
} else {
  cuestionario = new Cuestionario();

  localStorage.setItem("cuestionario", JSON.stringify(cuestionario));

  console.log("El cuestionario no existe");
}



let id = 0;
//Guardamos los botones y hacemos que validen

let btnCreate = document
  .getElementById("crear-pregunta")
  .addEventListener("click", validateForm);

const specialCharacters = ["~", "#", "=", "}", "{", ":"];



//Función para validar y luego generar preguntas (está en Alpha)
function validateForm() {
  let textarea = document.querySelector("#txtPregunta").value;
  let correctAnswer = document.querySelector("#correctAnswer").value;
  let firstAnswer = document.querySelector("#firstAnswer").value;
  let secondAnswer = document.querySelector("#secondAnswer").value;
  let thirdAnswer = document.querySelector("#thirdAnswer").value;
  let divErrores = document.getElementById("divErrores");


  if (
    textarea == "" ||
    correctAnswer == "" ||
    firstAnswer == "" ||
    secondAnswer == "" ||
    thirdAnswer == ""
  ) {
    divErrores.innerHTML = `<h2>ERRORES:</h2>
     Por favor, rellene todos los campos.`;
  } else {
    //ESCAPAR TEXTO
    divErrores.innerHTML = "";
    divURL.innerHTML = "";
    function escapeSpecialCharacters(text) {
      specialCharacters.forEach((char) => {
        const regex = new RegExp(`\\${char}`, "g"); 
        text = text.replace(regex, `\\${char}`); 
      });

      return text;
    }


    if (
      specialCharacters.some((char) => textarea.includes(char)) ||
      specialCharacters.some((char) => firstAnswer.includes(char)) ||
      specialCharacters.some((char) => secondAnswer.includes(char)) ||
      specialCharacters.some((char) => thirdAnswer.includes(char)) ||
      specialCharacters.some((char) => correctAnswer.includes(char))
    ) {
      //HAY CARACTERES ESPECIALES
      textarea = escapeSpecialCharacters(textarea);
      firstAnswer = escapeSpecialCharacters(firstAnswer);
      secondAnswer = escapeSpecialCharacters(secondAnswer);
      thirdAnswer = escapeSpecialCharacters(thirdAnswer);
      correctAnswer = escapeSpecialCharacters(correctAnswer);

      
    }
 
   // Crear una nueva instancia de Pregunta
const nuevaPregunta = new Pregunta(
  id,
  textarea,
  correctAnswer,
  firstAnswer,
  secondAnswer,
  thirdAnswer
);

// Añadir la pregunta al cuestionario
cuestionario.aniadirPregunta(nuevaPregunta);

// Incrementar el ID para la próxima pregunta
id++;

// Llamar a la función para mostrar la pregunta en el div
function mostrarTodasLasPreguntas() {
  const divPreguntas = document.getElementById("divPreguntas");
  divPreguntas.innerHTML = ""; // Limpiar divpreguntas

  for (let i = 0; i < cuestionario.preguntas.length; i++) {
    const preguntaDiv = cuestionario.preguntaToHTMLDiv(i);
    if (preguntaDiv) {
      // Agregar la pregunta al divPreguntas
      divPreguntas.appendChild(preguntaDiv); 
    }
  }
}

// Llamar a la función para mostrar todas las preguntas en el div después de agregar una pregunta
cuestionario.preguntaToHTMLDiv(id);
mostrarTodasLasPreguntas();

 console.log(textarea, correctAnswer, firstAnswer, secondAnswer, thirdAnswer);
 console.log(cuestionario);
 console.log(id);

  }

  return false;
}



////////////
//Function
///////////


/**
 

@type {function}
@param {Array} array - El array del que se eliminarán los elementos.
@description Elimina todos los elementos de un array.
*/
function eliminarItemsArray(array){
 
  array.preguntas=[];
  return array;
}

/**
 
@type {HTMLButtonElement}
@author @marrdo
@description Representa el botón "Borrar todas las preguntas" en la interfaz.
Este botón se utiliza para eliminar todas las preguntas en la aplicación cuando se hace clic en él.
*/
let btnBorrarTodasLasPreguntas = document.querySelector("#borrar-preguntas");

btnBorrarTodasLasPreguntas.addEventListener("click",()=>{
  divURL.innerHTML = "";
  localStorage.clear();

  let divPreguntas = document.querySelector("#divPreguntas");

  divPreguntas.innerHTML = "Todavía no hay preguntas creadas.";

  cuestionario=eliminarItemsArray(cuestionario);

  id=0; 

});


////////////
//MAIN
//////////////
/*
  *Rescatamos el boton guardar preguntas. 
*/
let guarda_preguntas = document.querySelector("#guardar-preguntas");


/////////////////
//FUNCTIONS
///////////////
/**
 
@author @marrdo
@type {function}
@param {Array} array - Array que se almacenara en el localStorage.
@description Guarda todos los elementos de un array en el localStorage.
*/

guarda_preguntas.addEventListener("click",()=>{
  let cuestionario_stringify = JSON.stringify(cuestionario);
  divURL.innerHTML = "";
  localStorage.cuestionario=cuestionario_stringify;
});

///////////////////////////////
// GENERAR ARCHIVO
//////////////////////////////

// relaciono el btn con el id 
let btnGenerarArchivo=document.querySelector("#generar-archivo");

// Realizo evento y funcion anonima
btnGenerarArchivo.addEventListener("click",()=>{
  // Array para guardar lo que voy a pintar en el archivo final de cada pregunta
  let arrayContenido=[];

  // Recorro las preguntas
  for (let pregunta of cuestionario.preguntas) {
    // Cojo los ul de cada pregunta
    const ulElement = pregunta.toHTMLUl();
    // voy a coger cada li
    const liElements = ulElement.querySelectorAll('li');

    // Aqui voy a meter la informacion que quiero recoger de cada pregunta
    let modificado = '';

    // Recorro los li con un foreach 
    liElements.forEach((li, index) => {
      let contenido = li.textContent;

      // Reemplazo algunas cosas por nada
      contenido = contenido.replace("Pregunta: ", "").replace("Respuesta Correcta: ", "");

      // En el caso de que sea la primera fila
      if (index === 0) {
        modificado += contenido + '\n{\n=...';
      } else {
        if (index === 1) {
          // Aqui voy a concatenar el contenido al primer =... que nos encontremos en el contenido
          modificado +=contenido+contenido.substring(contenido.indexOf("=...") + 4);
        } else {
          modificado += '\n~%25%' + contenido;
        }
      }
    });

    modificado += '\n}\n';
    // Lo introduzco al array
    arrayContenido.push(modificado);

  }

  let idPreguntas=cuestionario.preguntas.length;

  let fichero = new File(arrayContenido, { type: "text/plain; charset=UTF-8" })
  var url = window.URL.createObjectURL(fichero);
 
  divURL.innerHTML = '<a download="preguntas.txt" href="' + url + '">Descargar fichero (' + idPreguntas + ')</a>';

});

/**
* @author @marrdo
* @description Cambia entre modos claro y oscuro al hacer clic en el elemento con el id "mode".
* Este fragmento de código permite al usuario activar o desactivar el modo oscuro en la página web.
*/

let mode = document.querySelector("#mode");
let body = document.querySelector("body");
mode.addEventListener("click",()=>{
  body.classList.toggle("dark");
});