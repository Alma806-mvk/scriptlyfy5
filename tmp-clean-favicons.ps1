$names = @(
  'apple-touch-startup-image-1125x2436.png','apple-touch-startup-image-1136x640.png','apple-touch-startup-image-1170x2532.png','apple-touch-startup-image-1179x2556.png','apple-touch-startup-image-1242x2208.png','apple-touch-startup-image-1242x2688.png','apple-touch-startup-image-1284x2778.png','apple-touch-startup-image-1290x2796.png','apple-touch-startup-image-1334x750.png','apple-touch-startup-image-1488x2266.png','apple-touch-startup-image-1536x2048.png','apple-touch-startup-image-1620x2160.png','apple-touch-startup-image-1640x2160.png','apple-touch-startup-image-1668x2224.png','apple-touch-startup-image-1668x2388.png','apple-touch-startup-image-1792x828.png','apple-touch-startup-image-2048x1536.png','apple-touch-startup-image-2048x2732.png','apple-touch-startup-image-2160x1620.png','apple-touch-startup-image-2160x1640.png','apple-touch-startup-image-2208x1242.png','apple-touch-startup-image-2224x1668.png','apple-touch-startup-image-2266x1488.png','apple-touch-startup-image-2388x1668.png','apple-touch-startup-image-2436x1125.png','apple-touch-startup-image-2532x1170.png','apple-touch-startup-image-2556x1179.png','apple-touch-startup-image-2688x1242.png','apple-touch-startup-image-2732x2048.png','apple-touch-startup-image-2778x1284.png','apple-touch-startup-image-2796x1290.png','apple-touch-startup-image-640x1136.png','apple-touch-startup-image-750x1334.png','apple-touch-startup-image-828x1792.png',
  'apple-touch-icon-1024x1024.png','apple-touch-icon-114x114.png','apple-touch-icon-120x120.png','apple-touch-icon-144x144.png','apple-touch-icon-152x152.png','apple-touch-icon-167x167.png','apple-touch-icon-57x57.png','apple-touch-icon-60x60.png','apple-touch-icon-72x72.png','apple-touch-icon-76x76.png','apple-touch-icon-precomposed.png','apple-touch-icon.png',
  'android-chrome-36x36.png','android-chrome-72x72.png','android-chrome-96x96.png','android-chrome-144x144.png','android-chrome-256x256.png','android-chrome-384x384.png',
  'mstile-310x150.png','mstile-310x310.png','mstile-70x70.png','yandex-browser-50x50.png','yandex-browser-manifest.json','favicons.html'
)
foreach ($n in $names) {
  $p = Join-Path '.\public\favicons' $n
  if (Test-Path $p) {
    Write-Host "Removing $n"
    Remove-Item $p -Force
  }
}
Write-Host 'Cleanup finished'
