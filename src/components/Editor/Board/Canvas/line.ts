import { Line, Point, EraserLine } from './Shape';

/**
 * Create the basic object of the line with point.
 */
export function createLine(point: Point): Line {
  return {
    type: 'line',
    points: [point],
  } as Line;
}

/**
 * Create the basic object of the line with point.
 */
export function createEraserLine(point: Point): EraserLine {
  return {
    type: 'eraser',
    points: [point],
  } as EraserLine;
}

/**
 * Draw a line on the canvas.
 */
export function drawLine(context: CanvasRenderingContext2D, color: string, line: Line | EraserLine) {
  context.beginPath();

  const originColor = context.strokeStyle;
  context.strokeStyle = color;
  let isMoved = false;
  for (const p of line.points) {
    if (isMoved === false) {
      isMoved = true;
      context.moveTo(p.x, p.y);
    } else {
      context.lineTo(p.x, p.y);
    }
  }
  context.lineWidth = 3;
  context.stroke();
  context.strokeStyle = originColor;
}

const eraserOffsetXSize = 8;
const eraserOffsetYSize = 6;
/**
 * Match the mouse point position for eraser
 */
export function fixEraserPoint(point: Point) {
  return {
    y: point.y + eraserOffsetXSize,
    x: point.x + eraserOffsetYSize,
  };
}
