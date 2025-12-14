# codex-playground

## Running the Android sample locally

### Prerequisites
- Android Studio Jellyfish or newer with the Android SDK platform for API level 34 installed.
- A configured Android emulator or a physical device with USB debugging enabled.
- JDK 17 (bundled with current Android Studio releases).
- Optional: the command-line `gradle` tool (version 8.4 or newer) if you prefer building without Android Studio.

### Run with Android Studio (recommended)
1. Open the project folder (`File > Open...` and select this repository root).
2. Let Android Studio download the Gradle wrapper and sync dependencies if prompted.
3. Create or select an emulator, or connect a device.
4. Click **Run** or use **Run > Run 'app'** to install and launch the sample.

### Run from the command line
1. Ensure the `ANDROID_HOME`/`ANDROID_SDK_ROOT` environment variable points to your Android SDK and that platform tools are on your `PATH`.
2. Install Gradle 8.4+ if you do not want to use Android Studio.
3. From the project root, build the debug APK:
   ```bash
   gradle assembleDebug
   ```
4. To install on a connected device or emulator, use:
   ```bash
   adb install -r app/build/outputs/apk/debug/app-debug.apk
   ```
