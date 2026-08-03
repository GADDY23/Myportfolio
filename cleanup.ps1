# Cleanup orphaned CSS blocks from app.css
# Removes 4 line ranges (1-based, inclusive) determined from the current file:
#   4656-4681  -> Tech Badges (.tech-badges / .tech-badge / .tech-badge:hover)
#   4854-4938  -> Quest (old-design .quest-* styles)
#   4991-4999  -> Navbar responsive in @media max-width:900px (.dashboard-topbar / .dash-spacer)
#   5003-5009  -> Navbar responsive in @media max-width:640px (.dash-back-btn / .dash-kicker)
$path = 'c:\laragon\www\portfolio\resources\css\app.css'
$lines = Get-Content -Path $path -Encoding UTF8

# Ranges are processed bottom-up so earlier line numbers stay valid.
$ranges = @(
    @(5003, 5009),
    @(4991, 4999),
    @(4854, 4938),
    @(4656, 4681)
)

$removed = @()
foreach ($r in $ranges) {
    $start = $r[0]
    $end = $r[1]
    $s = $start - 1
    $e = $end - 1
    for ($i = $s; $i -le [Math]::Min($e, $lines.Length - 1); $i++) {
        $removed += $lines[$i]
    }
    $keep = @()
    for ($i = 0; $i -lt $lines.Length; $i++) {
        if ($i -lt $s -or $i -gt $e) {
            $keep += $lines[$i]
        }
    }
    $lines = $keep
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($path, $lines, $utf8NoBom)

Write-Host 'Removed ranges:'
foreach ($r in $ranges) { Write-Host ("  {0}-{1}" -f $r[0], $r[1]) }
Write-Host ("New line count: {0}" -f $lines.Length)

