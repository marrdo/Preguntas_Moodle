"use strict";

//Guardamos los botones y hacemos que validen

let btnCreate = document
  .getElementById("crear-pregunta")
  .addEventListener("click", validateForm);

const specialCharacters = ["~", "#", "=", "}", "{", ":"];

const cuestionario = new Cuestionario();

//Función para validar y luego generar preguntas (está en Alpha)
function validateForm() {
  let textarea = document.querySelector("#txtPregunta").value;
  let correctAnswer = document.querySelector("#correctAnswer").value;
  let firstAnswer = document.querySelector("#firstAnswer").value;
  let secondAnswer = document.querySelector("#secondAnswer").value;
  let thirdAnswer = document.querySelector("#thirdAnswer").value;
  let divErrores = document.getElementById("divErrores");
  let id = 0;

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

    // const arrSpecial = ['~','#','=','}','{',':'];

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
      // let newQuestion = new Pregunta(id,textarea,correctAnswer,firstAnswer,secondAnswer,thirdAnswer);
      // id++;
      //  let cuestionario = new Cuestionario;
      //  cuestionario.añadirPregunta(newQuestion);
      //  console.table(cuestionario);      //xD por soñar que no quede

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

      document.getElementById('divPreguntas').innerHTML = "HOLA";

      const preguntaDiv = cuestionario.preguntaToHTMLDiv(id);
        
   
      // Obtener la representación HTML de la pregunta
      if (preguntaDiv) {
        document.getElementById('divPreguntas').appendChild(preguntaDiv);
      }
      console.log(textarea, correctAnswer, firstAnswer, secondAnswer, thirdAnswer);
      console.log(cuestionario);
      console.log(id);

    
  }

  return false;
}