import React from 'react';

const asCurrency = (v) => `Rs. ${(Number(v) || 0).toLocaleString()}`;
import {
  AttachMoneyRounded,
  BarChartRounded,
  DashboardRounded,
  Inventory2Rounded,
  LocalShippingRounded,
  MedicationRounded,
  PeopleAltRounded,
  ReceiptLongRounded,
  SettingsRounded,
  ShoppingCartRounded,
  SummarizeRounded,
  PersonRounded,
} from '@mui/icons-material';

export const navigationItems = [
  { label: 'Dashboard', path: '/dashboard', icon: DashboardRounded },
  { label: 'Medicines', path: '/medicines', icon: MedicationRounded },
  { label: 'Inventory', path: '/inventory', icon: Inventory2Rounded },
  { label: 'Sales & POS', path: '/sales-pos', icon: ShoppingCartRounded },
  { label: 'Purchases', path: '/purchases', icon: ReceiptLongRounded },
  { label: 'Suppliers', path: '/suppliers', icon: LocalShippingRounded },
  { label: 'Customers', path: '/customers', icon: PeopleAltRounded },
  { label: 'Reports', path: '/reports', icon: SummarizeRounded },
  { label: 'Settings', path: '/settings', icon: SettingsRounded },
  { label: 'Profile', path: '/profile', icon: PersonRounded },
];

export const dashboardStats = [
  {
    label: 'Total Sales',
    value: 'Rs. 248.4K',
    change: '+18.2%',
    icon: AttachMoneyRounded,
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
  },
  {
    label: 'Total Medicines',
    value: '1,248',
    change: '+6.5%',
    icon: MedicationRounded,
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  },
  {
    label: 'Low Stock Items',
    value: '34',
    change: '-4.1%',
    icon: Inventory2Rounded,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  },
  {
    label: 'Today’s Revenue',
    value: 'Rs. 28.9K',
    change: '+12.8%',
    icon: BarChartRounded,
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)',
  },
];

export const dashboardChartData = {
  today: [
    { label: '8 AM', revenue: 2400, sales: 11 },
    { label: '10 AM', revenue: 3200, sales: 14 },
    { label: '12 PM', revenue: 2600, sales: 12 },
    { label: '2 PM', revenue: 4200, sales: 19 },
    { label: '4 PM', revenue: 5400, sales: 23 },
    { label: '6 PM', revenue: 5100, sales: 21 },
    { label: '8 PM', revenue: 6200, sales: 27 },
  ],
  weekly: [
    { label: 'Mon', revenue: 38400, sales: 211 },
    { label: 'Tue', revenue: 41800, sales: 232 },
    { label: 'Wed', revenue: 39200, sales: 220 },
    { label: 'Thu', revenue: 45600, sales: 251 },
    { label: 'Fri', revenue: 48200, sales: 267 },
    { label: 'Sat', revenue: 54100, sales: 298 },
    { label: 'Sun', revenue: 43200, sales: 242 },
  ],
  monthly: [
    { label: 'Jan', revenue: 182000, sales: 1120 },
    { label: 'Feb', revenue: 194000, sales: 1180 },
    { label: 'Mar', revenue: 208000, sales: 1255 },
    { label: 'Apr', revenue: 215000, sales: 1302 },
    { label: 'May', revenue: 223000, sales: 1360 },
    { label: 'Jun', revenue: 241000, sales: 1424 },
    { label: 'Jul', revenue: 248400, sales: 1492 },
  ],
};

export const recentSalesRows = [
  { id: 1, invoice: 'INV-9001', customer: 'Ali Raza', amount: 4890, status: 'Paid', date: '2026-05-20' },
  { id: 2, invoice: 'INV-9002', customer: 'Sara Khan', amount: 2680, status: 'Paid', date: '2026-05-20' },
  { id: 3, invoice: 'INV-9003', customer: 'Walk-in', amount: 1140, status: 'Pending', date: '2026-05-20' },
  { id: 4, invoice: 'INV-9004', customer: 'Usman Tariq', amount: 3320, status: 'Paid', date: '2026-05-19' },
  { id: 5, invoice: 'INV-9005', customer: 'Aisha Noor', amount: 2760, status: 'Refunded', date: '2026-05-19' },
];

export const topSellingRows = [
  { id: 1, medicine: 'Panadol Extra', category: 'Pain Relief', sold: 312, revenue: 6864, trend: '+12%' },
  { id: 2, medicine: 'Augmentin 625mg', category: 'Antibiotics', sold: 184, revenue: 3036, trend: '+8%' },
  { id: 3, medicine: 'Ventolin Inhaler', category: 'Respiratory', sold: 146, revenue: 4307, trend: '+16%' },
  { id: 4, medicine: 'Zincovit Syrup', category: 'Supplements', sold: 127, revenue: 16413, trend: '+6%' },
  { id: 5, medicine: 'Amoxil 500mg', category: 'Antibiotics', sold: 104, revenue: 10920, trend: '+3%' },
];

export const monthlyRevenueSeries = {
  today: [4600, 5200, 4300, 6100, 7000, 6600, 7800, 8900],
  weekly: [28400, 31800, 29000, 33600, 36200, 40100, 39200],
  monthly: [182000, 194000, 208000, 215000, 223000, 241000, 248400],
};

export const monthlyRevenueLabels = {
  today: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM'],
  weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
};

const createMedicine = (id, name, category, stock, batch, expiry, purchasePrice, sellingPrice, supplier, status) => ({
  id,
  medicineName: name,
  category,
  stock,
  batch,
  expiry,
  purchasePrice,
  sellingPrice,
  supplier,
  description: `${name} for daily pharmacy operations.`,
  status,
});

export const medicinesRows = [
  createMedicine(1, 'Panadol Extra', 'Pain Relief', 240, 'BX-8831', '2027-05-12', 14, 22, 'MediCare Pharma', 'In Stock'),
  createMedicine(2, 'Augmentin 625mg', 'Antibiotics', 24, 'BX-5521', '2026-10-02', 115, 165, 'Healthline Distributors', 'Low Stock'),
  createMedicine(3, 'Ventolin Inhaler', 'Respiratory', 88, 'BX-4422', '2027-01-18', 210, 295, 'PharmaLink', 'In Stock'),
  createMedicine(4, 'Zincovit Syrup', 'Supplements', 0, 'BX-1119', '2026-02-20', 92, 129, 'MediCare Pharma', 'Out of Stock'),
  createMedicine(5, 'Amoxil 500mg', 'Antibiotics', 18, 'BX-0077', '2025-11-14', 72, 105, 'Wellness Group', 'Expired'),
];

export const medicineFields = [
  { name: 'medicineName', label: 'Medicine Name' },
  { name: 'category', label: 'Medicine Category', type: 'select', options: ['Pain Relief', 'Antibiotics', 'Supplements', 'Respiratory', 'Diabetes'] },
  { name: 'stock', label: 'Stock Quantity', type: 'number' },
  { name: 'batch', label: 'Batch Number' },
  { name: 'expiry', label: 'Expiry Date', type: 'date' },
  { name: 'purchasePrice', label: 'Purchase Price', type: 'number' },
  { name: 'sellingPrice', label: 'Selling Price', type: 'number' },
  { name: 'supplier', label: 'Supplier Name' },
  { name: 'description', label: 'Description', type: 'textarea' },
];

export const medicineColumns = [
  { field: 'medicineName', headerName: 'Medicine Name', flex: 1, minWidth: 180 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'stock', headerName: 'Stock', width: 110 },
  { field: 'batch', headerName: 'Batch', width: 130 },
  { field: 'expiry', headerName: 'Expiry', width: 120 },
  { field: 'sellingPrice', headerName: 'Price', width: 100, valueFormatter: ({ value }) => `Rs. ${value}` },
  { field: 'status', headerName: 'Status', width: 130 },
];

export const medicineConfig = {
  title: 'Medicines',
  subtitle: 'Manage medicine records, stock, expiry, pricing and supplier relationships.',
  addLabel: 'Add Medicine',
  stats: [
    { label: 'In Stock', value: '1,034', color: 'success.main', icon: MedicationRounded },
    { label: 'Low Stock', value: '34', color: 'warning.main', icon: Inventory2Rounded },
    { label: 'Expired', value: '11', color: 'error.main', icon: ReceiptLongRounded },
    { label: 'Categories', value: '18', color: 'secondary.main', icon: SummarizeRounded },
  ],
  rows: medicinesRows,
  columns: medicineColumns,
  fields: medicineFields,
  filterField: 'category',
  filterLabel: 'Category',
  filterOptions: ['All', 'Pain Relief', 'Antibiotics', 'Supplements', 'Respiratory', 'Diabetes'],
  statusAccessor: (row) => row.status,
};

export const inventoryRows = [
  { id: 1, medicine: 'Panadol Extra', warehouse: 'Main Warehouse', quantity: 340, stockStatus: 'Healthy', expiry: '2027-05-12', location: 'Rack A1', alertLimit: 50 },
  { id: 2, medicine: 'Augmentin 625mg', warehouse: 'City Branch', quantity: 24, stockStatus: 'Low', expiry: '2026-10-02', location: 'Rack D2', alertLimit: 30 },
  { id: 3, medicine: 'Ventolin Inhaler', warehouse: 'Main Warehouse', quantity: 88, stockStatus: 'Healthy', expiry: '2027-01-18', location: 'Rack B3', alertLimit: 20 },
  { id: 4, medicine: 'Zincovit Syrup', warehouse: 'Cold Storage', quantity: 0, stockStatus: 'Out of Stock', expiry: '2026-02-20', location: 'Fridge 2', alertLimit: 15 },
];

export const inventoryFields = [
  { name: 'warehouse', label: 'Warehouse Name' },
  { name: 'medicine', label: 'Medicine Name' },
  { name: 'quantity', label: 'Quantity', type: 'number' },
  { name: 'alertLimit', label: 'Stock Alert Limit', type: 'number' },
  { name: 'expiry', label: 'Expiry Date', type: 'date' },
  { name: 'location', label: 'Storage Location' },
];

export const inventoryConfig = {
  title: 'Inventory',
  subtitle: 'Track stock movement, warehouse levels, expiry and location-based storage.',
  addLabel: 'Add Inventory',
  stats: [
    { label: 'Warehouse Stock', value: '9,420', color: 'success.main', icon: Inventory2Rounded },
    { label: 'Low Stock', value: '34', color: 'warning.main', icon: MedicationRounded },
    { label: 'Out of Stock', value: '11', color: 'error.main', icon: ReceiptLongRounded },
    { label: 'Expiring Soon', value: '27', color: 'info.main', icon: SummarizeRounded },
  ],
  rows: inventoryRows,
  columns: [
    { field: 'medicine', headerName: 'Medicine', flex: 1, minWidth: 180 },
    { field: 'warehouse', headerName: 'Warehouse', flex: 1, minWidth: 160 },
    { field: 'quantity', headerName: 'Quantity', width: 110 },
    { field: 'stockStatus', headerName: 'Stock Status', width: 130 },
    { field: 'expiry', headerName: 'Expiry', width: 120 },
    { field: 'location', headerName: 'Location', flex: 1, minWidth: 140 },
  ],
  fields: inventoryFields,
  filterField: 'warehouse',
  filterLabel: 'Warehouse',
  filterOptions: ['All', 'Main Warehouse', 'City Branch', 'Cold Storage'],
  statusAccessor: (row) => row.stockStatus,
};

export const purchasesRows = [
  { id: 1, purchaseId: 'PO-1001', supplier: 'MediCare Pharma', amount: 125400, status: 'Approved', date: '2026-05-16' },
  { id: 2, purchaseId: 'PO-1002', supplier: 'PharmaLink', amount: 76400, status: 'Pending', date: '2026-05-17' },
  { id: 3, purchaseId: 'PO-1003', supplier: 'Wellness Group', amount: 221000, status: 'Received', date: '2026-05-18' },
  { id: 4, purchaseId: 'PO-1004', supplier: 'Healthline Distributors', amount: 35000, status: 'Pending', date: '2026-05-19' },
];

export const supplierRows = [
  { id: 1, supplierName: 'MediCare Pharma', company: 'MediCare Pvt. Ltd.', phone: '+92 300 1112233', email: 'sales@medicare.com', address: 'Lahore, Pakistan' },
  { id: 2, supplierName: 'PharmaLink', company: 'PharmaLink Ltd.', phone: '+92 300 5556677', email: 'info@pharmalink.com', address: 'Karachi, Pakistan' },
  { id: 3, supplierName: 'Wellness Group', company: 'Wellness Group PK', phone: '+92 333 7778881', email: 'hello@wellnessgroup.com', address: 'Islamabad, Pakistan' },
];

export const customerRows = [
  { id: 1, customerName: 'Ali Raza', phone: '+92 300 1234567', email: 'ali@example.com', totalPurchases: 14, loyaltyPoints: 240 },
  { id: 2, customerName: 'Sara Khan', phone: '+92 300 2345678', email: 'sara@example.com', totalPurchases: 9, loyaltyPoints: 145 },
  { id: 3, customerName: 'Usman Tariq', phone: '+92 300 3456789', email: 'usman@example.com', totalPurchases: 21, loyaltyPoints: 380 },
];

export const purchasesConfig = {
  title: 'Purchases',
  subtitle: 'Review purchase orders, supplier invoices and receiving status.',
  addLabel: 'Add Purchase',
  stats: [
    { label: 'Open Orders', value: '12', color: 'secondary.main', icon: ReceiptLongRounded },
    { label: 'Approved', value: '48', color: 'success.main', icon: LocalShippingRounded },
    { label: 'Pending', value: '9', color: 'warning.main', icon: DashboardRounded },
    { label: 'Total Value', value: 'Rs. 8.4M', color: 'primary.main', icon: AttachMoneyRounded },
  ],
  rows: purchasesRows,
  columns: [
    { field: 'purchaseId', headerName: 'Purchase ID', width: 140 },
    { field: 'supplier', headerName: 'Supplier', flex: 1, minWidth: 180 },
    { field: 'amount', headerName: 'Amount', width: 130, valueFormatter: ({ value }) => asCurrency(value) },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'date', headerName: 'Date', width: 120 },
  ],
  fields: [
    { name: 'purchaseId', label: 'Purchase ID' },
    { name: 'supplier', label: 'Supplier' },
    { name: 'amount', label: 'Amount', type: 'number' },
    { name: 'status', label: 'Status', type: 'select', options: ['Approved', 'Pending', 'Received'] },
    { name: 'date', label: 'Date', type: 'date' },
  ],
  lastFieldLeftAligned: true,
  statusAccessor: (row) => row.status,
};

export const supplierConfig = {
  title: 'Suppliers',
  subtitle: 'Manage supplier contacts, purchase history and communication details.',
  addLabel: 'Add Supplier',
  stats: [
    { label: 'Active Suppliers', value: '18', color: 'success.main', icon: LocalShippingRounded },
    { label: 'Pending Payments', value: '07', color: 'warning.main', icon: AttachMoneyRounded },
    { label: 'Top Supplier', value: 'MediCare', color: 'secondary.main', icon: PeopleAltRounded },
    { label: 'Orders This Month', value: '92', color: 'primary.main', icon: ReceiptLongRounded },
  ],
  rows: supplierRows,
  columns: [
    { field: 'supplierName', headerName: 'Supplier Name', flex: 1, minWidth: 180 },
    { field: 'company', headerName: 'Company', flex: 1, minWidth: 180 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    { field: 'address', headerName: 'Address', flex: 1, minWidth: 160 },
  ],
  fields: [
    { name: 'supplierName', label: 'Supplier Name' },
    { name: 'company', label: 'Company' },
    { name: 'phone', label: 'Phone' },
    { name: 'email', label: 'Email' },
    { name: 'address', label: 'Address' },
  ],
  lastFieldLeftAligned: true,
};

export const customerConfig = {
  title: 'Customers',
  subtitle: 'Track customer records, purchase history and loyalty points.',
  addLabel: 'Add Customer',
  stats: [
    { label: 'Registered Customers', value: '2,148', color: 'primary.main', icon: PeopleAltRounded },
    { label: 'Loyalty Members', value: '1,006', color: 'success.main', icon: DashboardRounded },
    { label: 'High Value', value: '120', color: 'secondary.main', icon: AttachMoneyRounded },
    { label: 'New This Week', value: '36', color: 'warning.main', icon: BarChartRounded },
  ],
  rows: customerRows,
  columns: [
    { field: 'customerName', headerName: 'Customer Name', flex: 1, minWidth: 180 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    { field: 'totalPurchases', headerName: 'Total Purchases', width: 140 },
    { field: 'loyaltyPoints', headerName: 'Loyalty Points', width: 140 },
  ],
  fields: [
    { name: 'customerName', label: 'Customer Name' },
    { name: 'phone', label: 'Phone' },
    { name: 'email', label: 'Email' },
    { name: 'totalPurchases', label: 'Total Purchases', type: 'number' },
  ],
};

export const salesMedicines = medicinesRows.map((row) => ({
  id: row.id,
  name: row.medicineName,
  category: row.category,
  price: row.sellingPrice,
  stock: row.stock,
  status: row.status,
}));

export const reportRows = [
  { id: 1, title: 'Daily Revenue', value: 'Rs. 28.9K', trend: '+12.8%' },
  { id: 2, title: 'Monthly Sales', value: 'Rs. 248.4K', trend: '+18.2%' },
  { id: 3, title: 'Low Stock Items', value: '34', trend: '-4.1%' },
];

export const profileTimeline = [
  { id: 1, title: 'Logged in from mobile', time: '2 hours ago' },
  { id: 2, title: 'Updated supplier contact', time: 'Yesterday' },
  { id: 3, title: 'Reviewed daily sales report', time: '2 days ago' },
];

export const settingsSections = [
  'Theme Toggle',
  'System Settings',
  'Pharmacy Information',
  'Notification Settings',
  'Security Settings',
];