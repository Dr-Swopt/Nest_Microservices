
@echo off

echo Building grpc...
call nest build 

echo Starting Service ApiGateWay && MessageGRPC
start wt -M -d "C:\Users\esenz\dev\Task\nest-micro" cmd /k "nest start apigateway" ; split-pane -d "C:\Users\esenz\dev\Task\nest-micro" cmd /k "nest start grpc"


//wt -p "Command Prompt" ; split-pane -p "Windows PowerShell" ; split-pane -H 

