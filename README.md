## Installation
```npm install ktarasenkowow/react-native-drillable-object-view#v2.0.0``` or ```yarn add ktarasenkowow/react-native-drillable-object-view#v2.0.0```


# react-native-drillable-object-view [![Build Status](https://travis-ci.org/newtonry/react-native-drillable-object-view.svg?branch=master)](https://travis-ci.org/newtonry/react-native-drillable-object-view)

[![Greenkeeper badge](https://badges.greenkeeper.io/newtonry/react-native-drillable-object-view.svg)](https://greenkeeper.io/)

![](https://github.com/ktarasenkowow/react-native-drillable-object-view/blob/master/example/data.png)

![](https://github.com/ktarasenkowow/react-native-drillable-object-view/blob/master/example/copied.png)

This component takes in an array or object and renders a view that you can drill down into, similar to what you can do in a Chrome debugger (see gif below).



## How to use

### Example use with @react-native-clipboard/clipboard
```js
import DrillableObjectView from 'react-native-drillable-object-view';
import Clipboard from '@react-native-clipboard/clipboard';
import { Alert } from 'react-native';

...

// example object
const FAKE_DATA = {
 a: {b: {c: {d: "hello world"}, f: {h:false} }}
};

handleSaveValue = ({ infoText }) => {
    Alert.alert('Copied', infoText);
    Clipboard.setString(infoText);
  };
...
<DrillableObjectView
    keyName={'Data'}
    marginLeft={10}
    value={FAKE_DATA}
    onLongPressKey={this.handleSaveValue}
    onLongPressValue={this.handleSaveValue}
/>
```
### Props

```onLongPressKey``` - onLongPress by keyName. Callback param: ```({keyName: string, value: any, paths: string[], infoText: string})```

```onLongPressValue``` - onLongPress by value. Callback param: ```({keyName: string, value: any, paths: string[], infoText: string})```

```keyName``` - The key name that will be displayed. Only the initial keyName is relevant to you. Default is 'parent'.

```marginLeft``` - The margin between nested objects. Adjusting this may make it more or less readable for you. Default is 8.

```value``` - The array or object that you want to be rendered.
