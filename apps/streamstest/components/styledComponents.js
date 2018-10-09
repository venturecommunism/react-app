import React from 'react'
import styled, { injectGlobal } from 'styled-components'

injectGlobal`
  body {
   font-family: 'Roboto', sans-serif;
}
`
export const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
`

export const ListContainer = styled.ul`
  width: 95%;
  flex: 1 0 50%;
  height: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  border-radius: 3px;
  border: 2px solid;
  flex-direction: column;
  justify-content: space-around;
`
export const UserContainer = styled.div`
  flex: 1 1 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
export const TableContainer = styled.div`
  flex: 1 1 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
export const ListItem = styled.li`
  flex: 1;
  height: 60px;
  background: ${p => p.selected && 'rgba(66, 244, 173, 0.4)'};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  filter: ${p => p.open && 'blur(3px)'};
  overflow-x: hidden;
  text-overflow: ellipsis;
  overflow-y: hidden;
  align-items: center;
  padding: 8px;
`
export const ListHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 85%;
`
export const LikesContainer = styled(ListContainer)`
  height: 200px;
  overflow-y: auto;
`
export const Popup = styled.form`
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
  box-shadow: 9px 14px 14px -8px rgba(128, 128, 128, 1);
`
export const StyledInput = styled.input.attrs({
  type: 'text'
})`
  width: 96%;
  margin: auto;
  height: 30px;
  font-size: 14px;
  border: none;
  padding: 5px;
`
export const Button = styled.button`
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
    <StyledInput autoFocus value={text} onChange={onChange} />
    <Button style={{ float: 'right' }} type="submit">
      Submit
    </Button>
  </Popup>
)

export const Loader = ({ status, message }) =>
  status === 'REQUEST' ? (
    <svg x="0px" y="0px" width="100px" height="100px" viewBox="0 0 60 60">
      <path
        opacity="0.2"
        fill="rgba(66, 244, 173)"
        d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
      />
      <path
        fill="rgba(66, 244, 173)"
        d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="0.5s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  ) : (
    <h2>{message}</h2>
  )

