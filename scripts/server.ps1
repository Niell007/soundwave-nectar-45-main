# Kill all Node.js processes
function Stop-NodeProcesses {
    Write-Host "Stopping all Node.js processes..."
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
}

# Start development server
function Start-DevServer {
    Write-Host "Starting development server..."
    npm run dev
}

# Main execution
Write-Host "=== Server Management Script ===" -ForegroundColor Cyan
Stop-NodeProcesses
Start-DevServer
