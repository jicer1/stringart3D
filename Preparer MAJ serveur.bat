@echo off
setlocal
title stringart3D - Preparation de la mise a jour serveur
cd /d "%~dp0"
set "STRINGART3D_PYTHON=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if exist "%STRINGART3D_PYTHON%" goto preparer
set "STRINGART3D_PYTHON=python"
where python >nul 2>nul
if errorlevel 1 goto absent
:preparer
"%STRINGART3D_PYTHON%" "%~dp0tools\preparer-maj.py" --complet
if errorlevel 1 goto erreur
echo.
echo Mise a jour prete dans serveur_externe. Lire MISE_A_JOUR_SERVEUR.txt.
echo Aucun transfert automatique.
pause
exit /b 0
:absent
echo Python 3 est necessaire pour preparer une mise a jour.
:erreur
echo La preparation n'a pas abouti. Consulter le message ci-dessus.
pause
exit /b 1
