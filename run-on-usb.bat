@echo off
title Autonomous IT Support AI Agent - USB Launcher
color 0A
echo ===================================================================
echo  Autonomous IT Support AI Agent - USB Flash Drive Runner
echo  Developer: Eng. Abdelrahim Mohamed Ahmed Mohamed
echo  Location:  Arab Republic of Egypt - Qena Governorate
echo  Portfolio: https://github.com/rahemxp2020
echo ===================================================================
echo.

node --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js detected.
    if not exist "node_modules" (
        echo Installing dependencies (first run only)...
        npm install
    )
    echo Starting full development server on http://localhost:3000 ...
    npm run dev
    pause
    exit /b
)

python --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Python detected. Launching portable server on http://localhost:8080 ...
    python run_with_python.py
    pause
    exit /b
)

echo [INFO] Neither Node.js nor Python detected. Opening static pre-compiled app in browser...
if exist "dist\index.html" (
    start dist\index.html
) else (
    start index.html
)
pause
