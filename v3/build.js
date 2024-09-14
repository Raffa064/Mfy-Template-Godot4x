var gameZip = null

if (mfy.dialog) // Check for android interface implementation
  gameZip = mfy.dialog.requestFile("game.zip", "zip") // import assets from dialog (choose by user)
else
  gameZip = mfy.file("game.zip") // import assets from project dir 
  
if (gameZip.exists()) {
  const assets = mfy.file(".assets")
  mfy.delete(assets) // Ensure that assets dir it doesn't exists
  
  mfy.extract(gameZip, assets)

  apk64.addToAssets(assets.listFiles())

  mfy.delete(assets) // clear trash
} else console.log("Can't apply template: game.zip not found")
