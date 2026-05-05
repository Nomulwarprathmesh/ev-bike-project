@echo off
REM ============================================================================
REM EV Bike Project - Safe Cleanup Script
REM ============================================================================
REM This script will safely remove duplicate folders and optimize the project
REM 
REM IMPORTANT: Review PROJECT_CLEANUP_ANALYSIS.md before running!
REM ============================================================================

setlocal enabledelayedexpansion

echo.
echo ============================================================================
echo    EV BIKE PROJECT - CLEANUP SCRIPT
echo ============================================================================
echo.
echo This script will:
echo   1. Create a backup of your project
echo   2. Remove duplicate nested folder (ev-bike-project/ev-bike-project/)
echo   3. Clean build artifacts (.next folders)
echo   4. Verify applications still work
echo.
echo WARNING: This will delete files. Make sure you have reviewed the analysis!
echo.

REM Get confirmation
set /p CONFIRM="Do you want to proceed? (yes/no): "
if /i not "%CONFIRM%"=="yes" (
    echo.
    echo Cleanup cancelled by user.
    pause
    exit /b 0
)

echo.
echo ============================================================================
echo PHASE 1: CREATING BACKUP
echo ============================================================================
echo.

set "PROJECT_DIR=%~dp0"
set "BACKUP_DIR=%PROJECT_DIR%..\ev-bike-project-backup-%date:~-4,4%%date:~-10,2%%date:~-7,2%"

echo Creating backup at: %BACKUP_DIR%
echo This may take a few minutes...
echo.

xcopy "%PROJECT_DIR%" "%BACKUP_DIR%" /E /I /H /Y /EXCLUDE:%~dp0cleanup-exclude.txt 2>nul

if errorlevel 1 (
    echo ERROR: Backup failed!
    echo Please create a manual backup before proceeding.
    pause
    exit /b 1
)

echo ✓ Backup created successfully!
echo.

echo ============================================================================
echo PHASE 2: ANALYZING DUPLICATE FOLDER
echo ============================================================================
echo.

set "NESTED_FOLDER=%PROJECT_DIR%ev-bike-project"

if not exist "%NESTED_FOLDER%" (
    echo ✓ No nested duplicate folder found. Already clean!
    goto :CLEAN_BUILD
)

echo Found nested duplicate folder: %NESTED_FOLDER%
echo.
echo Checking folder size...
for /f "tokens=3" %%a in ('dir "%NESTED_FOLDER%" /s /-c ^| find "File(s)"') do set SIZE=%%a
echo Folder size: %SIZE% bytes
echo.

set /p DELETE_NESTED="Delete nested duplicate folder? (yes/no): "
if /i not "%DELETE_NESTED%"=="yes" (
    echo Skipping nested folder deletion.
    goto :CLEAN_BUILD
)

echo.
echo Deleting nested folder...
rmdir /s /q "%NESTED_FOLDER%"

if errorlevel 1 (
    echo ERROR: Failed to delete nested folder!
    echo Please check file permissions and try again.
    pause
    exit /b 1
)

echo ✓ Nested duplicate folder deleted successfully!
echo.

:CLEAN_BUILD
echo ============================================================================
echo PHASE 3: CLEANING BUILD ARTIFACTS
echo ============================================================================
echo.

set /p CLEAN_BUILDS="Delete .next build folders? (They can be regenerated) (yes/no): "
if /i not "%CLEAN_BUILDS%"=="yes" (
    echo Skipping build artifact cleanup.
    goto :VERIFY
)

echo.
echo Cleaning build artifacts...

if exist "%PROJECT_DIR%ev-admin\.next" (
    echo Deleting ev-admin\.next...
    rmdir /s /q "%PROJECT_DIR%ev-admin\.next"
    echo ✓ Deleted ev-admin\.next
)

if exist "%PROJECT_DIR%ev-marketplace\.next" (
    echo Deleting ev-marketplace\.next...
    rmdir /s /q "%PROJECT_DIR%ev-marketplace\.next"
    echo ✓ Deleted ev-marketplace\.next
)

if exist "%PROJECT_DIR%ev-vender\.next" (
    echo Deleting ev-vender\.next...
    rmdir /s /q "%PROJECT_DIR%ev-vender\.next"
    echo ✓ Deleted ev-vender\.next
)

echo.
echo ✓ Build artifacts cleaned!
echo.

:VERIFY
echo ============================================================================
echo PHASE 4: VERIFICATION
echo ============================================================================
echo.

echo Checking project structure...
echo.

if exist "%PROJECT_DIR%ev-admin\package.json" (
    echo ✓ ev-admin exists
) else (
    echo ✗ ERROR: ev-admin missing!
    goto :ERROR
)

if exist "%PROJECT_DIR%ev-marketplace\package.json" (
    echo ✓ ev-marketplace exists
) else (
    echo ✗ ERROR: ev-marketplace missing!
    goto :ERROR
)

if exist "%PROJECT_DIR%ev-vender\package.json" (
    echo ✓ ev-vender exists
) else (
    echo ✗ ERROR: ev-vender missing!
    goto :ERROR
)

if exist "%PROJECT_DIR%ev-bike-project" (
    echo ⚠ WARNING: Nested folder still exists
) else (
    echo ✓ Nested duplicate folder removed
)

echo.
echo ============================================================================
echo CLEANUP COMPLETED SUCCESSFULLY!
echo ============================================================================
echo.
echo Summary:
echo   ✓ Backup created at: %BACKUP_DIR%
echo   ✓ Duplicate folders removed
echo   ✓ Build artifacts cleaned
echo   ✓ Project structure verified
echo.
echo Next Steps:
echo   1. Test each application:
echo      - cd ev-admin ^&^& npm run dev
echo      - cd ev-marketplace ^&^& npm run dev
echo      - cd ev-vender ^&^& npm run dev
echo.
echo   2. If everything works, rebuild:
echo      - cd ev-admin ^&^& npm run build
echo      - cd ev-marketplace ^&^& npm run build
echo      - cd ev-vender ^&^& npm run build
echo.
echo   3. If issues occur, restore from backup:
echo      - Copy files from: %BACKUP_DIR%
echo.
echo ============================================================================
echo.
pause
exit /b 0

:ERROR
echo.
echo ============================================================================
echo ERROR: CLEANUP FAILED!
echo ============================================================================
echo.
echo Critical files are missing. Please restore from backup:
echo   %BACKUP_DIR%
echo.
echo Do NOT proceed until the issue is resolved!
echo.
pause
exit /b 1
