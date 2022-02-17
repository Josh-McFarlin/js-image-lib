---
sidebar_position: 1
slug: /
---

# js-image-lib

## 👋 Intro

An image manipulation library using only pure JavaScript

This library lets you:
* Resize images to different sizes
* Convert between the following file types: `png`, `jpeg`, `gif`, `bmp`, and `tiff`
* Apply operations like `crop`, `rotate`, `blur`, and `flip`

This library uses pure browser-compatible JavaScript, relying on no Node packages.
This means js-image-lib can be run anywhere you use JavaScript!

**Note**: The use of pure JavaScript means this library will run much slower
than alternative libraries that have C/etc bindings. You should primarily use js-image-lib
in environments where speed is not the first concern, especially in cases where you are trying to support all platforms!

## 🚀 How to use

### Install

To install this library, use on of the following commands:
```bash
npm install -S js-image-lib
yarn add js-image-lib
```
