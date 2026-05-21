import React from 'react';
import { inventoryConfig } from '../data/appData';
import { CrudEntityPage } from '../components/CrudEntityPage';

export function InventoryPage() {
  return <CrudEntityPage config={inventoryConfig} />;
}