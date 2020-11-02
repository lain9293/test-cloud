const fs = require('fs');
const getSize = require('get-folder-size');
const User = require('../models/user');
const { asyncHandler } = require('../middleware');

const fabricPromise = (func) => (...args) => new Promise((resolve, reject) => {
  func(...args, (err, data) => (err ? reject(err) : resolve(data)));
});

const readdir = fabricPromise(fs.readdir);
const mkdir = fabricPromise(fs.mkdir);
const wrapGetSize = fabricPromise(getSize);
const unlink = fabricPromise(fs.unlink);
const rmdir = fabricPromise(fs.rmdir);
const stat = fabricPromise(fs.stat);

const getFileList = async (login, folder) => {
  const files = await readdir(`./uploads/${login}/${folder}`);

  const arr = await Promise.all(
    files.map(async (f) => {
      const res = await stat(`./uploads/${login}/${folder}/${f}`);
      if (res.isDirectory()) {
        return { value: f, type: 'dir' };
      }
      if (res.isFile()) {
        return { value: f, type: 'file' };
      }
      return { value: f, type: 'unknown' };
    }),
  );
  return arr;
};

exports.upload = asyncHandler(async (req, res) => {
  let newSize = 0;
  req.files.forEach((f) => {
    newSize += f.size;
  });
  const user = await User.findOne({ _id: req.user.id });
  user.used += newSize;
  await user.save();
  res.json({
    files: await getFileList(req.user.login, req.query.folder),
    used: user.used,
    total: user.total,
  });
});

exports.list = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });

  res.json({
    files: await getFileList(req.user.login, req.query.folder),
    used: user.used,
    total: user.total,
  });
});

exports.deleteFile = asyncHandler(async (req, res) => {
  const filepath = `./uploads/${req.user.login}/${req.query.folder}${req.query.file}`;
  const fileStat = await stat(filepath);
  let clearSize = 0;
  if (fileStat.isDirectory()) {
    clearSize += await wrapGetSize(filepath);
    await rmdir(filepath, { recursive: true });
  } else if (fileStat.isFile()) {
    clearSize += fileStat.size;
    await unlink(filepath);
  }
  const user = await User.findOne({ _id: req.user.id });
  user.used -= clearSize;
  user.save();
  res.json({
    files: await getFileList(req.user.login, req.query.folder),
    used: user.used,
    total: user.total,
  });
});

exports.createFolder = asyncHandler(async (req, res) => {
  let path = '';
  if (req.query.folder) {
    path = `./uploads/${req.user.login}/${req.query.folder}/${req.body.newFolder}/`;
  } else {
    path = `./uploads/${req.user.login}/${req.body.newFolder}/`;
  }
  await mkdir(path);

  const user = await User.findOne({ _id: req.user.id });

  res.json({
    files: await getFileList(req.user.login, req.query.folder),
    used: user.used,
    total: user.total,
  });
});
