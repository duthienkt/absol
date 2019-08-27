

## IFrameBrigde

Connect with IFrame and worker

```js
import IFrameBridge from "absol/src//Network/IFrameBridge";
```

### worker

`workfinder.js`

```js
import IFrameBridge from "./Network/IFrameBridge";
import EnglishWord from "./String/EnglishWords";

var slave = IFrameBridge.getInstance();

slave.find = function (query) {
    return EnglishWord.filter(function (s) {
        return s.indexOf(query) >= 0;
    })
};

slave.on('yourEventName', function(arg_0, arg_1, arg_n){
    //handle event
});

```

`main.js`

```js
import IFrameBridge from "absol/src//Network/IFrameBridge";

var master = new IFrameBridge(new Worker('workfinder.js'));
master.invoke('find', 'cat').then(function(result){
    // result of find()
});
// arg_0, arg_1, arg_n: your params
master.emit('yourEventName', arg_0, arg_1, arg_n);

```
> emit, invoke support more than 1 param

