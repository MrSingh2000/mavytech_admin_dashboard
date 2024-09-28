import React from 'react';
import pdflogo from '/src/assets/icons8-pdf-100.png';
import { createUrl } from '../../helper/functions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { DocumentType } from '../../types';
import { deleteDocumentAction } from '../../redux/slices/documentSlice';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/saga-green/theme.css';
import { Tooltip } from 'primereact/tooltip';

type Props = {
  setSelectedDocument: React.Dispatch<
    React.SetStateAction<DocumentType | null>
  >;
};

function DocumentGrid(props: Props) {
  const documents = useSelector(
    (store: RootState) => store.document.allDocument
  );

  return (
    <div
      style={{
        height: '24rem',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      className=" mt-10 border-t-2 border-gray-300 grid grid-cols-5 gap-4 justify-center py-6"
    >
      {documents &&
        documents.map((item) => (
          <DocCard data={item} key={item._id} {...props} />
        ))}
    </div>
  );
}

type ItemProps = Props & {
  data: DocumentType;
};

const DocCard = ({ data }: ItemProps) => {
  const dispatch = useDispatch();

  const handleOpenPdf = (url: string) => {
    // Open the PDF in a new tab
    window.open(url, '_blank');
  };

  return (
    <div
      data-pr-tooltip="hi"
      className="filetitle group relative h-48 cursor-pointer overflow-hidden bg-white px-6 pt-5 pb-4 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:max-w-sm sm:rounded-lg sm:px-6"
    >
      <button
        className="absolute top-4 right-4 z-30 text-gray-600 hover:text-gray-900 transition-all duration-300"
        aria-label="Delete card"
        onClick={() =>
          dispatch({ type: deleteDocumentAction.type, payload: data._id })
        }
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <span className="absolute top-5 z-0 h-20 w-20 rounded-full bg-green-500 bg-opacity-70 transition-all duration-300 group-hover:scale-[10]"></span>
      <div
        className="relative z-10 mx-auto max-w-md"
        onClick={() => handleOpenPdf(createUrl(data.url))}
      >
        <span className="grid h-20 w-20 place-items-center rounded-full transition-all duration-300">
          <img src={pdflogo} alt="PDF logo" />
        </span>
        <div className="pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
          <Tooltip
            target=".custom-target-icon"
            mouseTrack
            mouseTrackLeft={10}
          />
          <p
            className="custom-target-icon truncate w-full"
            data-pr-tooltip={data.title}
          >
            {data.title}
          </p>
        </div>
        <Tooltip target="filetitle" className="z-50" event="hover" />
      </div>
    </div>
  );
};

export default DocumentGrid;
