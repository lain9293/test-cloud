import React from 'react';
import { useSelector } from 'react-redux';
import './Spinner.scss';

export default function Spinner({ children }) {
  const loading = useSelector((state) => state.loading);
  return (
    <>
      {loading && (
        <div className="loader-back ">
          <div className="loader" />
        </div>
      )}
      <>{children}</>
    </>
  );
}
