@echo off
cd /d "%~dp0"

:: Mensagem de commit personalizada
set /p msg="Digite a mensagem do commit: "

:: Executa os comandos Git
git add .
git commit -m "%msg%"
git push -u origin main

pause
