@echo off
title Autonomous IT Support AI Agent - Portable Python Server
color 0B
echo ===================================================================
echo  Autonomous IT Support AI Agent - Portable Launcher
echo  Developer: Eng. Abdelrahim Mohamed Ahmed Mohamed
echo  Location:  Arab Republic of Egypt - Qena Governorate
echo  Portfolio: https://github.com/rahemxp2020
echo ===================================================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python was not found in system PATH.
    echo Please install Python 3.x from https://www.python.org/
    echo or run using run-on-usb.bat if Node.js is installed.
    echo.
    pause
    exit /b
)

echo Starting local server via Python...
python run_with_python.py
pause
