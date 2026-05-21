import React from 'react';
import { medicineConfig } from '../data/appData';
import { CrudEntityPage } from '../components/CrudEntityPage';

export function MedicinesPage() {
  return <CrudEntityPage config={medicineConfig} />;
}