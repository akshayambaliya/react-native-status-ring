import React, { JSX } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

export interface StatusProps {
  /**
   * The total number of arcs (statuses) to display.
   */
  numberOfStatus: number;

  /**
   * The number of arcs that are marked as "seen".
   * This determines how many arcs will have the "seenColor" or "seenGradientColors" applied.
   */
  indexOfSeenStatus: number;

  /**
   * The space (gaps) between each arc in degrees.
   * This creates a gap to visually distinguish multiple arcs.
   * @default 10
   */
  spacing?: number;

  /**
   * The outer radius of the circular border.
   * This determines the size of the entire outer circle.
   * @default 80
   */
  radius?: number;

  /**
   * The padding around the center image (inside the circular arcs).
   * This determines the space between the arcs and the image.
   * @default 10
   */
  padding?: number;

  /**
   * The stroke width of the arcs.
   * This determines the thickness of each arc.
   * @default 5
   */
  strokeWidth?: number;

  /**
   * The color of the arcs that are marked as "seen".
   * It is used when `seenGradientColors` is not defined.
   * @default "#25D366"
   */
  seenColor?: string;

  /**
   * The color of the arcs that are marked as "unseen".
   * It is used when `unSeenGradientColors` is not defined.
   * @default "#808080"
   */
  unSeenColor?: string;

  /**
   * The gradient colors of the arcs that are marked as "seen".
   * If provided, this overrides the `seenColor` property and applies a gradient.
   */
  seenGradientColors?: [string, string];

  /**
   * The gradient colors of the arcs that are marked as "unseen".
   * If provided, this overrides the `unSeenColor` property and applies a gradient.
   */
  unSeenGradientColors?: [string, string];

  /**
   * Optional style for the container wrapping the component.
   * This allows for customization of the outermost container View (e.g., margins, positioning).
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * The image source (either a remote URL or a local file resource).
   * This is required to render the circular image in the center.
   */
  source: ImageSourcePropType;
}

const Status: React.FC<StatusProps> = ({
  numberOfStatus,
  indexOfSeenStatus,
  spacing = 10,
  radius = 80,
  padding = 10,
  strokeWidth = 5,
  source,
  seenColor = "#25D366",
  unSeenColor = "#808080",
  seenGradientColors,
  unSeenGradientColors,
  containerStyle,
}) => {
  if (!source) {
    console.error("Please provide 'source'. This prop is required.");
    return null;
  }

  const doubleToAngle = (angle: number): number => (angle * Math.PI) / 180.0;

  const createArcPath = (
    centerX: number,
    centerY: number,
    adjustedRadius: number,
    startAngle: number,
    sweepAngle: number
  ): string => {
    const startX =
      centerX + adjustedRadius * Math.cos(doubleToAngle(startAngle));
    const startY =
      centerY + adjustedRadius * Math.sin(doubleToAngle(startAngle));
    const endX =
      centerX +
      adjustedRadius * Math.cos(doubleToAngle(startAngle + sweepAngle));
    const endY =
      centerY +
      adjustedRadius * Math.sin(doubleToAngle(startAngle + sweepAngle));

    const largeArcFlag = sweepAngle > 180 ? 1 : 0;

    return `M ${startX} ${startY} A ${adjustedRadius} ${adjustedRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  /**
   * Determines the stroke value (color or gradient) of an arc.
   */
  const getStroke = (isSeen: boolean): string => {
    if (seenGradientColors && unSeenGradientColors) {
      return isSeen ? "url(#seenGradient)" : "url(#unSeenGradient)";
    }
    return isSeen ? seenColor : unSeenColor;
  };

  const renderArcs = (): JSX.Element[] => {
    const centerX = radius + strokeWidth / 2;
    const centerY = radius + strokeWidth / 2;
    const adjustedRadius = radius - strokeWidth / 2;

    const anglePerArc =
      numberOfStatus === 1 ? 360 : 360 / numberOfStatus - spacing;
    const startingAngle = -90; // Start arcs at 12 o'clock (top-middle)

    const arcs: JSX.Element[] = [];

    // Special Case: If there's only one arc (no gaps)
    if (numberOfStatus === 1) {
      arcs.push(
        <Path
          key={0}
          d={`M ${centerX} ${
            centerY - adjustedRadius
          } A ${adjustedRadius} ${adjustedRadius} 0 1 1 ${centerX - 0.01} ${
            centerY - adjustedRadius
          }`}
          fill="none"
          stroke={getStroke(indexOfSeenStatus > 0)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      );
      return arcs;
    }

    // General case: Multiple arcs
    for (let i = 0; i < numberOfStatus; i++) {
      const startAngle = startingAngle + i * (anglePerArc + spacing);
      const sweepAngle = numberOfStatus === 1 ? 360 : anglePerArc;

      const path = createArcPath(
        centerX,
        centerY,
        adjustedRadius,
        startAngle,
        sweepAngle
      );

      arcs.push(
        <Path
          key={i}
          d={path}
          fill="none"
          stroke={getStroke(i < indexOfSeenStatus)} // Use helper function
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      );
    }

    return arcs;
  };

  const totalSize = radius * 2 + strokeWidth;

  return (
    <View
      style={[
        styles.container,
        { width: totalSize, height: totalSize },
        containerStyle,
      ]}
    >
      <Svg
        width={totalSize}
        height={totalSize}
        viewBox={`0 0 ${totalSize} ${totalSize}`}
      >
        {/* Define gradients if provided */}
        {seenGradientColors && unSeenGradientColors && (
          <Defs>
            <LinearGradient id="seenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={seenGradientColors[0]} />
              <Stop offset="100%" stopColor={seenGradientColors[1]} />
            </LinearGradient>
            <LinearGradient
              id="unSeenGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <Stop offset="0%" stopColor={unSeenGradientColors[0]} />
              <Stop offset="100%" stopColor={unSeenGradientColors[1]} />
            </LinearGradient>
          </Defs>
        )}

        {renderArcs()}
      </Svg>
      <View
        style={{
          width: (radius - padding) * 2,
          height: (radius - padding) * 2,
          borderRadius: radius - padding,
          position: "absolute",
          overflow: "hidden",
        }}
      >
        <Image
          source={source}
          style={{
            width: (radius - padding) * 2,
            height: (radius - padding) * 2,
            borderRadius: radius - padding,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});

export default Status;
