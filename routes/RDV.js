const RDV = require("../models/RDV");
const Client = require("../models/Client");
const express = require("express");
const router = express.Router();


//booking_an_appointment
router.post('/add_rdv/:id', booking_an_appointment);
async function booking_an_appointment(req, res) {
  try {
    const client = await Client.findById(req.params.id);
    console.log(client);
    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }

    const newRDV = new RDV({
      client: client._id,  // Store the client's _id in the RDV document
      time: req.body.time,
    });

    const rdv = await newRDV.save();
    await client.save(); // Save the updated client document

    res.status(200).send({ message: `Appointment is made for ${client.fullname}` }); // Assuming client has a 'name' property
  
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
}
/**update Appointment*/

router.put('/:id', async (req, res) => {
  try {
    const rdv = await RDV.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!rdv) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ description: 'Successfully updated!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

/**get all Appointments*/

router.get('/',async (req, res, next) => {
  await RDV.find({})
  .then((RDV) => {
    
    res.status(200).json({ RDV: RDV });
  })
  .catch((err) =>
    res.status(401).json({ message: "Not successful", error: err.message })
  );
}
)
/**get Appointment by id*/
router.get('/:id', async (req, res, next) => {
  try {
    const rdv = await RDV.findById(req.params.id);
    if (!rdv) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ rdv });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});
/**get Appointment by date*/
router.get('/date/:time', async (req, res) => {
  try {
    const rdv = await RDV.findOne({ time: req.params.time });
    if (!rdv) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ rdv });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});




/**Remove Appointment*/
router.delete('/:id', async (req, res, next) => {
  const  id  = req.params.id;
  await RDV.findById(id)
    .then((RDV) => RDV.remove())
    .then((RDV) =>
      res.status(200).json({ message: "Appointment successfully deleted", RDV })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
})




module.exports = router;