import React from 'react';

type Props = {
  handleConfirm: (...args: any[]) => any;
  handleCancel: (...args: any[]) => any;
  title: string;
  description: string;
  buttonTexts: [string | null, string | null];
  buttonClassName?: [string | null, string | null];
  buttonStyle?: [
    React.CSSProperties | undefined,
    React.CSSProperties | undefined
  ];
  footerClassName?: string;
  footerStyle?: React.CSSProperties;
  HeaderIcon?: JSX.Element;
};

function ConfirmationCard({
  buttonTexts,
  description,
  title,
  footerClassName,
  footerStyle,
  buttonClassName,
  buttonStyle,
  HeaderIcon,
  handleCancel,
  handleConfirm,
}: Props) {
  return (
    <>
      <div className="z-20 w-64 p-4 m-auto bg-white shadow-lg rounded-2xl dark:bg-gray-800 absolute top-[30%] left-[45%]">
        <div className="w-full h-full text-center">
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-center">{HeaderIcon}</div>
            <p className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">
              {title}
            </p>
            <p className="px-6 py-2 text-xs text-gray-600 dark:text-gray-400">
              {description}
            </p>
            <div
              style={footerStyle}
              className={`${footerClassName} flex items-center justify-between w-full gap-4 mt-8`}
            >
              {buttonTexts && buttonTexts[0] ? (
                <button
                  onClick={handleCancel}
                  type="button"
                  style={buttonStyle && buttonStyle[0]}
                  className={`${
                    buttonClassName && buttonClassName[0]
                      ? buttonClassName[0]
                      : ''
                  } py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg`}
                >
                  {buttonTexts[0]}
                </button>
              ) : null}
              {buttonTexts && buttonTexts[1] ? (
                <button
                  onClick={handleConfirm}
                  type="button"
                  style={buttonStyle && buttonStyle[1]}
                  className={`${
                    buttonClassName && buttonClassName[1]
                      ? buttonClassName[1]
                      : ''
                  } py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg`}
                >
                  {buttonTexts[1]}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen h-screen absolute top-0 left-0 bg-[#a8a6a66e] z-10"></div>
    </>
  );
}

export default ConfirmationCard;
