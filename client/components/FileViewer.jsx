/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  faFile,
  faFolder,
  faFolderPlus,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import {
  Breadcrumb, Button, Card, ProgressBar,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import api from '../services/api';
import { actions } from '../store';
import './FileViewer.scss';

export default function FileViewer() {
  const {
    currentFolder, files, used, total,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const deleteFile = (file) => {
    api.Files.deleteFile(currentFolder.join('/'), file)
      .then((data) => {
        dispatch(actions.setFiles(data));
        addToast('Файл удален.', {
          appearance: 'success',
          autoDismiss: true,
        });
      })
      .catch(() => {
        addToast('Что-то пошло не так =(.', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  useEffect(() => {
    api.Files.list(currentFolder.join('/'))
      .then((data) => {
        dispatch(actions.setFiles(data));
        addToast('Файлы получены.', {
          appearance: 'success',
          autoDismiss: true,
        });
      })
      .catch(() => {
        addToast('Что-то пошло не так =(.', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  }, [addToast, dispatch, currentFolder]);

  const createFolder = () => {
    const newFolder = prompt('Название папки');
    if (newFolder) {
      api.Files.createFolder(currentFolder.join('/'), newFolder)
        .then((data) => {
          dispatch(actions.setFiles(data));
          addToast('Файлы получены.', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch(() => {
          addToast('Что-то пошло не так =(.', {
            appearance: 'error',
            autoDismiss: true,
          });
        });
    }
  };

  const openFolder = (folder) => {
    dispatch(actions.setCurrentFolder([...currentFolder, folder]));
  };

  const changeFolder = (index) => {
    dispatch(actions.setCurrentFolder(currentFolder.slice(0, index)));
  };

  return (
    <div className="file-viewer">
      <Card>
        <Card.Body>
          <p>
            Осталось (МБ):
            {Math.round(total / 1024 / 1024 - used / 1024 / 1024)}
          </p>
          <p>
            Использовано (МБ):
            {Math.round(used / 1024 / 1024)}
          </p>
          <p>
            Всего (МБ):
            {Math.round(total / 1024 / 1024)}
          </p>
          <ProgressBar now={used / (total / 100)} />
        </Card.Body>
      </Card>
      <Breadcrumb>
        {currentFolder.length ? (
          <>
            <Breadcrumb.Item key=".0" onClick={() => changeFolder(0)}>
              Главная
            </Breadcrumb.Item>
            {currentFolder.map((f, i) => (
              <Breadcrumb.Item key={f} onClick={() => changeFolder(i + 1)}>
                {f}
              </Breadcrumb.Item>
            ))}
          </>
        ) : (
          <Breadcrumb.Item key=".0">Главная</Breadcrumb.Item>
        )}
      </Breadcrumb>
      <div className="btn-panel">
        <Button onClick={createFolder}>
          <FontAwesomeIcon icon={faFolderPlus} />
          <span>Создать папку</span>
        </Button>
      </div>

      <div>
        {files.map((f) => (
          <Card key={f.value}>
            {f.type === 'dir' ? (
              <FontAwesomeIcon icon={faFolder} />
            ) : (
              <FontAwesomeIcon icon={faFile} />
            )}
            <Card.Body>
              {f.type === 'dir' ? (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <span className="dir" onClick={() => openFolder(f.value)}>
                  {f.value}
                </span>
              ) : (
                <span>{f.value}</span>
              )}
              <FontAwesomeIcon
                className="delete-icon"
                icon={faTimesCircle}
                onClick={() => deleteFile(f.value)}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
