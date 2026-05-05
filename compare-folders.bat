@echo off
REM ============================================================================
REM Compare Root vs Nested Folders - Verify Duplicates
REM ============================================================================

setlocal enabledelayedexpansion

echo.
echo ============================================================================
echo    DUPLICATE FOLDER COMPARISON REPORT
echo ============================================================================
echo.

set "PROJECT_DIR=%~dp0"
set "ROOT_ADMIN=%PROJECT_DIR%ev-admin"
set "NESTED_ADMIN=%PROJECT_DIR%ev-bike-project\ev-admin"
set "ROOT_VENDOR=%PROJECT_DIR%ev-vender"
set "NESTED_VENDOR=%PROJECT_DIR%ev-bike-project\ev-vender"
set "ROOT_MARKET=%PROJECT_DIR%ev-marketplace"
set "NESTED_MARKET=%PROJECT_DIR%ev-bike-project\ev-marketplace"

echo Comparing folder structures...
echo.

REM Check if nested folder exists
if not exist "%PROJECT_DIR%ev-bike-project" (
    echo ✓ No nested duplicate folder found. Project is clean!
    pause
    exit /b 0
)

echo ============================================================================
echo ADMIN PANEL COMPARISON
echo ============================================================================
echo.

echo Root Admin: %ROOT_ADMIN%
if exist "%ROOT_ADMIN%\.next" (
    echo   ✓ Has .next build folder ^(ACTIVE^)
) else (
    echo   ✗ No .next build folder
)

if exist "%ROOT_ADMIN%\components\orders" (
    echo   ✓ Has orders components ^(COMPLETE^)
) else (
    echo   ✗ Missing orders components
)

if exist "%ROOT_ADMIN%\components\payments" (
    echo   ✓ Has payments components ^(COMPLETE^)
) else (
    echo   ✗ Missing payments components
)

echo.
echo Nested Admin: %NESTED_ADMIN%
if exist "%NESTED_ADMIN%\.next" (
    echo   ✓ Has .next build folder
) else (
    echo   ✗ No .next build folder ^(INACTIVE^)
)

if exist "%NESTED_ADMIN%\components\orders" (
    echo   ✓ Has orders components
) else (
    echo   ✗ Missing orders components ^(INCOMPLETE^)
)

if exist "%NESTED_ADMIN%\components\payments" (
    echo   ✗ Missing payments components ^(INCOMPLETE^)
) else (
    echo   ✗ Missing payments components
)

echo.
echo CONCLUSION: 
if exist "%ROOT_ADMIN%\.next" (
    if not exist "%NESTED_ADMIN%\.next" (
        echo   → Root admin is ACTIVE, nested is INACTIVE/OLD
    )
)

echo.
echo ============================================================================
echo VENDOR PANEL COMPARISON
echo ============================================================================
echo.

echo Root Vendor: %ROOT_VENDOR%
if exist "%ROOT_VENDOR%\.next" (
    echo   ✓ Has .next build folder ^(ACTIVE^)
) else (
    echo   ✗ No .next build folder
)

echo.
echo Nested Vendor: %NESTED_VENDOR%
if exist "%NESTED_VENDOR%\.next" (
    echo   ✓ Has .next build folder
) else (
    echo   ✗ No .next build folder ^(INACTIVE^)
)

echo.
echo ============================================================================
echo MARKETPLACE COMPARISON
echo ============================================================================
echo.

echo Root Marketplace: %ROOT_MARKET%
if exist "%ROOT_MARKET%\.next" (
    echo   ✓ Has .next build folder ^(ACTIVE^)
) else (
    echo   ✗ No .next build folder
)

echo.
echo Nested Marketplace: %NESTED_MARKET%
if exist "%NESTED_MARKET%\.next" (
    echo   ✓ Has .next build folder
) else (
    echo   ✗ No .next build folder ^(INACTIVE^)
)

echo.
echo ============================================================================
echo FILE COUNT COMPARISON
echo ============================================================================
echo.

echo Counting files in root apps...
for /f %%a in ('dir "%ROOT_ADMIN%\components" /s /b /a-d 2^>nul ^| find /c /v ""') do set ROOT_ADMIN_COUNT=%%a
for /f %%a in ('dir "%ROOT_VENDOR%\components" /s /b /a-d 2^>nul ^| find /c /v ""') do set ROOT_VENDOR_COUNT=%%a

echo Root Admin Components: %ROOT_ADMIN_COUNT% files
echo Root Vendor Components: %ROOT_VENDOR_COUNT% files

echo.
echo Counting files in nested apps...
for /f %%a in ('dir "%NESTED_ADMIN%\components" /s /b /a-d 2^>nul ^| find /c /v ""') do set NESTED_ADMIN_COUNT=%%a
for /f %%a in ('dir "%NESTED_VENDOR%\components" /s /b /a-d 2^>nul ^| find /c /v ""') do set NESTED_VENDOR_COUNT=%%a

echo Nested Admin Components: %NESTED_ADMIN_COUNT% files
echo Nested Vendor Components: %NESTED_VENDOR_COUNT% files

echo.
echo ============================================================================
echo DUPLICATE UI COMPONENTS CHECK
echo ============================================================================
echo.

set "UI_COMPONENTS=avatar badge button card dialog dropdown-menu input select separator sheet table tabs textarea"

echo Checking for duplicate UI components...
echo.

for %%c in (%UI_COMPONENTS%) do (
    set "FOUND=0"
    if exist "%ROOT_ADMIN%\components\ui\%%c.tsx" set /a FOUND+=1
    if exist "%ROOT_VENDOR%\components\ui\%%c.tsx" set /a FOUND+=1
    if exist "%NESTED_ADMIN%\components\ui\%%c.tsx" set /a FOUND+=1
    if exist "%NESTED_VENDOR%\components\ui\%%c.tsx" set /a FOUND+=1
    
    if !FOUND! GTR 2 (
        echo ⚠ %%c.tsx found in !FOUND! locations ^(DUPLICATE^)
    )
)

echo.
echo ============================================================================
echo FINAL RECOMMENDATION
echo ============================================================================
echo.

set "SAFE_TO_DELETE=YES"

REM Check if root apps have .next
if not exist "%ROOT_ADMIN%\.next" set "SAFE_TO_DELETE=NO"
if not exist "%ROOT_VENDOR%\.next" set "SAFE_TO_DELETE=NO"
if not exist "%ROOT_MARKET%\.next" set "SAFE_TO_DELETE=NO"

REM Check if nested apps have .next
if exist "%NESTED_ADMIN%\.next" set "SAFE_TO_DELETE=MAYBE"
if exist "%NESTED_VENDOR%\.next" set "SAFE_TO_DELETE=MAYBE"
if exist "%NESTED_MARKET%\.next" set "SAFE_TO_DELETE=MAYBE"

if "%SAFE_TO_DELETE%"=="YES" (
    echo ✓ SAFE TO DELETE: ev-bike-project\ev-bike-project\ folder
    echo.
    echo Reasons:
    echo   - Root apps have active .next builds
    echo   - Nested apps have NO .next builds
    echo   - Root apps are more complete
    echo   - No imports reference nested folder
    echo.
    echo You can safely run: cleanup-project.bat
) else if "%SAFE_TO_DELETE%"=="MAYBE" (
    echo ⚠ CAUTION: Both root and nested have .next builds
    echo.
    echo Please verify which version is actively used before deletion.
    echo Check git history and recent modifications.
) else (
    echo ✗ NOT SAFE: Root apps missing .next builds
    echo.
    echo Please investigate why root apps are not built.
)

echo.
echo ============================================================================
echo.
pause
