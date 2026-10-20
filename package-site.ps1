param([switch]$SkipBuild)
$ErrorActionPreference = 'Stop'
$siteRoot = $PSScriptRoot
# The live lamp is plain JavaScript. No React build is needed for deployment.
Copy-Item -LiteralPath (Join-Path $siteRoot 'site.html') -Destination (Join-Path $siteRoot 'index.html') -Force
$siteFiles = @('index.html', 'site.html', 'styles.css', 'app.js', 'analytics.js', 'lamp.js', 'lamp.css', 'mobile.css', 'glass.css', 'assets', 'README.md') | ForEach-Object { Join-Path $siteRoot $_ }
Compress-Archive -LiteralPath $siteFiles -DestinationPath (Join-Path $siteRoot 'skynet-site.zip') -Force
Write-Output 'Ready: index.html synchronized and skynet-site.zip created.'
