# AR E-commerce Platform - Setup Verification

Write-Host "`n🔍 AR E-commerce Platform - Setup Verification`n" -ForegroundColor Cyan
Write-Host "━" * 60 -ForegroundColor Gray

$allGood = $true

# Check Node.js
Write-Host "`n1️⃣  Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "   ✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Node.js not found. Please install Node.js" -ForegroundColor Red
    $allGood = $false
}

# Check npm
Write-Host "`n2️⃣  Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "   ✅ npm installed: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ npm not found" -ForegroundColor Red
    $allGood = $false
}

# Check MongoDB
Write-Host "`n3️⃣  Checking MongoDB..." -ForegroundColor Yellow
try {
    $mongoVersion = mongod --version 2>&1 | Select-String "db version" | Select-Object -First 1
    if ($mongoVersion) {
        Write-Host "   ✅ MongoDB installed" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  MongoDB may not be installed" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ⚠️  MongoDB not found in PATH" -ForegroundColor Yellow
    Write-Host "   💡 Make sure MongoDB is installed and running" -ForegroundColor Cyan
}

# Check Backend folder
Write-Host "`n4️⃣  Checking Backend folder..." -ForegroundColor Yellow
if (Test-Path "Backend") {
    Write-Host "   ✅ Backend folder exists" -ForegroundColor Green
    
    # Check node_modules
    if (Test-Path "Backend/node_modules") {
        Write-Host "   ✅ Backend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Backend dependencies not installed" -ForegroundColor Yellow
        Write-Host "   💡 Run: cd Backend && npm install" -ForegroundColor Cyan
    }
    
    # Check .env file
    if (Test-Path "Backend/.env") {
        Write-Host "   ✅ Backend .env file exists" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Backend .env file not found" -ForegroundColor Yellow
        Write-Host "   💡 Create .env file in Backend folder" -ForegroundColor Cyan
    }
} else {
    Write-Host "   ❌ Backend folder not found" -ForegroundColor Red
    $allGood = $false
}

# Check Frontend folder
Write-Host "`n5️⃣  Checking Frontend folder..." -ForegroundColor Yellow
if (Test-Path "Frontend") {
    Write-Host "   ✅ Frontend folder exists" -ForegroundColor Green
    
    # Check node_modules
    if (Test-Path "Frontend/node_modules") {
        Write-Host "   ✅ Frontend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Frontend dependencies not installed" -ForegroundColor Yellow
        Write-Host "   💡 Run: cd Frontend && npm install" -ForegroundColor Cyan
    }
    
    # Check .env file
    if (Test-Path "Frontend/.env") {
        Write-Host "   ✅ Frontend .env file exists" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Frontend .env file not found" -ForegroundColor Yellow
        Write-Host "   💡 .env file created with default values" -ForegroundColor Cyan
    }
} else {
    Write-Host "   ❌ Frontend folder not found" -ForegroundColor Red
    $allGood = $false
}

# Summary
Write-Host "`n" + ("━" * 60) -ForegroundColor Gray

if ($allGood) {
    Write-Host "`n✅ Setup verification completed successfully!`n" -ForegroundColor Green
    Write-Host "📝 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Start MongoDB: " -NoNewline; Write-Host "net start MongoDB" -ForegroundColor Yellow
    Write-Host "   2. Install dependencies if needed:" -ForegroundColor White
    Write-Host "      cd Backend && npm install" -ForegroundColor Yellow
    Write-Host "      cd Frontend && npm install" -ForegroundColor Yellow
    Write-Host "   3. Create admin user: " -NoNewline; Write-Host "cd Backend && npm run create-admin" -ForegroundColor Yellow
    Write-Host "   4. Start servers: " -NoNewline; Write-Host ".\start.ps1" -ForegroundColor Yellow
    Write-Host "`n🚀 You're ready to go!`n" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Some issues were found. Please fix them before proceeding.`n" -ForegroundColor Yellow
}

Write-Host ("━" * 60) -ForegroundColor Gray
Write-Host ""
