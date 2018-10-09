import React from 'react'
import styled from 'styled-components/native'

export const PageWrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
`

export const ListContainer = styled.View`
  width: 95%;
/*  flex: 1 0 50%; */
  height: 100%;
/*  list-style-type: none; */
  padding: 0;
  margin: 0;
  display: flex;
  border-radius: 3px;
  border: 2px solid;
  flex-direction: column;
  justify-content: space-around;
`
export const UserContainer = styled.View`
/*  flex: 1 1 50%; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
export const TableContainer = styled.View`
/*  flex: 1 1 50%; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
export const ListItem = styled.Text`
  flex: 1;
  height: 60px;
/*  background: ${p => p.selected && 'rgba(66, 244, 173, 0.4)'}; */
/*  cursor: pointer; */
  display: flex;
  justify-content: space-between;
/*  filter: ${p => p.open && 'blur(3px)'}; */
/*  overflow-x: hidden; */
/*  text-overflow: ellipsis; */
/*  overflow-y: hidden;
  align-items: center;
  padding: 8px;*/
`
export const ListHeader = styled.View`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 85%;
`
export const LikesContainer = styled(ListContainer)`
  height: 200px;
  overflow-y: auto;
`
export const Popup = styled.TextInput`
  width: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  position: relative;
  background: #fff;
  left: 20px;
  top: 5px;
  border: 1px solid;
  display: ${p => (p.open ? 'block' : 'none')};
  z-index: 100;
/*  box-shadow: 9px 14px 14px -8px rgba(128, 128, 128, 1); */
`
export const StyledInput = styled.TextInput.attrs({
  type: 'text'
})`
  width: 96%;
  margin: auto;
  height: 30px;
  font-size: 14px;
/*  border: none; */
  padding: 5px;
`
export const Button = styled.View`
  border-radius: 3px;
  border: 2px solid rgba(66, 244, 173, 0.7);
  cursor: pointer;
  height: 30px;
  width: 100%;
  background: rgba(66, 244, 173, 0.6);
  &:hover {
    background: rgba(66, 244, 173, 0.9);
  }
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

