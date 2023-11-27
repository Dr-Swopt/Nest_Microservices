@echo off

REM Kill all node.exe processes except for the one associated with your build script
for /f "tokens=2" %%a in ('tasklist ^| findstr /i /c:"node.exe" /c:"BUILD_PROCESS=yes"') do (
  taskkill /F /PID %%a
)

REM Close the terminal window (Windows Terminal)
taskkill /F /IM WindowsTerminal.exe




