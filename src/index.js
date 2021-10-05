import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from './colors';


const styles = StyleSheet.create({
  booleanStyle: {
    color: Colors.BLUE,
  },
  keyStyle: {
    color: Colors.ALMOST_BLACK,
  },
  nullStyle: {
    color: Colors.DARK_GREY,
  },
  numberStyle: {
    color: Colors.BLUE,
  },
  stringStyle: {
    color: Colors.RED,
  },
  undefinedStyle: {
    color: Colors.DARK_GREY,
  },
  valueStyle: {
    color: Colors.ALMOST_BLACK,
  },
});

let paths = [];

const genText = ({keyName, value}) => `[FULL_PATH]: ${paths.join(
  '.',
)}.${keyName}\n[KEY]: ${keyName}\n[VALUE]: ${JSON.stringify(value)}`

export default class DrillableObjectView extends PureComponent {
  static propTypes = {
    keyName: PropTypes.any,
    onLongPressKey: PropTypes.func,
    onLongPressValue: PropTypes.func,
    marginLeft: PropTypes.number,
    value: PropTypes.any,
  };

  static defaultProps = {
    autoExpandDepth: 0,
    keyName: 'parent',
    marginLeft: 8,
  };

  
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    
  }

  toggleOpen = () => { 
    const {keyName, autoExpandDepth} = this.props;
    const innerLevel = autoExpandDepth*-1;
    if(innerLevel>0.5){
      if(innerLevel>paths.length){
      }else{
        paths.length = innerLevel-1;
      }
      paths.push(keyName);
     
    }
    this.setState({ isOpen: !this.state.isOpen }); };
 
  handlePressKey= () =>{
    const {onLongPressKey, keyName, value} = this.props;
    onLongPressKey?.({keyName, value, paths, infoText: genText({keyName, value})});
  }
  handlePressValue= () =>{
    const { onLongPressValue, keyName, value} = this.props;
    onLongPressValue?.({keyName, value, paths, infoText: genText({keyName, value})});
  }

  rendervalueStyle = (value) => {
    if (value === null) {
      return <Text style={styles.nullStyle}>{String(value)}</Text>;
    }
    switch (typeof (value)) {
      case 'string':
        return <Text style={styles.stringStyle}>&quot;{value}&quot;</Text>;
      case 'boolean':
        return <Text style={styles.booleanStyle}>{String(value)}</Text>;
      case 'number':
        return <Text style={styles.numberStyle}>{value}</Text>;
      case 'undefined':
        return <Text style={styles.undefinedStyle}>{String(value)}</Text>;
      default:
        return <Text style={styles.valueStyle}>{String(value)}</Text>;
    }
  };

  renderEmptyObjectRow = () => {
    const { keyName, value, marginLeft } = this.props;
    const emptyObjectText = _.isArray(value) ? '[]' : '{}';
    return (
      <Text style={{ marginLeft }} >
        <TouchableOpacity onLongPress={this.handleOnLongPress}><Text style={styles.keyStyle} >{keyName}:</Text></TouchableOpacity>
        <Text style={styles.valueStyle}> {emptyObjectText}</Text>
      </Text>
    );
  };

  renderClosedObjectRow = () => {
    const { keyName, marginLeft } = this.props;
    return (
      <View style={{ marginLeft }}  >
        <Text style={styles.keyStyle} onPress={this.toggleOpen}>{keyName}: +</Text>
      </View>
    );
  };
  

  renderObjectRow = () => {
    const { isOpen } = this.state;
    const {
      autoExpandDepth, keyName, value, marginLeft
    } = this.props;
    // if the value is an object, but is empty, we should just output it
    if (_.isObject(value) && _.isEmpty(value)) return this.renderEmptyObjectRow();

    if (!isOpen) return this.renderClosedObjectRow();

    const autoExpandDepthRemaining = autoExpandDepth - 1;

    const subComponents = _.map(value, (subValue, subkeyName) => (
      <DrillableObjectView
        {...this.props}
        autoExpandDepth={autoExpandDepthRemaining}
        keyName={subkeyName}
        value={subValue}
        onLongPress={this.handlePressKey}
        key={`${keyName}:${subkeyName}`}
      />
    ));

    return (
      <View style={{ marginLeft }} >
        <Text style={styles.keyStyle} onPress={this.toggleOpen} >{keyName}: -</Text>
        {subComponents}
      </View>
    );
  };

  render() {
    const { keyName, value, marginLeft } = this.props;

    if (_.isObject(value)) return this.renderObjectRow();

    return (
      <Text style={{ marginLeft }}>
        <Text style={styles.keyStyle} onLongPress={this.handlePressKey}>{keyName}:</Text>
        <Text style={styles.valueStyle} onLongPress={this.handlePressValue}> {this.rendervalueStyle(value)}</Text>
      </Text>
    );
  }
}
