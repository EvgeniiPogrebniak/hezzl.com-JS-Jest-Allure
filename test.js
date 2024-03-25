const baseUrl = 'https://api-prod.hezzl.com';
const email = 'test@hezzl.com';
const password = 123456;
const campaignId = 145602;
let accessToken = '';
let timeZone = '';
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

jest.setTimeout(20000);

async function sendRequestInit() {

  const raw = JSON.stringify({});

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  return fetch(`${baseUrl}/gw/v1/game/${campaignId}/init`, requestOptions);
}

async function sendRequestCheckLogin() {

  const raw = JSON.stringify({
    "login": `${email}`
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  return fetch(`${baseUrl}/auth/v1/game/${campaignId}/check-login`, requestOptions);
}

async function sendRequestConfirmCode() {

  myHeaders.append("Authorization", `${accessToken}`);

  const raw = JSON.stringify({
    "code": `${password}`
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  return fetch(`${baseUrl}/auth/v1/game/${campaignId}/confirm-code`, requestOptions);
}

test('1. В ответ на запрос Init сервер отдал статус 200', async function() {
  const response = await sendRequestInit();
  expect(response.status).toBe(200);
});

test('2. Запрос Init. Записываем в переменную timeZone значение параметра time из ответа', async function() {
  const response = await sendRequestInit();
  const responseBody = await response.json();
  timeZone = responseBody.time;
  expect(timeZone).toBeDefined();
});

test('3. Запрос Init. Проверка наличия параметра data в ответе', async function() {
  const response = await sendRequestInit();
  const responseBody = await response.json();
  expect(typeof responseBody.data).toBe('object');
});

test('4. Запрос Init. Проверка наличия параметра auth в объекте data', async function() {
  const response = await sendRequestInit();
  const responseBody = await response.json();
  expect(typeof responseBody.data.auth).toBe('object');
});

test('5. В ответ на запрос CheckLogin сервер отдал статус 200', async function() {
  const response = await sendRequestCheckLogin();
  expect(response.status).toBe(200);
});

test('6. Запрос CheckLogin. Записываем в переменную accessToken значение параметра accessToken из ответа', async function() {
  const response = await sendRequestCheckLogin();
  const responseBody = await response.json();
  accessToken = responseBody.accessToken;
  expect(responseBody.accessToken).toBeDefined();
});

test('7. Запрос CheckLogin. Проверяем, что скорость ответа от сервера менее 200ms', async function() {
  const startTime = Date.now();
  const response = await sendRequestCheckLogin();
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  expect(responseTime).toBeLessThan(200);
});

test('8. В ответ на запрос ConfirmCode сервер отдал статус 200', async function() {
  const response = await sendRequestConfirmCode();
  expect(response.status).toBe(200);
});

test('9. Запрос ConfirmCode. Проверяем, что скорость ответа от сервера менее 200ms', async function() {
  const startTime = Date.now();
  const response = await sendRequestConfirmCode();
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  expect(responseTime).toBeLessThan(200);
});
