import React from 'react'
import styled from 'styled-components/native'

export const PageWrapper = styled.View`
  display: flex;
  flex-direction: row;
`
export const ListContainer = styled.View`
  border: 3px #CCCCCC solid;
  padding: 10px;
`
export const UserContainer = styled.View`
  padding-left: 5px;
  padding-right: 2px;
  flex: 1;
`
export const TableContainer = styled.View`
  padding-right: 5px;
  padding-left: 2px;
  flex: 3;
`
export const ListItem = styled.Text`
  flex: 5;
  padding; 2px;
`
export const ListHeader = styled.View`
`
export const LikesContainer = styled(ListContainer)`
  display: flex;
  flex-direction: column;
  justifyContent: flex-end;
`
export const StyledInput = styled.TextInput`
`
export const Button = styled.View`
`
export const Delete = styled.Text`
  flex: 1;
  padding: 2px;
  alignItems: flex-end;
  color: #F00;
`
export const ListItemView = styled.View`
  display: flex;
  flex-direction: row;
`

export const AddPopup = ({ open, onChange, handleSubmit, text, closeModal }) => (
  <Popup
    open={open}
    onSubmit={e => {
      e.preventDefault()
      handleSubmit().then(() => closeModal())
    }}
  >
    {/* <StyledInput placeholder={"text"} />
      <Button style={{ float: 'right' }} type="submit">
      <ListItem>Submit</ListItem>
    </Button> */}
  </Popup>
)

export const Loader = ({ status, message }) =>
  status === 'REQUEST' ? (
    <ListItem>Loading...</ListItem>
  ) : (
    <ListItem>{message}</ListItem>
  )
