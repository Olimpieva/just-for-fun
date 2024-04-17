import { createAction } from "@reduxjs/toolkit";
import { ModalType } from "./types";

const showModal = createAction<ModalType>("modal/showModal");

const hideModal = createAction<ModalType>("modal/hideModal");

export { showModal, hideModal };
