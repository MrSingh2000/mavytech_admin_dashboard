import { FaPencilAlt } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import React, { useState} from 'react';
import { Image } from 'primereact/image';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/saga-green/theme.css';
import { LuScreenShare } from 'react-icons/lu';
import { createUrl } from '../../helper/functions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { AdvertisementType } from '../../types';
import { deleteAdvertisementAction, updateAdvertisementAction } from '../../redux/slices/advertisementSlice';

type Props = {
  setSelectedAdvertisement: React.Dispatch<
    React.SetStateAction<AdvertisementType | null>
  >;
};

function AdvertisementList(props: Props) {

  const advertisements = useSelector(
    (store: RootState) => store.advertisement.allAdvertisement
  );

  return (
    <div className="container">
    
      <div className="flex-1 py-8 ">
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-scroll rounded-lg shadow" style={{
                height: '30rem', 
                overflowY: 'scroll',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}>
            <table className='m-auto'>
              <thead className="sticky top-0 z-10">
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 font-semibold text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Thumbnail
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Advertisement Name
                  </th>
                  
                  
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
                  >
                    Advertisement Link
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Target Countries
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Target States
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Active
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {advertisements&&
                 advertisements.map((item)=>(
                  <ListItem data={item} key={item._id} {...props}/>
                ))}
              </tbody>
              
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

type ItemProps = Props & {
  data: AdvertisementType;
};

const ListItem = ({data, setSelectedAdvertisement}: ItemProps) => {
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(data.active);
  const handleToggle = () => {
    const updatedData = {
      targetCity: data.targetCity,
      targetCountry: data.targetCountry,
      active: !isActive
    };
    setIsActive(!isActive);

    dispatch({
      type: updateAdvertisementAction.type,
      payload: { data: updatedData, id: data._id },
    });
  };
  const handleOpenAd = (url: string) => {
    window.open(url, '_blank');
  };
  const handleEdit = () => {
    setSelectedAdvertisement(data);
  };
  return (
    <tr className='w-full'>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
              
          <Image src={createUrl(data.thumbnail)} alt="Image" width='84'   preview className='text-white z-0 ' />
        
          </div>
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap text-center">
          {data.title}
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">
          <button onClick={()=>handleOpenAd(`${data.url}`)}>
          <LuScreenShare className='text-3xl hover:text-green-500 hover:cursor-pointer' />
         
          </button>
              
        </div>
      </td>
      <td className="pl-5 pr-2 py-5 text-sm bg-white border-b border-gray-200">
      <div
            style={{
                height: '4rem',
                overflowY: 'scroll',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}
            className=" flex flex-row flex-wrap justify-center"
        >
          {data.targetCountry && data.targetCountry.map((item)=>(<span className="bg-gray-100 text-gray-800 text-xs h-5 font-medium me-2 mt-1 px-2.5 py-0.5 trunacte text-nowrap overflow-ellipsis rounded-full dark:bg-gray-700 dark:text-gray-300">{item}</span>))}
          
          
          
          </div>
      </td>
      <td className="py-5 pl-5 pr-2 text-sm bg-white border-b border-gray-200">
      <div
            style={{
                height: '4rem',
                overflowY: 'scroll',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}
            className=" flex flex-row flex-wrap justify-center "
        >
                    {data.targetCity && data.targetCity.map((item)=>(<span className="bg-gray-100 text-gray-800 h-5 text-xs font-medium me-2 mt-1 px-2.5 py-0.5 rounded-full trunacte text-nowrap overflow-ellipsis dark:bg-gray-700 dark:text-gray-300">{item}</span>))}

          
          </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 ">
      <div
      onClick={handleToggle} className={`w-fit text-sm m-auto rounded-3xl px-4 py-1 text-center cursor-pointer ${
        isActive
        ? 'bg-green-200 text-green-600 border-2 border-green-400'
        : 'bg-red-200 text-red-600 border-2 border-red-400'
}`}>
    {isActive ? 'Active' : 'Inactive'}
</div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 ">
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            type="button"
            className="flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in  duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
          >
            <FaPencilAlt color="white" />
          </button>

          <button
          onClick={()=>dispatch({type: deleteAdvertisementAction.type, payload: data._id})}
            type="button"
            className="flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
            
          >
            <MdDeleteForever color="white" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdvertisementList;