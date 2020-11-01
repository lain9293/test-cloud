const express = require('express');
const multer = require('multer');
const fs = require('fs');
const {
  upload,
  list,
  deleteFile,
  createFolder,
} = require('../controllers/files');
const { protect } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    fs.mkdir(
      `./uploads/${req.user.login}${req.query.folder}`,
      { recursive: true },
      () => {
        cb(null, `uploads/${req.user.login}${req.query.folder}`);
      },
    );
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const customMulter = multer({ storage });

router
  .route('/upload')
  .post([protect, customMulter.array('documents'), upload]);
router.route('').get([protect, list]);
router.route('').delete([protect, deleteFile]);
router.route('/create-folder').post([protect, createFolder]);
module.exports = router;
