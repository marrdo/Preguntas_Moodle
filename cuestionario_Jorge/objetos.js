class Cuestionario {
    constructor() {
        this.preguntas = [];
    }

    añadirPregunta(pregunta) {
        this.preguntas.push(pregunta);
    }

    descartarPregunta(id) {
        this.preguntas = this.preguntas.filter(pregunta => pregunta.id !== id);
    }

    getPregunta(id) {
        return this.preguntas.find(pregunta => pregunta.id === id);
    }

    preguntaToHTMLDiv(id) {

        /* NOTA: Dejo comentado esto porque  habría que estudia los otros métodos
        pa ver si está bien.*/

        const pregunta = this.getPregunta(id);
        if (pregunta) {
            const preguntaHTML = pregunta.toHTMLUl();
            const div = document.createElement('div');
            div.appendChild(preguntaHTML);
            return div;
        } else {
            return null; // Pregunta no encontrada
        }
    }
}


//CLASE PREGUNTA

class Pregunta{

    constructor(id, texto,respuestaCorrecta,respuestasIncorrecta1, respuestasIncorrecta2,respuestasIncorrecta3) {
        this.id = id;
        this.texto = texto;
        this.respuestaCorrecta = respuestaCorrecta;
        this.respuestasIncorrecta1 = respuestasIncorrecta1;
        this.respuestasIncorrecta2 = respuestasIncorrecta2;
        this.respuestasIncorrecta3 = respuestasIncorrecta3;
      }

      toHTMLUl() {
        const ul = document.createElement('ul');
        
        // Agregar el texto de la pregunta
        const liTexto = document.createElement('li');
        liTexto.innerHTML = `Pregunta: ${this.texto}`;
        ul.appendChild(liTexto);

        // Agregar la respuesta correcta
        const liRespuestaCorrecta = document.createElement('li');
        liRespuestaCorrecta.innerHTML = `Respuesta Correcta: ${this.respuestaCorrecta}`;
        ul.appendChild(liRespuestaCorrecta);
    
        const ulRespuestasIncorrectas = document.createElement('ul');
        
        // Agregar respuestas incorrectas
        const liRespuestaIncorrecta1 = document.createElement('li');
        liRespuestaIncorrecta1.innerHTML = this.respuestasIncorrecta1;
        ulRespuestasIncorrectas.appendChild(liRespuestaIncorrecta1);
        
        const liRespuestaIncorrecta2 = document.createElement('li');
        liRespuestaIncorrecta2.innerHTML = this.respuestasIncorrecta2;
        ulRespuestasIncorrectas.appendChild(liRespuestaIncorrecta2);
        
        const liRespuestaIncorrecta3 = document.createElement('li');
        liRespuestaIncorrecta3.innerHTML = this.respuestasIncorrecta3;
        ulRespuestasIncorrectas.appendChild(liRespuestaIncorrecta3);
    
        liRespuestasIncorrectas.appendChild(ulRespuestasIncorrectas);
        ul.appendChild(liRespuestasIncorrectas);
    
        return ul;
    }


}