const fs = require('fs');
const path = require('path');

module.exports = {
  fetch: (req, res) => {
    const storageDirectory = path.join(__dirname, '..', 'uploads', req.user.id);

    if (!fs.existsSync(`${storageDirectory}/${req.params.filename}`)) {
      return res.status(404).send({
        error: true,
        message: 'File not found'
      });
    }

    res.download(`${storageDirectory}/${req.params.filename}`);
  },
  upload: (req, res) => {
    const file = req.files.image;
    const maxFileSize = 5 * 1024 * 1024; //5 mb
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/png'
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).send({
        error: true,
        message: 'Bad request. File type is not allowed.'
      });
    }

    if (file.size > maxFileSize) {
      return res.status(400).send({
        error: true,
        message: 'Bad request. File size exceeds the allowed limit.'
      });
    }

    const uploadsDirectory = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDirectory)) {
      fs.mkdirSync(uploadsDirectory);
    }

    const storageDirectory = path.join(__dirname, '..', 'uploads', req.user.id);
    if (!fs.existsSync(storageDirectory)) {
      fs.mkdirSync(storageDirectory);
    }

    const fileName = `${req.user.id}_${file.name}`;

    file.mv(`${storageDirectory}/${fileName}`);

    res.status(201).send({
      error: false,
      message: `File with name ${fileName} is uploaded succesfully !`
    });
  },
  delete: (req, res) => {
    const storageDirectory = path.join(__dirname, '..', 'uploads', req.user.id);
    const file = `${storageDirectory}/${req.params.filename}`;

    if (!fs.existsSync(file)) {
      return res.status(404).send({
        error: true,
        message: 'File not found !'
      });
    }

    fs.unlinkSync(file)

    res.send({
      error: false,
      message: `File with path ${file} is succesfully deleted.`
    });
  }
};