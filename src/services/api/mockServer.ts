import MockAdapter from 'axios-mock-adapter';
import { apiClient } from './client';
import { dashboardData } from '../../data/dashboardData';
import { authSeedUsers, medicineSeed, customerSeed, supplierSeed, employeeSeed, salesSeed, purchaseSeed } from '../../data/mockData';
import type { AuthResponse } from '../../types/auth';

let isBootstrapped = false;

const mockToken = 'mock-jwt-token';

const toAuthResponse = (email: string): AuthResponse => {
  const user = authSeedUsers.find((entry) => entry.email === email) ?? authSeedUsers[0];
  return { token: mockToken, user };
};

export function bootstrapMockApi() {
  if (isBootstrapped) {
    return;
  }

  const mock = new MockAdapter(apiClient, { delayResponse: 650 });
  isBootstrapped = true;

  mock.onPost('/auth/login').reply((config) => {
    const payload = JSON.parse(config.data as string) as { email: string };
    return [200, toAuthResponse(payload.email)];
  });

  mock.onPost('/auth/register').reply((config) => {
    const payload = JSON.parse(config.data as string) as { name: string; email: string; role: 'SUPER_ADMIN' | 'EMPLOYEE' };
    return [200, { token: mockToken, user: { id: 'u-new', name: payload.name, email: payload.email, role: payload.role } } satisfies AuthResponse];
  });

  mock.onPost('/auth/forgot-password').reply(200, { message: 'Password reset instructions sent to your email.' });
  mock.onPost('/auth/reset-password').reply(200, { message: 'Password reset successful.' });
  mock.onGet('/auth/me').reply(200, authSeedUsers[0]);

  mock.onGet('/dashboard/summary').reply(200, dashboardData.summary);
  mock.onGet('/dashboard/charts').reply(200, dashboardData.charts);
  mock.onGet('/dashboard/tables').reply(200, dashboardData.tables);

  mock.onGet('/medicines').reply(200, medicineSeed);
  mock.onGet('/customers').reply(200, customerSeed);
  mock.onGet('/suppliers').reply(200, supplierSeed);
  mock.onGet('/employees').reply(200, employeeSeed);
  mock.onGet('/sales').reply(200, salesSeed);
  mock.onGet('/purchases').reply(200, purchaseSeed);

  mock.onAny().reply(() => [200, { success: true }]);
}

// Auto-bootstrap mocks when this module is imported so the app
// uses mock responses by default in development environments.
bootstrapMockApi();
