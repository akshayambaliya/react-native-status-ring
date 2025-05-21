import React from "react";
import { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
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
declare const Status: React.FC<StatusProps>;
export default Status;
