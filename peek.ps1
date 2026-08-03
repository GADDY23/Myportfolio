param([int]$Start = 1, [int]$End = 10)
$c = Get-Content 'c:\laragon\www\portfolio\resources\css\app.css'
for ($i = $Start; $i -le $End; $i++) {
    if ($i -le $c.Length) {
        '{0}: {1}' -f $i, $c[$i - 1]
    }
}

