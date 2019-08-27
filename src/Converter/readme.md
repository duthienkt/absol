
## converter

### base64

```typescript
import { UnicodeBase64Converter, base64EncodeUnicode, base64DecodeUnicode } from "absol/src/Converter/base64";
var raw = "Tôi yêu Việt Nam!";
var endcoded = base64EncodeUnicode(raw);//VMO0aSB5w6p1IFZp4buHdCBOYW0h
var decoded = base64DecodeUnicode(endcoded);//Tôi yêu Việt Nam!
//or
var  endcoded1 = UnicodeBase64Converter.encode(raw);
var decode1 = UnicodeBase64Converter.decode(endcoded1);
```

#### file, blob, dataUrl

```typescript
import { blobToArrayBuffer, dataURItoBlob, blobToFile, stringToBlob } from "absol/src/Converter/file";

function blobToFile(theBlob:Blob, fileName:String): File;

function dataURItoBlob(dataURI:String): Blob;

function blobToArrayBuffer(blob:Blob): Promise<ArrayBuffer>;

function stringToBlob(text:String, type:String):Blob;
```
