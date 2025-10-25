# AR E-commerce Platform - Quick Start

Write-Host "🚀 Starting AR E-commerce Platform..." -ForegroundColor Green

# Check if MongoDB is running
Write-Host "`n📦 Checking MongoDB connection..." -ForegroundColor Yellow
try {
    $mongoTest = mongo --eval "db.version()" --quiet 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ MongoDB is running" -ForegroundColor Green
    } else {
        Write-Host "⚠️  MongoDB is not running. Please start MongoDB first." -ForegroundColor Red
        Write-Host "Run: net start MongoDB" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "⚠️  MongoDB is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Start Backend
Write-Host "`n🔧 Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Backend; Write-Host 'Backend Server Starting...' -ForegroundColor Green; npm start"

# Wait for backend to start
Write-Host "⏳ Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Start Frontend
Write-Host "`n🎨 Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Frontend; Write-Host 'Frontend Server Starting...' -ForegroundColor Green; npm run dev"

Write-Host "`n✅ All servers started!" -ForegroundColor Green
Write-Host "`n📍 Application URLs:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "   Admin:    http://localhost:5173/admin" -ForegroundColor White
Write-Host "`n📝 Default Admin Credentials:" -ForegroundColor Cyan
Write-Host "   Email: admin@agroreach.com" -ForegroundColor White
Write-Host "   Password: Admin@123" -ForegroundColor White
Write-Host "`n⚠️  Note: Create admin user if not exists: cd Backend && npm run create-admin" -ForegroundColor Yellow
Write-Host "`n🛑 Press Ctrl+C in each window to stop servers`n" -ForegroundColor Red
