import React from 'react';

type Props = {
  children: React.ReactNode;
  contentStyleClass?: string;
  containerStyleClass?: string;
  setModalVisible: (val: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  buttons: [string | null, string | null];
  buttonStyleClass?: string[];
};

function ModalPopup({
  children,
  contentStyleClass,
  containerStyleClass,
  setModalVisible,
  onCancel,
  onConfirm,
  buttonStyleClass,
  buttons,
}: Props) {
  return (
    <div className="bg-[#0000004d] absolute top-0 left-0 w-screen h-screen flex justify-center items-center z-50">
      <div
        className={`w-64 p-4 m-auto bg-white shadow-lg rounded-2xl dark:bg-gray-800 ${containerStyleClass} max-h-[90vh] overflow-y-scroll`}
      >
        <div className="w-full h-full">
          <div
            className={`flex flex-col justify-between h-full ${contentStyleClass}`}
          >
            {children}
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-4 mt-8">
          {buttons && buttons[0] ? (
            <button
              onClick={onConfirm}
              type="button"
              className={`py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ${
                buttonStyleClass && buttonStyleClass[0]
              }`}
            >
              {buttons[0]}
            </button>
          ) : null}
          {buttons && buttons[1] ? (
            <button
              onClick={() => {
                if (onCancel) onCancel();
                setModalVisible(false);
              }}
              type="button"
              className={`py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ${
                buttonStyleClass && buttonStyleClass[1]
              }`}
            >
              {buttons[1]}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ModalPopup;
