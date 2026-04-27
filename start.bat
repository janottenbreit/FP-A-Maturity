@echo off
REM ================================================
REM  TOM FP&A Maturity - Dev-Server starten
REM ================================================
cd /d "%~dp0"

echo [1/2] Starte Vite Dev-Server...
start "TOM FPA Maturity - Dev Server" cmd /k "npm run dev"

echo [2/2] Oeffne Browser in 3 Sekunden...
timeout /t 3 /nobreak >nul
start "" "http://localhost:8080"

exit
