import React from 'react';
import { supplierConfig } from '../data/appData';
import { CrudEntityPage } from '../components/CrudEntityPage';

export function SuppliersPage() {
  return <CrudEntityPage config={supplierConfig} />;
}