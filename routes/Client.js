const express = require("express");
const router = express.Router();
var Client = require("../models/Client.js");
const schema = require('../utils/clientValidation.js');

/** add client */
router.post('/add_client',  validateClientInputs, add_client);


async function add_client(req, res) {
  try {
    const { fullname, email, telephone } = req.body;

    /**  Create a new client object*/
    const client = new Client({
      fullname,
      email,
      telephone,
    });

    /** Save the professeur object to the database*/
    const savedClient = await client.save();

    res.status(200).json({ client: savedClient });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
} 
  async function validateClientInputs(req, res, next) {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      res.status(400).json({ message: 'Validation failed', error: error.message });
    }
  }
/**update client*/

router.put('/:id', validateClientInputs, async (req, res) => {
    try {
      const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!client) {
        return res.status(404).json({ message: 'client not found' });
      }
  
      res.status(200).json({ description: 'Successfully updated!' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
 
/**get all Clients*/

router.get('/',async (req, res, next) => {
    await Client.find({})
    .then((Client) => {
      
      res.status(200).json({ Client: Client });
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
}
)
/**get Client by id*/
router.get('/:id', async (req, res, next) => {
    try {
      const client = await Client.findById(req.params.id);
      if (!client) {
        return res.status(404).json({ message: 'client not found' });
      }
      res.status(200).json({ client });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
/**get client by email*/
router.get('/email/:email', async (req, res) => {
    try {
      const client = await Client.findOne({ email: req.params.email });
      if (!client) {
        return res.status(404).json({ message: 'client not found' });
      }
      res.status(200).json({ client });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
  

  
  
/**Remove Client*/
router.delete('/:id', async (req, res, next) => {
    const  id  = req.params.id;
    await Client.findById(id)
      .then((Client) => Client.remove())
      .then((Client) =>
        res.status(200).json({ message: "Client successfully deleted", Client })
      )
      .catch((error) =>
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message })
      );
  })
 
 
 module.exports = router;