const User = require("../models/user");

module.exports = {

  fetchOne: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(200).send({
        error: false,
        message: `User with id #${req.params.id} fetched`,
        user

      });
    } catch (error) {
      res.status(400).send({
        error: true,
        messege: 'Could not fetch Users'
      });
    }

  }
}
  //recipe
  // orderByAge: async (req, res) => {
  //   const users = await User.find().sort({ age: 1 });

  //   res.send({
    //     users: users
    //   });
    // }

  // fetchAll: async (req, res) => {
  //   // assume try catch
  //   const users = await User.find();

  //   res.status(200).send({
  //     error: false,
  //     message: 'All users are fetched',
  //     users
  //   });
  // },