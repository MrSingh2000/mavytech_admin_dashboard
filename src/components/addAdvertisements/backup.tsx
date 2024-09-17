import React from 'react';


function AdvertisementList() {


  return (
    <div className="container max-w-3xl px-4 mx-auto sm:px-8">
      <div className="py-8">
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Thumbnail
                  </th>
                  
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
                  >
                    Advertisement Link
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Target Cities
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Target Countries
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Active State
                  </th>
                </tr>
              </thead>
              <tbody>
              </tbody>
              <ListItem/>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}



const ListItem = () => {

  return (
    <tr>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <image />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">Name</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap text-center">
          description
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">
            <button
              type="button"
              className="flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-8 h-8 rounded-lg "
             
            >
            </button>
         
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex justify-center">
            <button
              type="button"
              className="flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-8 h-8 rounded-lg "
            >
            </button>
            
       
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 ">
        <div className="flex gap-2">
          <button
            type="button"
            className="flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
          >
            
          </button>

          <button
            type="button"
            className="flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
            
          >
            
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdvertisementList;
