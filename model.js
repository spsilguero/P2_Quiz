const fs = require("fs");

//Nombre del ficehro donde se guardan las preguntas.
//Es un fichero de texto con el JSON de quizzes
const DB_FILENAME = "quizzes.json";

//Modelo de datos
//
//
//
let quizzes = [
  {
    question: "Capital de Italia",
    answer: "Roma"
  },
  {
    question: "Capital de Francia",
    answer: "París"
  },
  {
    question: "Capital de España",
    answer: "Madrid"
  },
  {
    question: "Capital de Portugal",
    answer: "Lisboa"
  }
];

/**
*Carga las preguntas en el fichero
*/
const load = () => {

  fs.readFile(DB_FILENAME, (err,data) => {
    if (err) {
      //La primera vez no existe el ficehro
      if (err.code === "ENOENT") {
      save(); //valores iniciales
      return;
      }
      throw err;
    }
    
    let json = JSON.parse(data);

    if (json) {
      quizzes = json;
    }
  });
};

/**
*Guarda las preguntas en el fichero
*/
const save = () => {

  fs.writeFile(DB_FILENAME,
      JSON.stringify(quizzes),
      err => {
        if (err) throw err;
      });
};

/**
*Devuelve el numero total de preguntas existentes
*/
exports.count = () => quizzes.length;

/**
*Añade un nuevo quiz
*/
exports.add = (question, answer) => {
  quizzes.push({
    question: (question || "").trim(),
    answer: (answer || "").trim()
  });
  save();
};

/**
*Actualiza el quiz situado en la posicion index
*/
exports.update = (id, question, answer) => {
  const quiz = quizzes[id];
  if (typeof quiz === "undefined") {
    throw new Error('El valor del parámetro id no es válido');
  }
  quizzes.splice(id, 1, {
    question: (question || "").trim(),
    answer: (answer || "").trim()
  });
  save();
};

/**
*Devuelve todos los quizzes existentes
*/
exports.getAll = () =>  JSON.parse(JSON.stringify(quizzes));

/**
*Devuelve un clon del quiz almacenado en la posicion dada
*/
exports.getByIndex = id => {
  const quiz = quizzes[id];
  if (typeof quiz === "undefined") {
    throw new Error('El valor del parámetro id no es válido');
  }
  return JSON.parse(JSON.stringify(quiz));
};

/**
*Elimina el quiz situado en la posicion dada
*/
exports.deleteByIndex = id => {
  const quiz = quizzes[id];
  if (typeof quiz === "undefined") {
    throw new Error('El valor del parámetro id no es válido');
  }
  quizzes.splice(id, 1);
  save();
};

//Carga los quizzes almacenados en el fichero
load();