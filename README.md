# react-native-status-ring

A lightweight and customizable React Native component for displaying a circular image with status indicator arcs (like WhatsApp/Instagram stories). Each arc can represent a "seen" or "unseen" status using solid colors or gradients.

<p align="center">
  <img src="https://github.com/akshayambaliya/images/blob/89bdf4baea1f3cfb682cad27db5d863e6b9439f9/IMG_5380.PNG" width="200" />
  <img src="https://github.com/akshayambaliya/images/blob/89bdf4baea1f3cfb682cad27db5d863e6b9439f9/IMG_5381.PNG" width="200" />
  <img src="https://github.com/akshayambaliya/images/blob/89bdf4baea1f3cfb682cad27db5d863e6b9439f9/IMG_5382.PNG" width="200" />
  <img src="https://github.com/akshayambaliya/images/blob/89bdf4baea1f3cfb682cad27db5d863e6b9439f9/IMG_5383.PNG" width="200" />
</p>

---

## ✨ Features

- Displays a central circular image
- Adds status arcs around the image
- Supports multiple statuses
- Shows seen/unseen distinction
- Supports gradient or solid colors
- Fully customizable radius, spacing, stroke width, and padding

---

## 📦 Installation

Install the package along with its peer dependency `react-native-svg`:

```bash
npm install react-native-status-ring react-native-svg
```

Then, use the component in your project:

```tsx
import React from "react";
import { View } from "react-native";
import Status from "react-native-status-ring";

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Status
        numberOfStatus={5}
        indexOfSeenStatus={3}
        radius={80}
        spacing={10}
        strokeWidth={5}
        padding={10}
        seenColor="#25D366"
        unSeenColor="#808080"
        source={{ uri: "https://example.com/profile.jpg" }}
      />
    </View>
  );
}
```

## 🧩 Props

| Prop                   | Type                   | Default        | Description                                          |
| ---------------------- | ---------------------- | -------------- | ---------------------------------------------------- |
| `numberOfStatus`       | `number`               | — _(required)_ | Total number of arcs to display                      |
| `indexOfSeenStatus`    | `number`               | — _(required)_ | Number of arcs that are marked as "seen"             |
| `source`               | `ImageSourcePropType`  | — _(required)_ | Source for the center image (URL or local file)      |
| `spacing`              | `number`               | `10`           | Degrees of gap between arcs                          |
| `radius`               | `number`               | `80`           | Radius of the outer circle                           |
| `padding`              | `number`               | `10`           | Padding between arcs and the center image            |
| `strokeWidth`          | `number`               | `5`            | Thickness of each arc                                |
| `seenColor`            | `string`               | `#25D366`      | Solid color for arcs marked as "seen"                |
| `unSeenColor`          | `string`               | `#808080`      | Solid color for arcs marked as "unseen"              |
| `seenGradientColors`   | `[string, string]`     | `undefined`    | Gradient for "seen" arcs (overrides `seenColor`)     |
| `unSeenGradientColors` | `[string, string]`     | `undefined`    | Gradient for "unseen" arcs (overrides `unSeenColor`) |
| `containerStyle`       | `StyleProp<ViewStyle>` | `undefined`    | Style for the outer container                        |
