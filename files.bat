@echo off
setlocal enabledelayedexpansion
for /r %%a in (*.txt) do if "%%~xa"==".txt" set "file="%%~a"+!file!"
set NowTime=%time:~,8%
set NowTime=!NowTime::=!
set NowTime=!NowTime: =0!
copy /b !file:~,-1! "!NowTime!_NewFile.txt"
pause
