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

var include_libs = this.include_libs

if (!include_libs)
    include_libs = [ "arm64-v8a", "armeabi-v7a", "x86", "x86_64" ]

// TODO: Ask user for what libs to include

for (let i = 0; i < include_libs.length; i++) {
   let lib_path = "lib/" + include_libs[i]
   
   let source = mfy._template.file(lib_path)
   let target = mfy._build.file(lib_path)
   mfy.copy(source, target)
}
