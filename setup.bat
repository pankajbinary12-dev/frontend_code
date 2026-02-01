@echo off
echo ========================================
echo   School Dashboard Setup
echo ========================================
echo.

echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Installation failed!
    echo Please check INSTALLATION_GUIDE.md for help
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Then open: http://localhost:5173
echo.
pause
