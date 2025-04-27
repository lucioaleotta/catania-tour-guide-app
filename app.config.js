export default () => ({
    expo: {
      name: "catania-tour-guide-app",
      slug: "catania-tour-guide-app",
      newArchEnabled: true,
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "light",
      splash: {
        image: "./assets/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      },
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.trevoo.cataniatourguide",
        config: {
          googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY_IOS
        }
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff"
        },
        package: "com.trevoo.cataniatourguide",
        config: {
          googleMaps: {
            apiKey: process.env.GOOGLE_MAPS_API_KEY_ANDROID
          }
        }
      },
      web: {
        favicon: "./assets/favicon.png"
      },
      plugins: [
        "expo-localization" // Aggiunto il plugin qui
      ]
    }
  });