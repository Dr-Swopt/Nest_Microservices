
@echo off

echo Building auth...
call nest build auth

echo Starting ApiGateWay and AuthMicro
start wt -M -d "C:\Users\esenz\dev\Task\nest-micro" cmd /k "nest start apigateway" ; split-pane -d "C:\Users\esenz\dev\Task\nest-micro" cmd /k "nest start auth"


//wt -p "Command Prompt" ; split-pane -p "Windows PowerShell" ; split-pane -H 

