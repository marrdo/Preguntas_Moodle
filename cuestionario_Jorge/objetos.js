"use strict";

/**
 * @class
 * Clase que representa un cuestionario de preguntas y sus operaciones relacionadas.
 *
 * Esta clase permite la creación, gestión y visualización de un cuestionario de preguntas.
 */

class Cuestionario {
  constructor() {
    /**
     * @type {Array<Pregunta>}
     * Almacena las preguntas del cuestionario.
     */
    this.preguntas = [];
  }

  /**
   *  @method
   *
   * @description Añade una pregunta al cuestionario.
   *
   * @param {Pregunta} pregunta - La pregunta a añadir al cuestionario.
   */
  aniadirPregunta(pregunta) {
    this.preguntas.push(pregunta);
  }

  /**
   *  @method
   *
   * @description Descarta una pregunta del cuestionario por su identificador (id).
   *
   * @param {number} id - El identificador de la pregunta a descartar.
   */
  descartarPregunta(id) {
    this.preguntas = this.preguntas.filter((pregunta) => pregunta.id !== id);
  }

  /**
   *  @method
   *
   * @description Obtiene una pregunta del cuestionario por su identificador (id).
   *
   * @param {number} id - El identificador de la pregunta a recuperar.
   * @returns {Pregunta|null} - La pregunta recuperada o null si no se encontró.
   */
  getPregunta(id) {
    return this.preguntas.find((pregunta) => pregunta.id === id);
  }

  /**
   *  @method
   *
   * @description Muestra una pregunta del cuestionario en formato HTML en el elemento con id "divPreguntas".
   *
   * @param {number} id - El identificador de la pregunta a mostrar.
   */

  preguntaToHTMLDiv(id) {
    const pregunta = this.getPregunta(id);
    if (pregunta) {
      const preguntaHTML = pregunta.toHTMLUl(); // Usar toHTMLUl para lista
      const divPreguntas = document.getElementById("divPreguntas"); // Obtener el divPreguntas existente

      // Crear un div para envolver la pregunta
      const divWrapper = document.createElement("div");
      divWrapper.id = `question_${id}`;
      divWrapper.appendChild(preguntaHTML); // Agregar la pregunta al divWrapper

      // Botón "Recuperar Pregunta"
      const botonRecuperar = document.createElement("button");
      botonRecuperar.innerHTML = "Recuperar Pregunta";
      botonRecuperar.name = "retrieve"; // Establece el name del botón como "retrieve"
      botonRecuperar.id = `retrieve_${id}`; // Establece el id del botón como "retrieve_id"
      divWrapper.appendChild(botonRecuperar);

      botonRecuperar.addEventListener("click", () => {
        function desescaparTexto(texto) {
          specialCharacters.forEach((char) => {
            const regex = new RegExp(`\\\\${char}`, "g"); // Encuentra el carácter especial escapado
            texto = texto.replace(regex, char); // Reemplaza con el carácter original
          });

          return texto;
        }

        // Obtener la pregunta del cuestionario
        this.preguntaRecuperada = this.getPregunta(id);

        // Comprobar si se encontró la pregunta
        if (this.preguntaRecuperada) {
          // Desescapar el texto de la pregunta recuperada
          const textoDesescapado = desescaparTexto(
            this.preguntaRecuperada.texto
          );

          // Llenar el textarea y los textboxes correspondientes con los valores recuperados
          document.querySelector("#txtPregunta").value = textoDesescapado;
          document.querySelector("#correctAnswer").value =
            this.preguntaRecuperada.respuestaCorrecta;
          document.querySelector("#firstAnswer").value =
            this.preguntaRecuperada.respuestasIncorrecta1;
          document.querySelector("#secondAnswer").value =
            this.preguntaRecuperada.respuestasIncorrecta2;
          document.querySelector("#thirdAnswer").value =
            this.preguntaRecuperada.respuestasIncorrecta3;
        }
      });

      // Botón "Descartar Pregunta"
      const botonDescartar = document.createElement("button");
      botonDescartar.innerHTML = "Descartar Pregunta";
      botonDescartar.name = "discard"; // Establece el name del botón como "discard"
      botonDescartar.id = `discard_${id}`; // Establece el id del botón como "discard_id"
      divWrapper.appendChild(botonDescartar);

      botonDescartar.addEventListener("click", () => {
        this.descartarPregunta(id); // Elimina la pregunta del objeto Cuestionario
        divWrapper.remove(); // Elimina el div de la pregunta

        // Verificar si no quedan más preguntas
        if (this.preguntas.length === 0) {
          divPreguntas.innerHTML += "Todavía no hay preguntas creadas";
        }
      });
      divPreguntas.appendChild(divWrapper); // Agregar el divWrapper a divPreguntas
    }
  }
}


/**
 * Clase que representa una pregunta en un cuestionario.
 * @class
 */

class Pregunta {
      /**
   * @constructor
   * @param {number} id - El identificador único de la pregunta.
   * @param {string} texto - El texto de la pregunta.
   * @param {string} respuestaCorrecta - La respuesta correcta a la pregunta.
   * @param {string} respuestasIncorrecta1 - La primera respuesta incorrecta.
   * @param {string} respuestasIncorrecta2 - La segunda respuesta incorrecta.
   * @param {string} respuestasIncorrecta3 - La tercera respuesta incorrecta.
   */
  constructor(
    id,
    texto,
    respuestaCorrecta,
    respuestasIncorrecta1,
    respuestasIncorrecta2,
    respuestasIncorrecta3
  ) {
    this.id = id;
    this.texto = texto;
    this.respuestaCorrecta = respuestaCorrecta;
    this.respuestasIncorrecta1 = respuestasIncorrecta1;
    this.respuestasIncorrecta2 = respuestasIncorrecta2;
    this.respuestasIncorrecta3 = respuestasIncorrecta3;
  }

  /**
   * Convierte la pregunta en una lista desordenada (ul) en formato HTML.
   * @returns {HTMLUListElement} - La pregunta convertida en un elemento HTML <ul>.
   */
  toHTMLUl() {
    const ul = document.createElement("ul");

    // Agregar el texto de la pregunta
    const liTexto = document.createElement("li");
    liTexto.innerHTML = `Pregunta: ${this.texto}`;
    ul.appendChild(liTexto);

    // Agregar la respuesta correcta
    const liRespuestaCorrecta = document.createElement("li");
    liRespuestaCorrecta.innerHTML = `Respuesta Correcta: ${this.respuestaCorrecta}`;
    ul.appendChild(liRespuestaCorrecta);

    // Agregar respuestas incorrectas
    const liRespuestaIncorrecta1 = document.createElement("li");
    liRespuestaIncorrecta1.innerHTML = this.respuestasIncorrecta1;
    ul.appendChild(liRespuestaIncorrecta1);

    const liRespuestaIncorrecta2 = document.createElement("li");
    liRespuestaIncorrecta2.innerHTML = this.respuestasIncorrecta2;
    ul.appendChild(liRespuestaIncorrecta2);

    const liRespuestaIncorrecta3 = document.createElement("li");
    liRespuestaIncorrecta3.innerHTML = this.respuestasIncorrecta3;
    ul.appendChild(liRespuestaIncorrecta3);

    return ul;
  }
}
