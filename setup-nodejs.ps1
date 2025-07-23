# PowerShell script to install Node.js and setup the project
Write-Host "Setting up Node.js and Golf Tracker..." -ForegroundColor Green

# Check if Node.js is already installed
$nodeInstalled = $false
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "Node.js is already installed: $nodeVersion" -ForegroundColor Yellow
        $nodeInstalled = $true
    }
} catch {
    Write-Host "Node.js not found, will install..." -ForegroundColor Yellow
}

if (-not $nodeInstalled) {
    # Download and install Node.js
    Write-Host "Downloading Node.js installer..." -ForegroundColor Blue
    $nodeUrl = "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
    $installerPath = "$env:TEMP\nodejs-installer.msi"
    
    try {
        Invoke-WebRequest -Uri $nodeUrl -OutFile $installerPath
        Write-Host "Installing Node.js..." -ForegroundColor Blue
        Start-Process msiexec.exe -Wait -ArgumentList "/i $installerPath /quiet"
        Remove-Item $installerPath
        
        # Refresh environment variables
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        
        Write-Host "Node.js installed successfully!" -ForegroundColor Green
    } catch {
        Write-Host "Failed to download/install Node.js automatically." -ForegroundColor Red
        Write-Host "Please download and install Node.js manually from: https://nodejs.org/" -ForegroundColor Yellow
        Write-Host "After installation, restart PowerShell and run this script again." -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Verify npm is available
try {
    $npmVersion = npm --version 2>$null
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "npm not found. Please restart PowerShell and try again." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Install project dependencies
Write-Host "Installing project dependencies..." -ForegroundColor Blue
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now run the project with:" -ForegroundColor Yellow
    Write-Host "npm run dev" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "The website will open at: http://localhost:5173" -ForegroundColor Cyan
} else {
    Write-Host "Failed to install dependencies. Please check the error messages above." -ForegroundColor Red
}

Read-Host "Press Enter to continue"
