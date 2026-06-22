$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
$out = Join-Path $PSScriptRoot "..\public\images"

$map = [ordered]@{
  "hero.jpg" = @{ tags = "house,architecture,luxury,wood"; lock = 1 }
  "intro-catalog.jpg" = @{ tags = "kitchen,modern,interior"; lock = 2 }
  "catalog\ostrov-tortsevaya-stoleshnitsa.jpg" = @{ tags = "kitchen,island,wood"; lock = 10 }
  "catalog\falsh-panel-kholodilnik.jpg" = @{ tags = "kitchen,builtin,appliance"; lock = 11 }
  "catalog\stol-transformer.jpg" = @{ tags = "dining,table,wood"; lock = 12 }
  "catalog\barnaya-stoyka.jpg" = @{ tags = "bar,counter,interior"; lock = 13 }
  "catalog\navesnye-shkafy-yasen.jpg" = @{ tags = "kitchen,cabinet,wood"; lock = 14 }
  "catalog\stellaz-lestnitsa.jpg" = @{ tags = "shelf,wood,furniture"; lock = 20 }
  "catalog\shkaf-kupe-radius.jpg" = @{ tags = "wardrobe,closet,bedroom"; lock = 21 }
  "catalog\penal-prihozhaya.jpg" = @{ tags = "hallway,storage,shoes"; lock = 22 }
  "catalog\komod-yashchiki.jpg" = @{ tags = "dresser,drawer,wood"; lock = 23 }
  "catalog\vitrina-kollektsii.jpg" = @{ tags = "display,cabinet,glass"; lock = 24 }
  "catalog\dver-nevidimka.jpg" = @{ tags = "door,interior,minimal"; lock = 30 }
  "catalog\paneli-3d-reshetka.jpg" = @{ tags = "wood,wall,panel"; lock = 31 }
  "catalog\portal-kamin.jpg" = @{ tags = "fireplace,living,wood"; lock = 32 }
  "catalog\lestnitsa-boltz.jpg" = @{ tags = "staircase,wood,interior"; lock = 33 }
  "catalog\karniz-pilyastry.jpg" = @{ tags = "living,classic,interior"; lock = 34 }
  "catalog\shkatulka-organayzer.jpg" = @{ tags = "wooden,box,craft"; lock = 40 }
  "catalog\doski-end-grain.jpg" = @{ tags = "cutting,board,kitchen"; lock = 41 }
  "catalog\podstavka-noutbuk.jpg" = @{ tags = "desk,laptop,wood"; lock = 42 }
  "catalog\konstruktor-igrushki.jpg" = @{ tags = "wooden,toy,blocks"; lock = 43 }
  "catalog\ramka-zerkalo.jpg" = @{ tags = "mirror,frame,bathroom"; lock = 44 }
  "catalog\skameyka-sad.jpg" = @{ tags = "garden,bench,park"; lock = 50 }
  "catalog\stol-piknik.jpg" = @{ tags = "picnic,outdoor,table"; lock = 51 }
  "catalog\kacheli-divan.jpg" = @{ tags = "porch,swing,outdoor"; lock = 52 }
  "catalog\podstavka-kashpo.jpg" = @{ tags = "plant,pot,stand"; lock = 53 }
  "catalog\terrasnaya-doska.jpg" = @{ tags = "deck,terrace,wood"; lock = 54 }
}

function Save-Image($url, $dest) {
  $dir = Split-Path $dest -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  curl.exe -sL -A $ua -o $dest $url
  return (Test-Path $dest) -and (Get-Item $dest).Length -gt 30000
}

foreach ($entry in $map.GetEnumerator()) {
  $dest = Join-Path $out $entry.Key
  $tags = $entry.Value.tags
  $lock = $entry.Value.lock
  $url = "https://loremflickr.com/1400/900/$tags/all?lock=$lock"
  Write-Host "-> $($entry.Key)"
  if (-not (Save-Image $url $dest)) {
    Write-Warning "FAIL $($entry.Key)"
  }
  Start-Sleep -Milliseconds 400
}

Remove-Item (Join-Path $out "catalog\_test.jpg") -ErrorAction SilentlyContinue
Remove-Item (Join-Path $out "catalog\_test2.jpg") -ErrorAction SilentlyContinue

Write-Host "`nDuplicate check:"
$hashes = Get-ChildItem (Join-Path $out "catalog\*.jpg") | ForEach-Object {
  [PSCustomObject]@{ Name = $_.Name; Hash = (Get-FileHash $_.FullName -Algorithm MD5).Hash; Size = $_.Length }
}
$hashes | Group-Object Hash | Where-Object { $_.Count -gt 1 } | ForEach-Object {
  Write-Warning ($_.Group.Name -join ", ")
}
if (-not ($hashes | Group-Object Hash | Where-Object { $_.Count -gt 1 })) {
  Write-Host "All catalog images are unique."
}
