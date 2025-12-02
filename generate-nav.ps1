# Generate navigation.yml from categories folder structure
# Usage: .\generate-nav.ps1

$categoriesPath = Join-Path $PSScriptRoot "categories"
$outputPath = Join-Path (Join-Path $PSScriptRoot "_data") "navigation.yml"

# Create output directory if it doesn't exist
$outputDir = Split-Path $outputPath
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
    Write-Host "Created directory: $outputDir"
}

function Get-FrontMatter {
    param([string]$FilePath)
    
    $content = Get-Content $FilePath -Raw
    $match = $content -match '(?s)^---\s*(.*?)\s*---'
    
    if (-not $match) {
        return $null
    }
    
    $frontmatter = $matches[1]
    $data = @{}
    
    foreach ($line in $frontmatter -split "`n") {
        if ($line -match '^\s*(\w+):\s*(.*)$') {
            $key = $matches[1]
            $value = $matches[2].Trim()
            # Remove quotes if present (simple approach)
            if ($value.StartsWith('"') -and $value.EndsWith('"')) {
                $value = $value.Substring(1, $value.Length - 2)
            }
            $data[$key] = $value
        }
    }
    
    return $data
}

function Get-Permalink {
    param([string]$FilePath, [string]$RelativePath)
    
    # Extract the relative path from categories folder
    $relPath = $RelativePath -replace '^categories[/\\]', ''
    $relPath = $relPath -replace '\.md$', ''
    
    # Build permalink from folder structure
    $parts = $relPath -split '[/\\]'
    $permalink = '/' + ($parts -join '/')
    
    return $permalink
}

# Function to recursively build navigation structure
function New-NavStructure {
    param(
        [string]$Path,
        [string]$ParentCategory = ""
    )
    
    $items = @()
    $processedDirs = @{}
    
    # Get all markdown files in this directory (non-recursive, immediate children only)
    $mdFiles = Get-ChildItem -Path $Path -Filter "*.md" -File -Depth 0 | Sort-Object Name
    
    foreach ($file in $mdFiles) {
        $frontmatter = Get-FrontMatter $file.FullName
        
        if ($frontmatter -and $frontmatter['title']) {
            $relativePath = $file.FullName -replace [regex]::Escape((Get-Item $categoriesPath).FullName), 'categories'
            $permalink = Get-Permalink $file.FullName $relativePath
            
            $category = $frontmatter['category']
            if (-not $category) {
                $category = (Split-Path $Path -Leaf)
            }
            
            $item = @{
                title    = $frontmatter['title']
                url      = $permalink
                category = $category
            }
            
            # Look for a subdirectory that matches the markdown file name
            $baseName = $file.BaseName
            $expectedDirName = $baseName
            
            # Special case for dogs -> dog
            if ($baseName -eq "dogs") {
                $expectedDirName = "dog"
            }
            
            $subDirPath = Join-Path $Path $expectedDirName
            
            if (Test-Path $subDirPath -PathType Container) {
                $processedDirs[$expectedDirName] = $true
                $subItems = New-NavStructure $subDirPath $category
                if ($subItems -and $subItems.Count -gt 0) {
                    $item['children'] = $subItems
                }
            }
            
            $items += $item
        }
    }
    
    # Handle "orphan" directories (directories without a corresponding markdown file)
    # These are likely container folders (e.g., transport/), so we promote their children up
    $subDirs = Get-ChildItem -Path $Path -Directory
    
    foreach ($dir in $subDirs) {
        if (-not $processedDirs.ContainsKey($dir.Name)) {
            $subItems = New-NavStructure $dir.FullName $ParentCategory
            if ($subItems -and $subItems.Count -gt 0) {
                $items += $subItems
            }
        }
    }
    
    return $items
}

# Build the navigation structure
Write-Host "Scanning categories folder: $categoriesPath"
$navItems = New-NavStructure $categoriesPath

if ($navItems.Count -eq 0) {
    Write-Host "Warning: No navigation items found"
    exit 1
}

# Convert to YAML format
function Convert-ToYaml {
    param([array]$Items, [int]$Indent = 0)
    
    $indentStr = ' ' * $Indent
    $childIndent = ' ' * ($Indent + 2)
    $yaml = ""
    
    foreach ($item in $Items) {
        $yaml += "`n$indentStr- title: $($item['title'])"
        $yaml += "`n$childIndent`url: $($item['url'])"
        $yaml += "`n$childIndent`category: $($item['category'])"
        
        if ($item['children']) {
            $yaml += "`n$childIndent`children:"
            $yaml += Convert-ToYaml $item['children'] ($Indent + 4)
        }
    }
    
    return $yaml
}

$yamlContent = "main:"
$yamlContent += Convert-ToYaml $navItems 2

# Write to file
Write-Host "Writing navigation.yml to: $outputPath"
Set-Content -Path $outputPath -Value $yamlContent -Encoding UTF8

Write-Host "Generated navigation.yml with $($navItems.Count) top-level items"
Write-Host ""
Write-Host "Preview of generated navigation.yml:"
Write-Host $('=' * 50)
Write-Host $yamlContent
Write-Host $('=' * 50)
