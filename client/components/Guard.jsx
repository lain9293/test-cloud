import React from 'react';
import { useSelector } from 'react-redux';

export default function Guard({ children }) {
  const token = useSelector((state) => state.token);

  return <>{token ? <>{children}</> : <h3>401 - Unauthorized</h3>}</>;
}
