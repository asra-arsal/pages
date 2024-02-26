@echo off
setlocal enabledelayedexpansion

for %%A in ("..") do (
set "prevDir=%%~nxA"
)

for %%A in (".") do (
set "currDir=%%~nxA"
)

set "cmd=pm2 start app.js -n !prevDir!-!currDir!"

echo Command: !cmd!

!cmd!
