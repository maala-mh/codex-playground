# codex-playground

## Running the Android sample locally

### Prerequisites
- Android Studio Jellyfish or newer with the Android SDK platform for API level 34 installed.
- A configured Android emulator or a physical device with USB debugging enabled.
- JDK 17 (bundled with current Android Studio releases).
- Optional: the command-line `gradle` tool (version 8.4 or newer) if you prefer building without Android Studio.

### Project setup
1. Clone the repository and open a terminal in the project root.
2. If you're using the command line, make the Gradle wrapper executable on first use:
   ```bash
   chmod +x gradlew
   ```
3. Ensure your Android SDK is installed and `ANDROID_HOME`/`ANDROID_SDK_ROOT` are set so the build tools are available.

### Run with Android Studio (recommended)
1. Open the project folder (`File > Open...` and select this repository root).
2. Let Android Studio download the Gradle wrapper and sync dependencies if prompted.
3. Create or select an emulator, or connect a device.
4. Click **Run** or use **Run > Run 'app'** to install and launch the sample.

### Run from the command line
1. Ensure the `ANDROID_HOME`/`ANDROID_SDK_ROOT` environment variable points to your Android SDK and that platform tools are on your `PATH`.
2. Install Gradle 8.4+ if you do not want to use Android Studio (otherwise, use the wrapper shown below).
3. Build the debug APK from the project root with the wrapper:
   ```bash
   ./gradlew assembleDebug
   ```
4. Install the APK on a running emulator or connected device:
   ```bash
   ./gradlew installDebug
   ```
   If you prefer using `adb`, you can also run:
   ```bash
   adb install -r app/build/outputs/apk/debug/app-debug.apk
   ```
5. Launch the **Codex Playground** app from the device or emulator home screen and verify it starts without crashes.
