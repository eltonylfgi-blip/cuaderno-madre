@echo off
REM Lanzador de la pagina de audicion ASMR del Cuaderno MADRE.
REM Arranca el server local en el puerto 8137 si no esta ya en marcha, y abre la pagina.
setlocal
set "REPO=C:\Users\anton\repos\cuaderno-madre"
set "URL=http://localhost:8137/sounds/asmr-test.html"

REM ¿Responde ya el 8137? Si no, arranca python http.server minimizado.
powershell -NoProfile -Command "$ok=$false; try{ (New-Object System.Net.Sockets.TcpClient).Connect('127.0.0.1',8137); $ok=$true }catch{}; if(-not $ok){ Start-Process -WindowStyle Minimized -FilePath 'python' -ArgumentList '-m','http.server','8137','--directory','%REPO%'; Start-Sleep -Milliseconds 900 }"

start "" "%URL%"
endlocal
