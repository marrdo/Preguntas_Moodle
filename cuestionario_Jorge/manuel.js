"use strict";

/*Comprobacion del codigo de antonio*/
//Capturo el localStorage si existe cuestionario y el div preguntas
// Capturo el localStorage si existe cuestionario y el div preguntas
let hay_cuestionario = localStorage.getItem("cuestionario");
const divPreguntas = document.querySelector("#divPreguntas");

if (hay_cuestionario != null) {
  let cuestionario = JSON.parse(hay_cuestionario);

  let arrPreguntas = cuestionario.preguntas;
   if(arrPreguntas.length > 0){
    arrPreguntas.array.forEach(pregunta => {
        divPreguntas.innerHTML += pregunta;
    });
   }
    


  console.log("El cuestionario existe");
} else {
  const cuestionario = new Cuestionario();

  localStorage.setItem("cuestionario", JSON.stringify(cuestionario));

  console.log("El cuestionario no existe");
}





//ANTONIO
// HECHO POR MI
// Para comprobar si hay un objeto tipo cuestionario guardado en localStorage
// if(localStorage.getItem("cuestionario")){
//   alert("hay cuestionario");
//   // Si el objeto cuestionario existe en el localStorage
//   const objetoCuestionario =JSON.parse(localStorage.getItem("cuestionario"));
//   console.log("El cuestionario está ahí");
//   // Para mostrar las preguntas
//   let divPreguntas=document.getElementById("divPreguntas");

//   divPreguntas.innerHTML="";

//   // Recorro las preguntas del cuestionario
//   if (objetoCuestionario && objetoCuestionario.preguntas) {
//     console.log("El cuestionario está ahí1");
//     for (let pregunta of objetoCuestionario.preguntas) {
//         divPreguntas.appendChild(pregunta.preguntaToHTMLDiv());
//         console.log("El cuestionario está ahí2");
//     }
// } else{
//   alert("no hay cuestionario");
//   console.log("No se ha encontrado ningún objeto de tipo Cuestionario en localStorage");
//   const cuestionario = new Cuestionario();

//   localStorage.setItem("cuestionario",JSON.stringify({
//       tipo:"cuestionario"
//   }));

// }}