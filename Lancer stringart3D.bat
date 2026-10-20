@echo off
setlocal
title stringart3D - Atelier de portraits tisses
cd /d "%~dp0"
if not defined STRINGART3D_PORT set "STRINGART3D_PORT=8793"
set "STRINGART3D_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if exist "%STRINGART3D_NODE%" goto lancer
set "STRINGART3D_NODE=node"
where node >nul 2>nul
if not errorlevel 1 goto lancer
echo.
echo Node.js est introuvable. Installez la version LTS de Node.js,
echo puis relancez ce fichier. Aucun autre paquet n'est necessaire.
echo.
pause
exit /b 1
:lancer
echo.
echo   stringart3D - Jacinto Costoso - v1.0.13
echo   L'atelier va s'ouvrir dans votre navigateur.
echo   Adresse : http://127.0.0.1:%STRINGART3D_PORT%/
echo.
"%STRINGART3D_NODE%" "%~dp0server.cjs" --open
if errorlevel 1 pause
endlocal
