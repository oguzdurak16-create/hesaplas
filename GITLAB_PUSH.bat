@echo off
chcp 65001 >nul
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"

set "DEFAULT_REPO=https://gitlab.com/oguzdurak16/hesaplas-com.git"
set "BRANCH=main"
set "GIT_EXE=git"

where git >nul 2>&1
if errorlevel 1 (
  if exist "%LocalAppData%\Programs\Git\cmd\git.exe" set "GIT_EXE=%LocalAppData%\Programs\Git\cmd\git.exe"
  if exist "C:\Program Files\Git\cmd\git.exe" set "GIT_EXE=C:\Program Files\Git\cmd\git.exe"
  if exist "%~dp0PortableGit\cmd\git.exe" set "GIT_EXE=%~dp0PortableGit\cmd\git.exe"
)

"%GIT_EXE%" --version >nul 2>&1
if errorlevel 1 (
  echo [HATA] Git bulunamadi. Git for Windows kurulu olmali.
  pause
  exit /b 1
)

"%GIT_EXE%" config --global --add safe.directory "%CD%" >nul 2>&1
if not exist ".git" "%GIT_EXE%" init
"%GIT_EXE%" config user.name "oguzdurak16"
"%GIT_EXE%" config user.email "oguzdurak16@gmail.com"
"%GIT_EXE%" branch -M %BRANCH%

for /f "delims=" %%R in ('"%GIT_EXE%" remote get-url origin 2^>nul') do set "REPO_URL=%%R"
if not defined REPO_URL set "REPO_URL=%DEFAULT_REPO%"

"%GIT_EXE%" remote get-url origin >nul 2>&1
if errorlevel 1 (
  "%GIT_EXE%" remote add origin "%REPO_URL%"
) else (
  "%GIT_EXE%" remote set-url origin "%REPO_URL%"
)

echo.
echo Repo   : %REPO_URL%
echo Branch : %BRANCH%
echo.

"%GIT_EXE%" add .
"%GIT_EXE%" diff --cached --quiet
if errorlevel 1 (
  set "COMMIT_MESSAGE=Hesaplas v4.4 yeni arayuz ve 48 arac"
  set /p "CUSTOM_MESSAGE=Commit mesaji [%COMMIT_MESSAGE%]: "
  if defined CUSTOM_MESSAGE set "COMMIT_MESSAGE=!CUSTOM_MESSAGE!"
  "%GIT_EXE%" commit -m "!COMMIT_MESSAGE!"
  if errorlevel 1 (
    echo [HATA] Yerel commit olusturulamadi.
    pause
    exit /b 1
  )
) else (
  echo Yerelde yeni degisiklik yok.
)

"%GIT_EXE%" fetch origin %BRANCH% >nul 2>&1
if not errorlevel 1 (
  "%GIT_EXE%" merge origin/%BRANCH% --allow-unrelated-histories -X ours --no-edit
  if errorlevel 1 (
    echo [HATA] Uzak main gecmisi birlestirilemedi. Cakismalari kontrol edin.
    pause
    exit /b 1
  )
)

"%GIT_EXE%" push -u origin %BRANCH%
if errorlevel 1 (
  echo.
  echo [HATA] Push tamamlanamadi. GitLab girisi veya erisim tokeni gerekebilir.
  pause
  exit /b 1
)

echo.
echo [TAMAM] Proje GitLab main dalina gonderildi.
pause
