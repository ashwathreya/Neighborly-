# Script to start both development servers
# Run this file: .\START_SERVERS.ps1

# Set execution policy for this session
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force

# Navigate to project root
Set-Location "D:\Cursor AI- Projects\Websites\Animal Sitting"

Write-Host "Starting development servers..." -ForegroundColor Green
Write-Host "Web: http://localhost:3000" -ForegroundColor Cyan
Write-Host "API: http://localhost:4000" -ForegroundColor Cyan
Write-Host ""

# Start both servers
npm run dev




