import React, { Fragment } from 'react'
import {
  Text,
  TextInput
} from 'react-native'

import { TableContainer, LikesContainer, ListItem, ListHeader } from './styledComponents'

const oldAddPopup = ({ open, onChange, handleSubmit, text, closeModal }) => (
  <form
    open={open}
    onSubmit={e => {
      e.preventDefault()
      handleSubmit().then(() => closeModal())
    }}
  >
    <input autoFocus value={text} onChange={onChange} />
    <button style={{ float: 'right' }} type="submit">
      Submit
    </button>
  </form>
)

const AddPopup = ({ open, onChange, handleSubmit, text, closeModal }) => (
  <TextInput
    underlineColorAndroid = "transparent"
    placeholder = "Enter a dislike here."
    placeholderTextColor = "#9a73ef"
    autoCapitalize = "none"
    value = {text}
    onSubmitEditing = {() => handleSubmit().then(() => closeModal())}
    onChangeText = {onChange}
  />
)

const DislikesList = ({
  user: { dislikes, user },
  updateFunctions: { addDislike, deleteDislike },
  isOpen,
  text,
  handleChange,
  toggleModal
}) => (
  <Fragment>
    <ListHeader>
      <Text style={{ margin: 0 }}>Dislikes</Text>
      <Text className="material-icons" onPress={toggleModal}>
        add
      </Text>
    </ListHeader>
    <LikesContainer>
      <AddPopup
        open={isOpen}
        onChange={handleChange}
        handleSubmit={() => addDislike(user, text)}
        closeModal={toggleModal}
        text={text}
      />
      {dislikes.map(dislike => (
        <ListItem open={isOpen} key={dislike.item + dislike.id}>
          {dislike.item}
          <Text className="material-icons" onPress={() => deleteDislike(user, dislike)}>
            delete
          </Text>
        </ListItem>
      ))}
    </LikesContainer>
  </Fragment>
)

export default DislikesList
