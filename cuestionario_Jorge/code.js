"use strict";


/*Comprobacion del codigo de antonio*/
//Capturo el localStorage si existe cuestionario y el div preguntas
// Capturo el localStorage si existe cuestionario y el div preguntas
let hay_cuestionario = localStorage.getItem("cuestionario");
const divPreguntas = document.querySelector("#divPreguntas");
let cuestionario;
let pregunta;


if (hay_cuestionario != null) {
  divPreguntas.innerHTML = " ";
  cuestionario = JSON.parse(hay_cuestionario);

  let arrPreguntas = cuestionario.preguntas;

   if(arrPreguntas.length > 0){

    cuestionario=new Cuestionario();
console.log("Este es el array de preguntas: "+arrPreguntas)
    arrPreguntas.forEach(pregunta => {

      let pregunta_Imprimir_HTML = new Pregunta(pregunta.id, pregunta.texto, pregunta.respuestaCorrecta,pregunta.respuestasIncorrecta1,pregunta.respuestasIncorrecta2,pregunta.respuestasIncorrecta3)
      
      if (pregunta_Imprimir_HTML instanceof Pregunta) {
        // console.log(pregunta_Imprimir_HTML.toHTMLUl);
        // let content=`<ul>`
        // content += `<li>Pregunta: ${pregunta_Imprimir_HTML.texto}</li>`;
        // content += `<li>Respuesta correcta: ${pregunta_Imprimir_HTML.respuestaCorrecta}</li>`;
        // content += `<li>Respuesta incorrecta 1: ${pregunta_Imprimir_HTML.respuestasIncorrecta1}</li>`;
        // content += `<li>Respuesta incorrecta 2: ${pregunta_Imprimir_HTML.respuestasIncorrecta2}</li>`;
        // content += `<li>Respuesta incorrecta 3: ${pregunta_Imprimir_HTML.respuestasIncorrecta3}</li>`;
        // content += `</ul><br>`;
        // divPreguntas.innerHTML += content;

        const ulElement = pregunta_Imprimir_HTML.toHTMLUl(); // Obtén el elemento ul
        divPreguntas.appendChild(ulElement); // Agrega la lista al div


      } else {
        console.error('El objeto pregunta no es una instancia de la clase Pregunta.');

      }

    });
   }else{
    cuestionario = new Cuestionario();
    divPreguntas.innerHTML = `<p>Todavía no hay preguntas creadas</p>`;
   }


  console.log("El cuestionario existe");
} else {
  cuestionario = new Cuestionario();

  localStorage.setItem("cuestionario", JSON.stringify(cuestionario));

  console.log("El cuestionario no existe");
}











































// console.log(cuestionario);

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

    function escapeSpecialCharacters(text) {
      specialCharacters.forEach((char) => {
        const regex = new RegExp(`\\${char}`, "g"); // Use a regular expression to find the special character
        text = text.replace(regex, `\\${char}`); // Replace it with a backslash and the character
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

      alert(textarea+ "está escapao");
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

// Aniadir la pregunta al cuestionario
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
@author Marrdo
@type {function}
@param {Array} array - El array del que se eliminarán los elementos.
@description Elimina todos los elementos de un array.
*/
function eliminarItemsArray(array){
  while (array.length > 0) {
    // Elimina el último elemento del array
    array.pop();
  }
}

/**
@type {HTMLButtonElement}
@author @marrdo
@description Representa el botón "Borrar todas las preguntas" en la interfaz.
Este botón se utiliza para eliminar todas las preguntas en la aplicación cuando se hace clic en él.
*/
let btnBorrarTodasLasPreguntas = document.querySelector("#borrar-preguntas");

btnBorrarTodasLasPreguntas.addEventListener("click",()=>{

  localStorage.clear();

  let divPreguntas = document.querySelector("#divPreguntas");

  divPreguntas.innerHTML = "Todavía no hay preguntas creadas.";

  eliminarItemsArray(cuestionario);

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
  localStorage.cuestionario=cuestionario_stringify;
});