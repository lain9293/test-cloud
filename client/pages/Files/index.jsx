import React from 'react';
import { FileViewer, Guard, Upload } from '../../components';

export default function Files() {
  return (
    <Guard>
      <>
        <h3>Файлы</h3>
        <FileViewer />
        <Upload />
      </>
    </Guard>
  );
}
