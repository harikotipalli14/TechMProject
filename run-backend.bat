@echo off
echo Setting up the backend...
cd grocery-backend
echo Installing dependencies...
call npm install
echo.
echo Creating test user...
call node create-test-user.js
echo.
echo Starting server...
call node server.js 