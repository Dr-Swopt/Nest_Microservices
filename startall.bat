
@echo off

cd "C:\Users\esenz\dev\Task\nest-micro"

echo Building all Nest...
call nest build

echo Starting services...
start wt -M -d "C:\Users\esenz\dev\Task\nest-micro" cmd /k "nest start apigateway" ; split-pane -d "C:\Users\esenz\dev\Task\nest-micro" cmd /k "nest start auth" ; split-pane -d "C:\Users\esenz\dev\Task\nest-micro" cmd /k "nest start grpc"


//wt -p "Command Prompt" ; split-pane -p "Windows PowerShell" ; split-pane -H 




