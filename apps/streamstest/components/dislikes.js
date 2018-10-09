import React, { Fragment } from 'react'

import { TableContainer, LikesContainer, ListItem, ListHeader, AddPopup } from './styledComponents'

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
      <h3 style={{ margin: 0 }}>Dislikes</h3>
      <i className="material-icons" style={{ cursor: 'pointer' }} onClick={toggleModal}>
        add
      </i>
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
          <i className="material-icons" onClick={() => deleteDislike(user, dislike)}>
            delete
          </i>
        </ListItem>
      ))}
    </LikesContainer>
  </Fragment>
)

export default DislikesList
