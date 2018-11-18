import React, { Component } from 'react'
import { 
  Container, 
  Content, 
  Text, 
  List, 
  ListItem, 
  Left, 
  Right, 
  Icon, 
  Item, 
  Label, 
  Input, 
  Textarea,
  CheckBox, 
  Body,
  Form
} from 'native-base'

const ShowReason = (props) => {
  const {status, name, reason, index, onChangeReason} = props;
  if (status === 0) {
    return (
      <Content padder>
          <Text>{name}</Text>
          <Form>
            <Textarea 
              rowSpan={3} 
              bordered 
              placeholder="input your reason here..." 
              value={reason}
              onChangeText={(reason) => onChangeReason(index, reason)}/>
          </Form>
      </Content>
    );
  }
  
  return <Text>{name}</Text>;
}

const StatusCheckBox = (props) => {
  const {status, index, onChangeStatus} = props;
  const value = status === 1 ? true : false;
  return <CheckBox checked={value} onPress={() => onChangeStatus(index)}/>;
}

export default class CheckKondisi extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { data, onChangeStatus, onChangeReason } = this.props

    return (
      <Container>
        <Content padder>
          <List 
            dataArray={data} 
            renderRow={(rowData, sectionID, rowID, highlightRow) =>
              <ListItem>
                <StatusCheckBox 
                    index={rowID} 
                    status={rowData.status} 
                    onChangeStatus={onChangeStatus} />
                <Body style={{marginLeft:10}}>
                  <ShowReason 
                    index={rowID} 
                    status={rowData.status} 
                    name={rowData.name} 
                    reason={rowData.reason} 
                    onChangeReason={onChangeReason}/>
                </Body>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    )
  }
}
