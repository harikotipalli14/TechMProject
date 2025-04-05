const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const data = JSON.stringify({
  email: 'test@example.com',
  password: 'password123'
});

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:');
    console.log(JSON.parse(responseData));
  });
});

req.on('error', (error) => {
  console.error('Error testing login endpoint:', error);
});

req.write(data);
req.end(); 