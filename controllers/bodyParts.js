const BodyPart = require("../models/bodyParts");

async function createParts(req, res) {
  const bodyPart = new BodyPart();
  const { name_part, location } = req.body;
  bodyPart.name_part = name_part;
  bodyPart.location = location;

  bodyPart.save((err, partStored) => {
    if (err) {
      res.status(500).send({ message: "la parte del cuerpo ya existe." });
    } else {
      if (!partStored) {
        res
          .status(404)
          .send({ message: "Error al crear la parte del cuerpo." });
      } else {
        res.status(200).send({ bodyPart });
      }
    }
  });
}

async function getParts(req, res) {
  const response = await BodyPart.find();

  if (!response) {
    res.status(400).send({ msg: "No se han encontrado partes" });
  } else {
    res.status(200).send(response);
  }
}

async function getPartById(req, res) {
  const params = req.params;

  const body_id = params.id;
  console.log(params.id);

  const response = await BodyPart.findById(body_id);

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado la parte del cuerpo" });
  } else {
    res.status(200).send(response);
  }
}

async function updateParts(req, res) {
  let PartData = req.body;
  const params = req.params;

  /* Actualizamos el resto de los datos */
  BodyPart.findByIdAndUpdate(
    { _id: params.id },
    PartData,
    (err, partUpdate) => {
      err
        ? res.status(500).send({ message: "Error del servidor." })
        : !partUpdate
        ? res
            .status(404)
            .send({ message: "No se encontro la parte del cuerpo." })
        : res
            .status(200)
            .send({ message: "Parte del cuerpo actualizada correctamente." });
    }
  );
}

const deleteParts = (req, res) => {
  const { id } = req.params;

  BodyPart.findByIdAndRemove(id, (err, partDeleted) => {
    err
      ? res.status(500).send({ message: "Error del servidor." })
      : !partDeleted
      ? res.status(404).send({ message: "No se encontró la parte del cuerpo." })
      : res
          .status(200)
          .send({ message: "Parte del cuerpo eliminada correctamente." });
  });
};

module.exports = {
  getParts,
  getPartById,
  updateParts,
  deleteParts,
  createParts,
};
