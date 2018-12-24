import { SHOW_MODAL, HIDE_MODAL } from "./ModalTypes";

export const showModal = (modalProps, modalType) => dispatch => {
  console.log("actions show Modal " + modalProps + " " + modalType);
  dispatch({
    type: SHOW_MODAL,
    modalProps,
    modalType
  });
};

export const hideModal = () => dispatch => {
  console.log("actions hide modal");
  dispatch({
    type: HIDE_MODAL
  });
};
