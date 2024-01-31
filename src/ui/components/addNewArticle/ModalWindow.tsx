import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import { UpdateArticle } from './UpdateArticle';
import { AddNewArticle } from './AddNewArticle';

import './ModalWindow.scss';

const Backdrop = (props: any) => {
  return (
    <div
      className='w-full h-screen fixed z-10 bg-sky-100/[.5]'
      onClick={props.onClose}
    />
  );
};

const portalElement = document.getElementById('add-new-article');

const Modal = ({ onClose, props, article }: any) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop id='backdrop' onClose={onClose} />,
        portalElement as any
      )}
      {ReactDOM.createPortal(
        <div className='add-new-article-form'>
          {props ? (
            <UpdateArticle onClose={onClose} article={article} />
          ) : (
            <AddNewArticle onClose={onClose} />
          )}
        </div>,
        portalElement as any
      )}
    </Fragment>
  );
};

export default Modal;
