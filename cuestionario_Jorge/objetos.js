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
        const pregunta = this.getPregunta(id);
        if (pregunta) {
            const preguntaHTML = pregunta.toHTMLUl(); // Usar toHTMLUl para lista
            const divPreguntas = document.getElementById('divPreguntas'); // Obtener el divPreguntas existente
    
            // Crear un div para envolver la pregunta
            const divWrapper = document.createElement('div');
            divWrapper.appendChild(preguntaHTML); // Agregar la pregunta al divWrapper
    
            // Botón "Recuperar Pregunta"
            const botonRecuperar = document.createElement('button');
            botonRecuperar.innerHTML = 'Recuperar Pregunta';
            botonRecuperar.name = 'retrieve'; // Establece el name del botón como "retrieve"
            botonRecuperar.id = `retrieve_${id}`; // Establece el id del botón como "retrieve_id"
            divWrapper.appendChild(botonRecuperar);
    
            // Botón "Descartar Pregunta"
            const botonDescartar = document.createElement('button');
            botonDescartar.innerHTML = 'Descartar Pregunta';
            botonDescartar.name = 'discard'; // Establece el name del botón como "discard"
            botonDescartar.id = `discard_${id}`; // Establece el id del botón como "discard_id"
            divWrapper.appendChild(botonDescartar);
    
            divPreguntas.appendChild(divWrapper); // Agregar el divWrapper a divPreguntas
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
    
        // Agregar respuestas incorrectas
        const liRespuestaIncorrecta1 = document.createElement('li');
        liRespuestaIncorrecta1.innerHTML = this.respuestasIncorrecta1;
        ul.appendChild(liRespuestaIncorrecta1);
    
        const liRespuestaIncorrecta2 = document.createElement('li');
        liRespuestaIncorrecta2.innerHTML = this.respuestasIncorrecta2;
        ul.appendChild(liRespuestaIncorrecta2);
    
        const liRespuestaIncorrecta3 = document.createElement('li');
        liRespuestaIncorrecta3.innerHTML = this.respuestasIncorrecta3;
        ul.appendChild(liRespuestaIncorrecta3);
    
        return ul;
    }
    
      
    


}