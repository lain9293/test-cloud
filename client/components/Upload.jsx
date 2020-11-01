/* eslint-disable react/jsx-props-no-spreading */
import { faArrowUp, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import api from '../services/api';
import { actions } from '../store';
import './Upload.scss';

export default function Upload() {
  const [files, setFiles] = useState(undefined);
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { loading, currentFolder } = useSelector((state) => state);
  const onDrop = (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('documents', file, file.name);
    });
    setFiles(formData);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const uploadAssets = () => {
    api.Files.upload(files, currentFolder.join('/'))
      .then((data) => {
        dispatch(actions.setFiles(data));
        addToast('Файды загружены.', {
          appearance: 'success',
          autoDismiss: true,
        });
        acceptedFiles.splice(0, acceptedFiles.length);
        setFiles([]);
      })
      .catch(() => {
        addToast('Что-то пошло не так =(.', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  const deleteFileFromUploadList = (name) => {
    acceptedFiles.splice(acceptedFiles.indexOf(name), 1);
    setFiles([]);
  };

  return (
    <section className="uploader-wrap">
      <div className="wrap">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} disabled={loading} />
          <p>
            Перетащите сюда несколько файлов или щелкните, чтобы выбрать файлы
          </p>
        </div>
        <Button
          onClick={uploadAssets}
          disabled={!acceptedFiles.length || loading}
        >
          <FontAwesomeIcon icon={faArrowUp} />
          Загрузить
        </Button>
      </div>

      <ListGroup className="list-group">
        {acceptedFiles.map((file) => (
          <ListGroup.Item key={file.path} className="files-list">
            <FontAwesomeIcon
              icon={faTimesCircle}
              onClick={() => deleteFileFromUploadList(file.name)}
            />
            {file.path}
            -
            {file.size}
            bytes
          </ListGroup.Item>
        ))}
      </ListGroup>
    </section>
  );
}
