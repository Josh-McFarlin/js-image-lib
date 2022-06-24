All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Breaking

- Replaced `imageTransformer` function with default exported `ImageTransformer` class
- Replaced `ImageFit`, `ImagePosition`, and `FlipDirection` enums with string union types

### Added

- Implemented `fit` and `position` when resizing images
- Created a `ImageTransformer` class that uses methods for apply image operations

### Fixed

- Fixed importing jpegs and pngs with alternate color schemes
- Fixed exporting files in content types that do not support transparency

## [0.2.0] - 2022-06-21

### Changed

- Changed `ImagePosition` to string union with additional options
- Converted `ImageFit` and `FlipDirection` types to string unions to match `ImagePosition`

## [0.1.7] - 2022-03-29

### Added

- Added new options for `ImagePosition`

## [0.1.6] - 2022-02-22

### Fix

- Fix incorrect size used for resizing

### Changed

- Replaced `utif` with `decode-tiff` for smaller size
- Update `mime-tree` to `0.1.4` to fix incorrect mime detection

## [0.1.5] - 2022-02-17

### Documentation

- Mark package as side-effect free

## [0.1.4] - 2022-02-17

### Changed

- Replaced built-in mime type detector with `mime-tree`

## [0.1.3] - 2022-02-17

### Docs

- Add short example to README.md

## [0.1.2] - 2022-02-17

### Changed

- Removed Pako and Buffer from dependencies

## [0.1.1] - 2022-02-17

### Added

- Initial release moving transformation code from Remix-Image

## [0.1.0] - 2022-02-17

### Fix

- Fix Rollup issues preventing publishing
