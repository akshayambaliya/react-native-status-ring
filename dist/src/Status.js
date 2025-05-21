"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const Status = ({ numberOfStatus, indexOfSeenStatus, spacing = 10, radius = 80, padding = 10, strokeWidth = 5, source, seenColor = "#25D366", unSeenColor = "#808080", seenGradientColors, unSeenGradientColors, containerStyle, }) => {
    if (!source) {
        console.error("Please provide 'source'. This prop is required.");
        return null;
    }
    const doubleToAngle = (angle) => (angle * Math.PI) / 180.0;
    const createArcPath = (centerX, centerY, adjustedRadius, startAngle, sweepAngle) => {
        const startX = centerX + adjustedRadius * Math.cos(doubleToAngle(startAngle));
        const startY = centerY + adjustedRadius * Math.sin(doubleToAngle(startAngle));
        const endX = centerX +
            adjustedRadius * Math.cos(doubleToAngle(startAngle + sweepAngle));
        const endY = centerY +
            adjustedRadius * Math.sin(doubleToAngle(startAngle + sweepAngle));
        const largeArcFlag = sweepAngle > 180 ? 1 : 0;
        return `M ${startX} ${startY} A ${adjustedRadius} ${adjustedRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
    };
    /**
     * Determines the stroke value (color or gradient) of an arc.
     */
    const getStroke = (isSeen) => {
        if (seenGradientColors && unSeenGradientColors) {
            return isSeen ? "url(#seenGradient)" : "url(#unSeenGradient)";
        }
        return isSeen ? seenColor : unSeenColor;
    };
    const renderArcs = () => {
        const centerX = radius + strokeWidth / 2;
        const centerY = radius + strokeWidth / 2;
        const adjustedRadius = radius - strokeWidth / 2;
        const anglePerArc = numberOfStatus === 1 ? 360 : 360 / numberOfStatus - spacing;
        const startingAngle = -90; // Start arcs at 12 o'clock (top-middle)
        const arcs = [];
        // Special Case: If there's only one arc (no gaps)
        if (numberOfStatus === 1) {
            arcs.push(react_1.default.createElement(react_native_svg_1.Path, { key: 0, d: `M ${centerX} ${centerY - adjustedRadius} A ${adjustedRadius} ${adjustedRadius} 0 1 1 ${centerX - 0.01} ${centerY - adjustedRadius}`, fill: "none", stroke: getStroke(indexOfSeenStatus > 0), strokeWidth: strokeWidth, strokeLinecap: "round" }));
            return arcs;
        }
        // General case: Multiple arcs
        for (let i = 0; i < numberOfStatus; i++) {
            const startAngle = startingAngle + i * (anglePerArc + spacing);
            const sweepAngle = numberOfStatus === 1 ? 360 : anglePerArc;
            const path = createArcPath(centerX, centerY, adjustedRadius, startAngle, sweepAngle);
            arcs.push(react_1.default.createElement(react_native_svg_1.Path, { key: i, d: path, fill: "none", stroke: getStroke(i < indexOfSeenStatus), strokeWidth: strokeWidth, strokeLinecap: "round" }));
        }
        return arcs;
    };
    const totalSize = radius * 2 + strokeWidth;
    return (react_1.default.createElement(react_native_1.View, { style: [
            styles.container,
            { width: totalSize, height: totalSize },
            containerStyle,
        ] },
        react_1.default.createElement(react_native_svg_1.default, { width: totalSize, height: totalSize, viewBox: `0 0 ${totalSize} ${totalSize}` },
            seenGradientColors && unSeenGradientColors && (react_1.default.createElement(react_native_svg_1.Defs, null,
                react_1.default.createElement(react_native_svg_1.LinearGradient, { id: "seenGradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
                    react_1.default.createElement(react_native_svg_1.Stop, { offset: "0%", stopColor: seenGradientColors[0] }),
                    react_1.default.createElement(react_native_svg_1.Stop, { offset: "100%", stopColor: seenGradientColors[1] })),
                react_1.default.createElement(react_native_svg_1.LinearGradient, { id: "unSeenGradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
                    react_1.default.createElement(react_native_svg_1.Stop, { offset: "0%", stopColor: unSeenGradientColors[0] }),
                    react_1.default.createElement(react_native_svg_1.Stop, { offset: "100%", stopColor: unSeenGradientColors[1] })))),
            renderArcs()),
        react_1.default.createElement(react_native_1.View, { style: {
                width: (radius - padding) * 2,
                height: (radius - padding) * 2,
                borderRadius: radius - padding,
                position: "absolute",
                overflow: "hidden",
            } },
            react_1.default.createElement(react_native_1.Image, { source: source, style: {
                    width: (radius - padding) * 2,
                    height: (radius - padding) * 2,
                    borderRadius: radius - padding,
                } }))));
};
const styles = react_native_1.StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
});
exports.default = Status;
