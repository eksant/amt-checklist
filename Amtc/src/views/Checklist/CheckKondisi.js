import React, { Component } from 'react'
import { Container, Content, Text, List, ListItem, Left, Right, Icon, Item, Label, Input,Toast } from 'native-base'

const ShowReason = (props) => {
  const {status, name, reason, index, onChangeReason} = props;
  if (status === 2) {
    return (
      <Item stackedLabel>
        <Label>{name}</Label>
        <Input 
            placeholder="input your reason here..."
            value={reason}
            onChangeText={(reason) => onChangeReason(index, reason)}/>
      </Item>
    );
  }
  
  return <Text>{name}</Text>;
}

const StatusIcon = (props) => {
  const status = props.status;
  if (status === 2) {
    return <Icon type="FontAwesome" name="times" style={{fontSize: 20, color: 'red'}}/>;
  }
  else if(status === 1){
    return <Icon type="FontAwesome" name="check" style={{fontSize: 20, color: 'green'}}/>;
  }
  return null ;
}

export default class CheckKondisi extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { data, onChangeReason, onActionConfirm } = this.props

    return (
      <Container>
        <Content padder>
          <List dataArray={data} renderRow={(rowData, sectionID, rowID, highlightRow) =>
              <ListItem onPress={() => onActionConfirm(rowID)}>
                <Left>
                    <ShowReason status={rowData.status} name={rowData.name} reason={rowData.reason} index={rowID} onChangeReason={onChangeReason}/>
                </Left>
                <Right>
                  <StatusIcon status={rowData.status} />
                </Right>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    )
  }
}
