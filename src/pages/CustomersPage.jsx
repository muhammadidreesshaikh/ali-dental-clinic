import React from 'react';
import { customerConfig } from '../data/appData';
import { CrudEntityPage } from '../components/CrudEntityPage';

export function CustomersPage() {
  return <CrudEntityPage config={customerConfig} />;
}