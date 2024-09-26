
@echo off

cd "E:\Task\nest-micro"

echo Building all Nest...
call nest build

echo Starting services...
start wt -M -d "E:\Task\nest-micro" cmd /k "nest start apigateway" ; split-pane -d "E:\Task\nest-micro" cmd /k "nest start grpc" ; split-pane -d "E:\Task\nest-micro" cmd /k "nest start tcp"


//wt -p "Command Prompt" ; split-pane -p "Windows PowerShell" ; split-pane -H 




