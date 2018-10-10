import React, { Fragment } from 'react'
import {
  Text,
  TextInput
} from 'react-native'

import { TableContainer, LikesContainer, ListItem, ListHeader, ListItemView, Delete } from './styledComponents'

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
    placeholder = "Enter a like here."
    placeholderTextColor = "#9a73ef"
    autoCapitalize = "none"
    value = {text}
    onSubmitEditing = {() => handleSubmit().then(() => closeModal())}
    onChangeText = {onChange}
  />
)

// 1) remote state (user: {likes, user})
// 2) remote actions (updateFunctions: {addLike, deleteLike})
// 3) local state (isOpen, text)
// 4) local actions (handleChange, toggleModal)

const LikesList = ({
  user: { likes, user },
  updateFunctions: { addLike, deleteLike },
  isOpen,
  text,
  handleChange,
  toggleModal
}) => (
  <Fragment>
    <ListHeader>
      <Text style={{ margin: 0 }}>Likes</Text>
      <Text className="material-icons" onPress={toggleModal}>
        add
      </Text>
    </ListHeader>
    <LikesContainer style={{ marginBottom: 20 }}>
      <AddPopup
        open={isOpen}
        onChange={handleChange}
        handleSubmit={() => addLike(user, text)}
        closeModal={toggleModal}
        text={text}
      />
      {likes.map(like => (
        <ListItemView open={isOpen} key={like.item + like.id}>
          <ListItem open={isOpen}>
            {like.item}
          </ListItem>
          <Delete className="material-icons" onPress={() => deleteLike(user, like)}>
            delete
          </Delete>
        </ListItemView>
      ))}
    </LikesContainer>
  </Fragment>
)

export default LikesList
