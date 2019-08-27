
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

