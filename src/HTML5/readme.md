
## JSPath

> Like `html selector`

```js
import JSPath from "absol/src/HTML5/JSPath";
```
Example:

```js
//to find a radio
var mJSPath = JSPath.compileJSPath('body parentTag.parentClass > tagName.className0.className1[type="radio"][checked]');

var firstRadio = mJSPath.findFirst(document.body);

// find image with source contains "google"
var imgJSPath = JSPath.compileJSPath('img');
var imgGoogle =   mJSPath.findFirst(document.body, function(elt){
    if (elt.src && elt.indexOf("google")>=0) return true;
    return false;
});
//find all
    var imgs =   mJSPath.findAll(document.body, function(elt){
    if (elt.src && elt.indexOf("google")>=0) return true;
    return false;
});
```