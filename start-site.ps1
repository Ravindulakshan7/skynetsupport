$ErrorActionPreference = 'Stop'
node (Join-Path $PSScriptRoot 'serve.cjs')
