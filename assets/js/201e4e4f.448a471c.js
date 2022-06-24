"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[218],{3905:function(e,r,t){t.d(r,{Zo:function(){return u},kt:function(){return f}});var n=t(7294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=n.createContext({}),p=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},u=function(e){var r=p(e.components);return n.createElement(l.Provider,{value:r},e.children)},m={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},c=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(t),f=a,g=c["".concat(l,".").concat(f)]||c[f]||m[f]||o;return t?n.createElement(g,i(i({ref:r},u),{},{components:t})):n.createElement(g,i({ref:r},u))}));function f(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=c;var s={};for(var l in r)hasOwnProperty.call(r,l)&&(s[l]=r[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=t[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}c.displayName="MDXCreateElement"},9099:function(e,r,t){t.r(r),t.d(r,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return p},toc:function(){return u},default:function(){return c}});var n=t(7462),a=t(3366),o=(t(7294),t(3905)),i=["components"],s={sidebar_position:2},l="Use Transformer",p={unversionedId:"tutorial/use-transformer",id:"tutorial/use-transformer",title:"Use Transformer",description:"1. Retrieving Images",source:"@site/docs/tutorial/use-transformer.md",sourceDirName:"tutorial",slug:"/tutorial/use-transformer",permalink:"/tutorial/use-transformer",editUrl:"https://github.com/Josh-McFarlin/js-image-lib/tree/master/docs/templates/shared/docs/tutorial/use-transformer.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Install",permalink:"/tutorial/install"},next:{title:"Congratulations!",permalink:"/tutorial/congratulations"}},u=[{value:"1. Retrieving Images",id:"1-retrieving-images",children:[{value:"Fetch",id:"fetch",children:[],level:3},{value:"File",id:"file",children:[],level:3}],level:2},{value:"2. Create ImageTransformer",id:"2-create-imagetransformer",children:[],level:2},{value:"3. Transform",id:"3-transform",children:[],level:2},{value:"4. Export",id:"4-export",children:[],level:2}],m={toc:u};function c(e){var r=e.components,t=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},m,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"use-transformer"},"Use Transformer"),(0,o.kt)("h2",{id:"1-retrieving-images"},"1. Retrieving Images"),(0,o.kt)("p",null,"To use the image transformer, you must first get your image encoded as an Uint8Array.\nThis can be accomplished various ways, such as:"),(0,o.kt)("h3",{id:"fetch"},"Fetch"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'const imageResponse = await fetch(url, {\n  headers: {\n    accept: "image/*",\n  },\n});\nconst arrBuff = await imageResponse.arrayBuffer();\n\nconst image = new Uint8Array(arrBuff);\n')),(0,o.kt)("h3",{id:"file"},"File"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'import fs from "fs";\nimport path from "path";\n\nconst image = new Uint8Array(fs.readFileSync(filePath));\n')),(0,o.kt)("h2",{id:"2-create-imagetransformer"},"2. Create ImageTransformer"),(0,o.kt)("p",null,"Once, you have your image as a Uint8Array, create a new instance of ImageTransformer."),(0,o.kt)("p",null,"If you only have the image data:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'import ImageTransformer, { OutputOptions } from "js-image-lib";\n\nconst image: Uint8Array = ...;\nconst outputOptions: Partial<OutputOptions> = {}; // optional\n\nconst transformer = new ImageTransformer(image, outputOptions);\n')),(0,o.kt)("p",null,"If you know the content type of your image, you can pass it into the constructor to speed up initialization."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'import ImageTransformer, { MimeType, OutputOptions } from "js-image-lib";\n\nconst image: Uint8Array = ...;\nconst contentType: MimeType = ...;\nconst outputOptions: Partial<OutputOptions> = {}; // optional\n\nconst transformer = new ImageTransformer(image, contentType, outputOptions);\n')),(0,o.kt)("p",null,"In both constructors, you can add a final optional parameter ",(0,o.kt)("inlineCode",{parentName:"p"},"outputOptions")," specifying the settings used when exporting your image.\nNote: these settings are not used by every file format while exporting, and may have no effect. "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"export interface OutputOptions {\n  /** Background color of resulting image. (optional, default [0x00, 0x00, 0x00, 0x00]) */\n  background: Color;\n  /** Quality, integer 1-100. (optional, default 80) */\n  quality: number;\n  /** zlib compression level, 0-9. (optional, default 9) */\n  compressionLevel: number;\n  /** Number of animation iterations, use 0 for infinite animation. (optional, default 0) */\n  loop: number;\n  /** Delay between animation frames (in milliseconds). (optional, default 100) */\n  delay: number;\n}\n")),(0,o.kt)("h2",{id:"3-transform"},"3. Transform"),(0,o.kt)("p",null,"Once, you have created your ImageTransformer, you can apply operations to it."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'import ImageTransformer from "js-image-lib";\n\nconst transformer = new ImageTransformer(image);\n\ntransformer.blur(...);\ntransformer.crop(...);\ntransformer.flip(...);\ntransformer.resize(...);\ntransformer.rotate(...);\n\n// Operations can be done in sequence\ntransformer.blur(5).rotate(45).flip("both");\n')),(0,o.kt)("p",null,"To learn more about the supported operations on ImageTransformer, read the ",(0,o.kt)("a",{parentName:"p",href:"/transformer"},"transformer documentation"),"."),(0,o.kt)("h2",{id:"4-export"},"4. Export"),(0,o.kt)("p",null,"Finally, export your image as a Uint8Array by calling ",(0,o.kt)("inlineCode",{parentName:"p"},"toBuffer")," on your ImageTransformer."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'import ImageTransformer from "js-image-lib";\n\nconst transformer = new ImageTransformer(image);\n\nconst exported: Uint8Array = transformer.toBuffer()\n')),(0,o.kt)("p",null,"You can optionally provide a content type to export your image to."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'import ImageTransformer, { MimeType } from "js-image-lib";\n\nconst transformer = new ImageTransformer(image);\n\nconst exported: Uint8Array = transformer.toBuffer(MimeType.PNG)\n')),(0,o.kt)("p",null,"If a content type is not provided, your image will be exported in the same content type it was originally provided in."))}c.isMDXComponent=!0}}]);