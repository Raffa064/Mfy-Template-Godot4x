# How to build godot template

First of all, you'll need to download the latest godot export templates. It's a big file, but we don't worry, we'll need only one file that's zipped inside it.

You can found the **godot export templates** in their Github releases section, or in their website downloads section:
[Godot releases](https://github.com/godotengine/godot/releases/)
[Godot website](https://godotengine.org/download/linux/)
- Note: The desired file ends with ".tpz" or ".zip", and it's size is up to 800Mb

After installed the export templates, extract from it the file named "android_release.apk", after it's done, you can delete the export templates.

## Step 1.1: StatusBar issue

The first modding step, is to solve status bar issue. Using the original godot template causes an persistent status bar, and the only way to solve it, is by modding the app.

This mod consists on a Smali injection. The easied way to do it, is to decompile the "android_release.apk" using some tool like Apk Editor, Apk Tool M, MT Manager, or Show Java.

The process to do it can vary depending by the tool, but you are looking for the class com.godot.game.GodotApp, that's the *application main activity*.

After done it, you will need to get the java code of this class. I think "Show Java" is the best for this porporse.

Anyway, you'll found something like this:

ˋˋˋjava
package com.godot.game;

import android.os.Bundle;
import org.godotengine.godot.GodotActivity;

public class GodotApp extends GodotActivity {
    public void onCreate(Bundle bundle) {
        setTheme(R.style.GodotAppMainTheme);
        super.onCreate(bundle);
    }
}
ˋˋˋ

## Step 1.2:

We need to inject the following code into the onCreate method:

ˋˋˋjava
public void onCreate(Bundle bundle) {
  setTheme(R.style.GodotAppMainTheme);
  super.onCreate(bundle);
  
  // Remove statusbar code
  getWindow().setFlags(1024, 1024);
  ActionBar actionBar = getActionBar();
  if (actionBar != null) {
    actionBar.hide();
  }
}
ˋˋˋ

Ok, now we need to trasnlate it into smali, and the easiest and tricky way I found to do it (without needing to compile into a separated project), is to asking for the smali version of the code to ChatGPT. I don't recommend passing the entire code, because the AI can make more mistakes at this way. Instead of it, just ask for the *onCreate* method in smali, and replace it in the original apk file, using ApkEditor, ApkTool M or MT Manager.

- *NOTE:* Is recommended to known at least the basics of smali to do it, because the AI mistakes can crash the app.

The final onCreate method smali may looks like:

ˋˋˋsmali 
# virtual methods
.method public onCreate(Landroid/os/Bundle;)V
    .registers 9

    .line 44
    sget v0, Lcom/godot/game/R$style;->GodotAppMainTheme:I

    invoke-virtual {p0, v0}, Lcom/godot/game/GodotApp;->setTheme(I)V

    .line 45
    invoke-super {p0, p1}, Lorg/godotengine/godot/GodotActivity;->onCreate(Landroid/os/Bundle;)V

    .line 46
    invoke-virtual {p0}, Lcom/godot/game/GodotApp;->getWindow()Landroid/view/Window;

    move-result-object v1

    const/16 v2, 0x400

    const/16 v3, 0x400

    invoke-virtual {v1, v2, v3}, Landroid/view/Window;->setFlags(II)V

    .line 47
    invoke-virtual {p0}, Lcom/godot/game/GodotApp;->getActionBar()Landroid/app/ActionBar;

    move-result-object v4

    if-eqz v4, :cond_0

    invoke-virtual {v4}, Landroid/app/ActionBar;->hide()V

    :cond_0
    return-void
.end method
ˋˋˋ

I'll not enter in details of how to insert it into the apk file, because it depends of what tool you're using. But, basicly, you just need to replace the old onCreate to the new onCreate (in smali).

## Step 2: Replace Adaptive Icon 

The original godot template uses an adaptive icon, that's not compatible with the current version of [Apk64](https://github.com/Raffa064/Apk64). I means, that is not possible to change the template icon with Modify.

To solve this problem, I've used ApkEditor to change the icon from mipmaps to drawable resource dir.

There is how:
- Open our modified template with ApkEditor (Full Edit/Partial Files)
- Navigate to files tab, and open the res/drawable directory
- Click at the "+" button to import a file, then choose some image file to be the app icon (Take caution with the name of the file, must be shorter as possible, without spacial characters)
- Go to manifest tab, and inside it, chnage the android:icon field to pointo to your new icon. Ex: "@drawable/<name_of_your_file>" (don't use extension)
- Build it

The generateed file must be located at:

ˋˋˋ/storage/emulated/0/ApkEditor/gen_signed.apkˋˋˋ

## Finished
After theses step, your template apk file is finished, you'll just need to pack it into a template structure and import it into Modify app
