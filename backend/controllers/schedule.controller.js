const db = require("../models");
const Schedule = db.schedule;
const Op = db.Sequelize.Op;
const Busline = db.busline;
const utils = require("../utils");

// Crear y guardar un horario
exports.create = (req, res) => {
  // Validar la solicitud (puedes personalizar según tus necesidades)
  // ...

  // Crear un horario
  const schedule = {
    hour: req.body.hour,
  };

  Schedule.create(schedule)
    .then(newSchedule => {
      if (req.body.buslineId) {
        Busline.findByPk(req.body.buslineId)
          .then(busline => {
            if (busline) {
              newSchedule.addBusline(busline);
            }
          })
          .catch(err => {
            console.error("Error finding Busline:", err);
          });
      }
      res.send(newSchedule);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el horario."
      });
    });
};

// Obtener todos los horarios de la base de datos
exports.findAll = (req, res) => {
  Schedule.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Ocurrió un error al obtener todos los horarios."
    });
  });
};

// Encontrar un único horario por su ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Schedule.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Horario con id=${id} no encontrado.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar el horario con id=" + id
      });
    });
};

// Actualizar un horario por su ID
exports.update = (req, res) => {
  const id = req.params.id;

  const schedule = {
    hour: req.body.hour,
  };

  Schedule.update(schedule, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Horario actualizado exitosamente." });
      } else {
        res.status(404).send({
          message: `No se puede actualizar el horario con id=${id}. Quizás el horario no se encontró.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo actualizar el horario con id=" + id
      });
    });
};

// Eliminar un horario con el ID especificado
exports.delete = (req, res) => {
  const id = req.params.id;

  Schedule.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Horario eliminado exitosamente." });
      } else {
        res.status(404).send({
          message: `No se puede eliminar el horario con id=${id}. Quizás el horario no se encontró.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el horario con id=" + id
      });
    });
};
