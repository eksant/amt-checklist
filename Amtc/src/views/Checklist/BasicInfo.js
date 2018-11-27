import React, { Component } from 'react'
import { Container, Content, Form, Item, Label, Input } from 'native-base'
import { StyleSheet, Dimensions, ScrollView } from 'react-native'

import { getAsyncStorage } from '../../utils'

const window = Dimensions.get('window')
const { width } = window

export default class BasicInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        fullName: '',
        roles: '',
      },
    }
  }

  async componentDidMount() {
    const fullName = await getAsyncStorage('user-fullname')
    const roles = await getAsyncStorage('user-roles')

    this.setState({
      user: {
        fullName,
        roles,
      },
    })
  }

  render() {
    const { user } = this.state
    const { data, setState } = this.props

    return (
      <Container>
        <Content padder>
          <ScrollView>
            <Form style={styles.formStyle}>
              <Item fixedLabel style={styles.itemStyle}>
                <Label style={styles.formLabel}>No.Pol</Label>
                <Label style={styles.formLabel}>{data.nopol}</Label>
                {/* <Input
                underlineColorAndroid="transparent"
                style={styles.formInput}
                value={data.ritase}
                onChangeText={ritase => setState({ ritase })}
              /> */}
              </Item>
              <Item fixedLabel style={styles.itemStyle}>
                <Label style={styles.formLabel}>Supir</Label>
                <Label style={styles.formLabel}>{user.fullName}</Label>
              </Item>
              <Item fixedLabel style={styles.itemStyle}>
                <Label style={styles.formLabel}>Kernet</Label>
                <Input
                  underlineColorAndroid="transparent"
                  style={styles.formInput}
                  value={data.remarks}
                  onChangeText={remarks => setState({ remarks })}
                />
              </Item>
              <Item fixedLabel style={styles.itemStyle}>
                <Label style={styles.formLabel}>Ritase</Label>
                <Input
                  underlineColorAndroid="transparent"
                  style={styles.formInput}
                  value={data.ritase}
                  onChangeText={ritase => setState({ ritase })}
                />
              </Item>
              <Item fixedLabel style={styles.itemStyle}>
                <Label style={styles.formLabel}>Odo KM</Label>
                <Input
                  underlineColorAndroid="transparent"
                  style={styles.formInput}
                  value={data.odoKM}
                  onChangeText={odoKM => setState({ odoKM })}
                />
              </Item>
              {/* <Item fixedLabel style={styles.itemStyle}>
                <Label style={styles.formLabel}>HSSE</Label>
                <Input
                  underlineColorAndroid="transparent"
                  style={styles.formInput}
                  value={data.HSSE}
                  onChangeText={HSSE => setState({ HSSE })}
                />
              </Item> */}
              <Item fixedLabel style={styles.itemStyle}>
                <Label style={styles.formLabel}>PWSAMT</Label>
                <Input
                  underlineColorAndroid="transparent"
                  style={styles.formInput}
                  value={data.PWSAMT}
                  onChangeText={PWSAMT => setState({ PWSAMT })}
                />
              </Item>
              <Item fixedLabel style={styles.itemStyle}>
                <Label style={styles.formLabel}>TBBM</Label>
                <Input
                  underlineColorAndroid="transparent"
                  style={styles.formInput}
                  value={data.TBBM}
                  onChangeText={TBBM => setState({ TBBM })}
                />
              </Item>
              {/* <Item fixedLabel style={styles.itemStyle}>
                <Label style={styles.formLabel}>Remarks</Label>
                <Input
                  underlineColorAndroid="transparent"
                  style={styles.formInput}
                  value={data.remarks}
                  onChangeText={remarks => setState({ remarks })}
                />
              </Item> */}
            </Form>
          </ScrollView>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  formStyle: {
    marginTop: 10,
  },
  itemStyle: {
    borderColor: 'transparent',
    marginBottom: 10,
    marginRight: 10,
  },
  formLabel: {
    fontSize: 12,
    alignItems: 'flex-start',
  },
  formInput: {
    fontSize: 12,
    borderWidth: 1,
    borderColor: 'lightgrey',
    paddingLeft: 5,
    paddingBottom: 3,
    height: 30,
  },

  formContainer: {
    backgroundColor: 'white',
    width: width - 30,
    borderRadius: 10,
    // paddingTop: 20,
    alignItems: 'center',
  },
  inputContainer: {
    height: 35,
    marginVertical: 5,
    backgroundColor: 'rgba(232, 147, 142, 0.70)',
  },
  inputIcon: {
    color: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  inputText: {
    fontSize: 14,
    paddingBottom: 5,
    color: '#FFFFFF',
  },
})
