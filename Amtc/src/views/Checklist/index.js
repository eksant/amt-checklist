import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  Button,
  Container,
  Content,
  Card,
  CardItem,
  Form,
  Label,
  Text,
  Tab,
  Tabs,
  ScrollableTab,
  Footer,
  FooterTab,
  Input,
  Item,
  Icon as NBIcon,
} from 'native-base'
import { Field, reduxForm } from 'redux-form'

import CheckKondisi from './CheckKondisi'
import CheckKeberadaan from './CheckKeberadaan'
import CheckMembawa from './CheckMembawa'
import CheckMenggunakan from './CheckMenggunakan'

const validate = values => {
  const error = {}
  error.createdBy = ''
  error.mobiltangki = ''
  error.ritase = ''
  error.HSSE = ''

  var HSSE = values.HSSE
  var ritase = values.ritase

  if (HSSE === undefined) {
    HSSE = ''
  }
  if (ritase === undefined) {
    ritase = ''
  }
  return error
}

class Checklist extends Component {
  constructor(props) {
    super(props)

    this.handleInput = this.handleInput.bind(this)
  }

  handleInput({ input, label, type, meta: { touched, error }, ...other }) {
    var hasError = error !== undefined ? true : false

    return (
      <Item error={hasError}>
        {label && <Label style={{ marginBottom: 10 }}>{label}</Label>}
        <Input type={type} {...input} {...other} />
        {touched && error && hasError && <Text note>{error}</Text>}
      </Item>
    )
  }

  render() {
    const { handleSubmit, reset } = this.props

    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Field
                name="createdBy"
                component={this.handleInput}
                label="User:"
                type="text"
                // placeholder="User"
              />
              <Field
                name="mobiltangki"
                component={this.handleInput}
                label="No. Pol:"
                type="text"
              />
              <Field
                name="ritase"
                component={this.handleInput}
                label="Ritase:"
                type="text"
              />
              {/* <Field name="mobiltangki" component={this.handleInput} /> */}
              {/* <Field name="ritase" component={this.handleInput} /> */}
              {/* <Field name="HSSE" component={this.handleInput} /> */}
            </CardItem>
          </Card>

          <Tabs renderTabBar={() => <ScrollableTab />}>
            <Tab heading="Cek Kondisi">
              <CheckKondisi />
            </Tab>
            <Tab heading="Cek Keberadaan">
              <CheckKeberadaan />
            </Tab>
            <Tab heading="Cek Bawaan">
              <CheckMembawa />
            </Tab>
            <Tab heading="Cek Penggunaan">
              <CheckMenggunakan />
            </Tab>
          </Tabs>
        </Content>
        <Footer>
          <FooterTab>
            <Button success>
              <Icon name="save" style={{ fontSize: 20, left: 10, color: '#FFF' }} />
            </Button>
            <Button light onPress={() => this.props.navigation.navigate('Scanner')}>
              <Icon name="close" style={{ fontSize: 20, left: 10, color: '#FFF' }} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

export default reduxForm({
  form: 'formChecklist',
  validate,
})(Checklist)
