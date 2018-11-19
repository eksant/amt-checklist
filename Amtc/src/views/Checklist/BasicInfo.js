import React, { Component } from 'react'
import { 
  Container, 
  Content, 
  Form,
  Item,
  Label,
  Input
} from 'native-base'
import { StyleSheet } from 'react-native';

export default class BasicInfo extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { data, setState } = this.props
    return (
      <Container>
        <Content padder>
          <Form style={{marginTop: 20}}>
            <Item fixedLabel style={styles.myItem}>
              <Label>Ritase</Label>
              <Input 
                underlineColorAndroid='transparent'
                style={styles.myInput}
                value={data.ritase}
                onChangeText={(ritase) => setState({ritase})}
              />
            </Item>
            <Item fixedLabel style={styles.myItem}>
              <Label>Odo KM</Label>
              <Input 
                underlineColorAndroid='transparent'
                style={styles.myInput}
                value={data.odoKM}
                onChangeText={(odoKM) => setState({odoKM})}
              />
            </Item>
            <Item fixedLabel style={styles.myItem}>
              <Label>HSSE</Label>
              <Input 
                underlineColorAndroid='transparent'
                style={styles.myInput}
                value={data.HSSE}
                onChangeText={(HSSE) => setState({HSSE})}
              />
            </Item>
            <Item fixedLabel style={styles.myItem}>
              <Label>PWSAMT</Label>
              <Input 
                underlineColorAndroid='transparent'
                style={styles.myInput}
                value={data.PWSAMT}
                onChangeText={(PWSAMT) => setState({PWSAMT})}
              />
            </Item>
            <Item fixedLabel style={styles.myItem}>
              <Label>TBBM</Label>
              <Input 
                underlineColorAndroid='transparent'
                style={styles.myInput}
                value={data.TBBM}
                onChangeText={(TBBM) => setState({TBBM})}
              />
            </Item>
            <Item fixedLabel style={styles.myItem}>
              <Label>Remarks</Label>
              <Input 
                underlineColorAndroid='transparent'
                style={styles.myInput}
                value={data.remarks}
                onChangeText={(remarks) => setState({remarks})}
              />
            </Item>
            <Item fixedLabel last style={styles.myItem}>
              <Label>Img URL</Label>
              <Input 
                underlineColorAndroid='transparent'
                style={styles.myInput}
                value={data.imgUrl}
                onChangeText={(imgUrl) => setState({imgUrl})}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  myItem: {
    borderColor: 'transparent',
    marginBottom: 10,
    marginRight: 10
  },

  myInput:{
    borderWidth: 2, 
    borderColor: 'lightgrey',  
    paddingLeft: 10,
    height: 50
  }

});