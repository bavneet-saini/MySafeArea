@echo off
title MySafeArea AI - Civic Tech Platform
echo ===================================================
echo   Starting MySafeArea AI Development Server...
echo ===================================================
cd /d "%~dp0"
npm.cmd run dev -- --open
pause
