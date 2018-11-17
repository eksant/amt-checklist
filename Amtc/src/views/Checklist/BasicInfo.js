import React, { Component } from 'react'
import { 
  Container, 
  Content, 
  Form,
  Item,
  Label,
  Input
} from 'native-base'

export default class BasicInfo extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { data, setState } = this.props
    return (
      <Container>
        <Content padder>
          <Form>
            <Item fixedLabel>
              <Label>Ritase</Label>
              <Input 
                value={data.ritase}
                onChangeText={(ritase) => setState({ritase})}
              />
            </Item>
            <Item fixedLabel>
              <Label>Odo KM</Label>
              <Input 
                value={data.odoKM}
                onChangeText={(odoKM) => setState({odoKM})}
              />
            </Item>
            <Item fixedLabel>
              <Label>HSSE</Label>
              <Input 
                value={data.HSSE}
                onChangeText={(HSSE) => setState({HSSE})}
              />
            </Item>
            <Item fixedLabel>
              <Label>PWSAMT</Label>
              <Input 
                value={data.PWSAMT}
                onChangeText={(PWSAMT) => setState({PWSAMT})}
              />
            </Item>
            <Item fixedLabel>
              <Label>TBBM</Label>
              <Input 
                value={data.TBBM}
                onChangeText={(TBBM) => setState({TBBM})}
              />
            </Item>
            <Item fixedLabel>
              <Label>Remarks</Label>
              <Input 
                value={data.remarks}
                onChangeText={(remarks) => setState({remarks})}
              />
            </Item>
            <Item fixedLabel last>
              <Label>Img URL</Label>
              <Input 
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
