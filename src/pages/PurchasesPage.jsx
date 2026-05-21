import React from 'react';
import { purchasesConfig } from '../data/appData';
import { CrudEntityPage } from '../components/CrudEntityPage';

export function PurchasesPage() {
  return <CrudEntityPage config={purchasesConfig} />;
}