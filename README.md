# Change log

**NOTE**: All template versions have been made for Godot 4; they will not work for Godot 3 projects.

**v1**
Modified APK from Godot 4.x template

I don't know the exactly version, but I've downloaded and extracted the original template from the Godot site or GitHub, then applied some changes to the original template.

What I've changed:
- Smali injection to remove activity status bar

[More info](./template-setup.md)

**v2**
Added build script

The build script is responsible for getting game.zip (exported by Godot), extracting, and injecting it into the final APK.

**v3**
Modified template APK

I replaced the old icon with a new customized icon due to problems related to adaptive icons not being supported by Apk64.
To solve the problem, the new icon is placed in @drawable/ic_launcher, and it works nicely with "apk64.replaceAppIcon".

**v4**
Splitted apk libs

The .so libraries have been split for each architecture, so you can include only the desired libraries to reduce space consumption and build the APK faster.

**v5**
Updated to godot 4.3.

It can also run Godot 4.2 projects, but I don't know if it will be stable for all features.
