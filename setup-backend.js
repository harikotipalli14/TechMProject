const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to execute a command and log the output
function runCommand(command, cwd) {
  console.log(`Running: ${command}`);
  try {
    const output = execSync(command, { cwd, stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return false;
  }
}

// Main function
async function setupBackend() {
  const backendDir = path.join(__dirname, 'grocery-backend');
  
  // Check if the backend directory exists
  if (!fs.existsSync(backendDir)) {
    console.error('Backend directory not found!');
    return;
  }
  
  console.log('Setting up the backend...');
  
  // Install dependencies
  console.log('\nInstalling dependencies...');
  if (!runCommand('npm install', backendDir)) {
    console.error('Failed to install dependencies');
    return;
  }
  
  // Create test user
  console.log('\nCreating test user...');
  if (!runCommand('node create-test-user.js', backendDir)) {
    console.error('Failed to create test user');
    return;
  }
  
  // Start the server
  console.log('\nStarting the server...');
  if (!runCommand('node server.js', backendDir)) {
    console.error('Failed to start the server');
    return;
  }
}

// Run the setup
setupBackend(); 