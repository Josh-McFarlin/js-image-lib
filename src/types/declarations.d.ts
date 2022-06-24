declare module "get-rgba-palette" {
  const getPalette: (
    image: Uint8Array,
    count?: number,
    quality?: number,
    filter?: (pixels: number[], index: number) => boolean
  ) => [number, number, number][];

  export default getPalette;
}

declare module "decode-tiff" {
  export type TiffImage = {
    width: number;
    height: number;
    data: Uint8Array;
    ifdEntries: { [key: string]: Array };
  };

  export const decode: (
    buffer: ArrayBuffer | Uint8Array,
    options?: {
      singlePage?: boolean;
    }
  ) => TiffImage;
}
