# absol

## Color

### import

```js
import Color from 'absol/src/Color/Color';
```

### Make new object

```js
var  redColor = new Color([1,0,0,0]);// [red, green, blue, alpha], value: 0 ... 1.0 
var chocolateColor = Color.parse('chocolate');// parse from named color
var anyRGBColor = Color.parse('rgb(100, 50, 90)');// parse from rgb color, [r, g, b]: 0 ... 255
var anyRGBAColor = Color.parse('rgba(100, 50, 90, 0.3)'); // alpha: 0 ... 1.0
var anyHSLColor = Color.parse('hsl(190deg, 100%, 50%)'); //hue: 0 ... 360(deg), [s, l]: 0 ... 100(%)
var anyHSLAColor = Color.parse('hsla(190deg, 100%, 50%, 0.69)');
/// same : hsb, hsba, hwb, hwba, 

// from binary: number(0 ... 1.0)
var anyRGBAColor1 = Color.fromRGBA(r, g, b, a);// [r, g, b, a]: 0 ... 1.0
var anyRGBColor1 = Color.fromRGBA(r, g, b;// [r, g, b, a]: 0 ... 1.0
// same:  HSL, HSA, HSB, HSBA, HWB, HWBA

// copy object
var newColor = redColor.copy();
```

### toString

```js
   
var myColor = Color.parse('darkturquoise'); 
var colorSupportType = ['rgb', 'rgba', 'hsl', 'hsla', 'hsb', 'hsba', 'hwb', 'hwb', 'hex3', 'hex4', 'hex6', 'hex8'];
var convertedCode = colorSupportType.reduce((ac, type) => {
    ac[type] = myColor.toString(type);
    return ac;
}, {});

var willReturn = {
    rgb: "rgb(0, 206, 209)",
    rgba: "rgba(0, 206, 209, 1)",
    hsl: "hsl(180.86124401913875, 100%, 40.98039215686274%)",
    hsla: "hsla(180.86124401913875, 100%, 40.98039215686274%, 1)",
    hsb: "hsb(180.86124401913875, 100%, 81.96078431372548%)",
    hsba: "hsba(180.86124401913875, 100%, 81.96078431372548%, 1)",
    hwb: "hwb(180.86124401913875, 0%, 18.039215686274513%)",
    hex3: "#0cc",
    hex4: "#0ccf",
    hex6: "#00ced1",
    hex8: "#00ced1ff"
}
```

### convert binary

From color to binary:

```js
var myColor = Color.parse('darkturquoise'); 
var hsla = myColor.toHSLA();// [0.5023923444976076, 1, 0.8196078431372549, 1]
var hsba =  myColor.toHSBA();//[0.5023923444976076, 1, 0.40980392156862744, 1]
var hwba = myColor.toHWBA();// [0.5023923444976076, 0, 0.18039215686274512, 1]
```

From binary to binary

```js
var myColor = Color.parse('rgba(200, 100, 95, 0.54)');  
var hsla = myColor.toHSBA();
var hsba = Color.hsbaToHSLA(hsla); //[0.00793650793650793, 0.4883720930232559, 0.5784313725490197, 0.54]
var hsba2 = Color.rgbaToHSLA(myColor.bytes);
//same : hsbaToHSLA, hsbaToRGBA, hslaToHSBA, hslaToRGBA, rgbaToHSBA, rgbaToHSLA, hwbaToHSBA, hsbaToHWBA, rgbaToHWBA, hwbaToRGBA
```


### contract color

```js
var myColor = Color.parse('rgba(200, 100, 95, 0.54)');  
var  yiq = myColor.getContrastYIQ(); 
var hct  = myColor.getHightContrastColor();
```

<div style="color:rgba(0, 0, 0, 1);background:rgba(200, 100, 95, 0.54)">yiq => color:rgba(0, 0, 0, 1); background:rgba(200, 100, 95, 0.54)</div>

<div style="color:rgba(70, 72, 72, 1);background:rgba(200, 100, 95, 0.54)">yiq => color:rgba(70, 72, 72, 1); background:rgba(200, 100, 95, 0.54)</div>

### converter

#### base64

```js
import { UnicodeBase64Converter, base64EncodeUnicode, base64DecodeUnicode } from "absol/src/Converter/base64";
var raw = "Tôi yêu Việt Nam!";
var endcoded = base64EncodeUnicode(raw);//VMO0aSB5w6p1IFZp4buHdCBOYW0h
var decoded = base64DecodeUnicode(endcoded);//Tôi yêu Việt Nam!
//or
var  endcoded1 = UnicodeBase64Converter.encode(raw);
var decode1 = UnicodeBase64Converter.decode(endcoded1);
```

#### file, blob, dataUrl

```js
import { blobToArrayBuffer, dataURItoBlob, blobToFile, stringToBlob } from "absol/src/Converter/file";

function blobToFile(theBlob:Blob, fileName:String): File;

function dataURItoBlob(dataURI:String): Blob;

function blobToArrayBuffer(blob:Blob): Promise<ArrayBuffer>;

function stringToBlob(text:String, type:String):Blob;
```

## CookieStore

```js
import CookieStore from "absol/src/Cookie/CookieStore";
```

```js
CookieStore.isEnabled():Boolean;  //check if cookie is enabled
CookieStore.secure(); //secure cookie
CookieStore.get(key:String):String;
CookieStore.get(key:String, value:String);
```

> Note: data saved by CookieStore will be encode and decoded by `UnicodeBase64Converter` (both key and value).