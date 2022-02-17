/** RGBA hex values 0...255 */
export type Color = [number, number, number, number];

export interface ImageData {
  data: Uint8Array;
  width: number;
  height: number;
}
