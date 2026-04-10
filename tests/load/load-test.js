import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10, // 10 virtual users
  duration: '30s', // Test duration
};

const baseURL = 'https://www.saucedemo.com';

export default function () {
  // Login
  let response = http.post(baseURL, {
    'user-name': 'standard_user',
    'password': 'secret_sauce',
  });

  check(response, {
    'login status is 200': (r) => r.status === 200,
    'login redirects to inventory': (r) => r.url.includes('/inventory.html'),
  });

  sleep(1);

  // Load inventory page
  response = http.get(`${baseURL}/inventory.html`);
  check(response, {
    'inventory page loads': (r) => r.status === 200,
    'response time < 2000ms': (r) => r.timings.duration < 2000,
  });

  sleep(1);
}