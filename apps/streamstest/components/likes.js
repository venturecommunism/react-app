import React, { Fragment } from 'react'

import { TableContainer, LikesContainer, ListItem, ListHeader, AddPopup } from './styledComponents'

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
      <h3 style={{ margin: 0 }}>Likes</h3>
      <i className="material-icons" style={{ cursor: 'pointer' }} onClick={toggleModal}>
        add
      </i>
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
        <ListItem open={isOpen} key={like.item + like.id}>
          {like.item}
          <i className="material-icons" onClick={() => deleteLike(user, like)}>
            delete
          </i>
        </ListItem>
      ))}
    </LikesContainer>
  </Fragment>
)

export default LikesList
