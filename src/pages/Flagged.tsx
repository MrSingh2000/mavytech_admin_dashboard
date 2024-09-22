import React, { useEffect, useState } from 'react';
import {
  FlaggedModels,
  FlaggedType,
  NewsType,
  SalesType,
  ServicesType,
} from '../types';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/saga-green/theme.css';
import { BsFillPostcardFill, BsPostcard } from 'react-icons/bs';
import { Dialog } from 'primereact/dialog';
import { Galleria } from 'primereact/galleria';
import { FaPencilAlt } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { acceptFlaggedAction, getFlagsAction, rejectFlaggedAction } from '../redux/slices/flaggedSlice';
import {Tag} from 'primereact/tag' 
import { createUrl } from '../helper/functions';
import { RiArrowGoBackLine } from "react-icons/ri";
import { CgFileRemove } from 'react-icons/cg';
function Flagged() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState<string>('Services');
  const [selectedFlag, setSelectedFlag] = useState<FlaggedType | null>(null);
  const flaggeditems = useSelector((state: RootState) => state.flagged);
  console.log(flaggeditems);

  useEffect(() => {
    dispatch({ type: getFlagsAction.type });
    console.log('dispatched');
  }, []);

  return (
    <div className="container overflow-hidden ">
      <div className="py-4">
        <ul className=" m-1 text-md font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full focus-within:z-10">
            <button
              onClick={() => setCategory('Services')}
              className={`inline-block w-full p-4  border-s-0 border-gray-200 rounded-s-lg focus:ring-4 hover:bg-gray-50  focus:ring-green-500 focus:outline-none focus:bg-success20percent focus:text-success focus:font-bold ${category === 'Services'? 'bg-success20percent text-success font-bold':'bg-white'}`}            >
              Services
            </button>
          </li>
          <li className="w-full focus-within:z-10">
            <button
              onClick={() => setCategory('Sales')}
              className={`inline-block w-full p-4  border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-green-500 focus:outline-none focus:bg-success20percent focus:text-success focus:font-bold ${category === 'Sales'? 'bg-success20percent text-success font-bold':'bg-white'}`}
            >
              Sales
            </button>
          </li>

          <li className="w-full focus-within:z-10">
            <button
              onClick={() => setCategory('News')}
              className={`inline-block w-full p-4  border-e-0 border-gray-200 rounded-e-lg hover:bg-gray-50 focus:ring-4 focus:ring-green-500 focus:outline-none focus:bg-success20percent focus:text-success focus:font-bold ${category === 'News'? 'bg-success20percent text-success font-bold':'bg-white'}`} 
            >
              News
            </button>
          </li>
        </ul>

        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div
            className="inline-block min-w-full overflow-hidden rounded-lg shadow"
            style={{
              height: '30rem',
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <table className="min-w-full leading-normal">
              <thead className="sticky top-0">
                <tr>
                  <th
                    scope="col"
                    className=" px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Report Date
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Post Details
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Posted By
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Flagged Category
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
                  >
                    Flagged By
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {category === 'Services'
                  ? flaggeditems.services.map((item) => (
                      <ListRow key={item._id} data={item} />
                    ))
                  : category === 'Sales'
                  ? flaggeditems.sales.map((item) => (
                      <ListRow key={item._id} data={item} />
                    ))
                  : flaggeditems.news.map((item) => (
                      <ListRow key={item._id} data={item} />
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
function formatDate(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

type ItemProps = {
  data: FlaggedType;
};

const ListRow = ({ data }: ItemProps) => {
  const [visible, setVisible] = useState(false);
  const itemTemplate = (item) => {
    return (
      <img
        src={item}
        alt="image"
        style={{
          width: '250px',
          height: '150px',
          display: 'block',
          borderRadius: 10,
        }}
        className="object-fill"
      />
    );
  };
  const dispatch = useDispatch();

  return (
    <tr>
      <td className="px-5 py-5  text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap text-center">
          {formatDate(data.createdAt)}
        </p>
      </td>
      <td className=" justify-center px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">
          <button onClick={() => setVisible(true)}>
            <BsPostcard className="text-4xl hover:text-green-500 hover:cursor-pointer" />
          </button>
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap text-center">
        {data.postModel === FlaggedModels.SERVICES
                  ?(data.postDetails as ServicesType).postedBy.name
                  : data.postModel === FlaggedModels.SALES
                  ? (data.postDetails as SalesType).postedBy.name
                  : (data.postDetails as NewsType).postedBy.name}
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap text-center">
          {data.category}
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap text-center">
          {data.reportedBy.name}
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 justify-center align-middle items-center">
        <div className="flex justify-center gap-2">
          <button
          onClick={()=> dispatch({ type: rejectFlaggedAction.type, payload: data._id })}
            type="button"
            className="flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in  duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
          >
            <RiArrowGoBackLine color='white' />
          </button>

          <button
          onClick={()=> dispatch({ type: acceptFlaggedAction.type, payload: data._id })}
            type="button"
            className="flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
          >
            <CgFileRemove color='white' />
          </button>
        </div>
      </td>
      <div></div>
      <Dialog
        visible={visible}
        modal
        headerClassName="h-2"
        className="rounded-xl border-green-600 border-2"
        style={{ width: '20rem', borderRadius: 10 }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        {data.postModel === FlaggedModels.SERVICES ? (
          <div className="flex flex-col justify-center align-middle items-center rounded-full">
            <Galleria
              value={(data.postDetails as ServicesType).imageUrl.map((url)=> createUrl(url))}
              item={itemTemplate}
              showThumbnails={false}
              style={{
                width: '250px',
                height: '180px',
                borderRadius: '20',
                paddingTop: 20,
              }}
              circular
              autoPlay
              transitionInterval={2000}
            />

            <p className="font-bold text-black text-base text-left w-full my-2"> 
              {data.postDetails.title}
            </p>
            <p className="text-black text-xs text-left  w-full"> <i className='font-semibold'> Equipment Name:{' '}</i>
            <p className='text-gray-700 text-sm  m-0'>  {(data.postDetails as ServicesType).equipmentName}</p>
            </p>
            <p className="text-black text-xs text-left w-full">
              Equipement Model:{' '}
             <i className='text-gray-700'> {(data.postDetails as SalesType).equipmentModel}</i>
             
            </p>
            <p className='text-xs font-semibold mt-2 w-full text-left'><i>Description</i></p>
            <hr className="font-extrabold mb-2 w-full" />
            <p className='text-left w-full text-sm mb-2'>{data.postDetails.description}</p>
            <hr className="font-extrabold m-2 w-full" />
            <div className="flex flex-row justify-between text-xs  w-full"><p className='font-semibold'>Created on:</p>
              <p>{formatDate((data.postDetails as ServicesType).createdAt)}</p>
            </div>
          </div>
        ) : data.postModel === FlaggedModels.SALES ? (
          <div className="flex flex-col justify-center align-middle items-center rounded-full">
            <Galleria
              value={(data.postDetails as SalesType).imageUrl.map((url)=> createUrl(url))}
              item={itemTemplate}
              showThumbnails={false}
              style={{
                width: '250px',
                height: '180px',
                borderRadius: '20',
                paddingTop: 20,
              }}
              circular
              autoPlay
              transitionInterval={2000}
            />

            <p className="font-bold text-black text-lg text-left w-full">{(data.postDetails as SalesType).price}</p>
            <p className="font-bold text-black text-base text-left w-full">
              {data.postDetails.title}
            </p>
            <p className="text-black text-xs text-left w-full"> Equipment Name:{' '} 
              {(data.postDetails as SalesType).equipmentName}
            </p>
            <p className="text-black text-xs text-left w-full">Equipement Model:{' '}
              {(data.postDetails as SalesType).equipmentModel}
            </p>
            <p className='text-left w-full my-2'>{data.postDetails.description}</p>
            <hr className="font-bold m-2 w-full" />
            <div className="flex flex-row justify-between  w-full"> <p>Created on</p>
              <p>{formatDate((data.postDetails as SalesType).createdAt)}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center align-middle items-center rounded-full">
            <img
              src={createUrl((data.postDetails as NewsType).imageUrl)}
              alt="image"
              style={{
                width: '250px',
                height: '150px',
                display: 'block',
                borderRadius: 10,
              }}
              className="object-fill"
            />

            <p className="font-bold text-black text-lg text-left w-full">{}</p>
            <p className="font-bold text-black text-base text-left w-full">
              {data.postDetails.title}
            </p>


            <p className='text-left w-full'>{data.postDetails.description}</p>
            <div className='flex flex-row gap-4 justify-start w-full my-2'>{(data.postDetails as NewsType).tags.map((item)=><Tag className='bg-green-600' value={item} rounded></Tag>)}</div>
            
            <hr className="font-bold m-2 w-full" />
            <div className="flex flex-row justify-between w-full"><p>Created on</p>
              <p>{formatDate((data.postDetails as NewsType).createdAt)}</p>
            </div>
          </div>

        )}
      </Dialog>
    </tr>
  );
};

export default Flagged;
