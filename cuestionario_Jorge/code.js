"use strict";

const cuestionario = new Cuestionario();

// HECHO POR MI
// Para comprobar si hay un objeto tipo cuestionario guardado en localStorage
if(localStorage.getItem("cuestionario")){
  // Si el objeto cuestionario existe en el localStorage
  const objetoCuestionario =JSON.parse(localStorage.getItem("cuestionario"));
  console.log("El cuestionario está ahí0");
  // Para mostrar las preguntas
  let divPreguntas=document.getElementById("divPreguntas");

  divPreguntas.innerHTML="";

  // Recorro las preguntas del cuestionario
  if (objetoCuestionario && objetoCuestionario.preguntas) {
    console.log("El cuestionario está ahí1");
    for (let pregunta of objetoCuestionario.preguntas) {
        divPreguntas.appendChild(pregunta.preguntaToHTMLDiv());
        console.log("El cuestionario está ahí2");
    }
} else{

  console.log("No se ha encontrado ningún objeto de tipo Cuestionario en localStorage");
  const cuestionario = new Cuestionario();

  localStorage.setItem("cuestionario",JSON.stringify({
      tipo:"cuestionario"
  }));

}}




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

// Añadir la pregunta al cuestionario
cuestionario.añadirPregunta(nuevaPregunta);

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


/*
 
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

/*
 
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
 
@author @marrdoarrdo
@type {function}
@param {Array} array - Array que se almacenara en el localStorage.
@description Guarda todos los elementos de un array en el localStorage.
*/

guarda_preguntas.addEventListener("click",()=>{
  let cuestionario_stringify = JSON.stringify(cuestionario);
  localStorage.cuestionario=cuestionario_stringify;
});