import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EquipmentType } from '../../types';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { FaPencilAlt, FaImage, FaDownload } from 'react-icons/fa';
import { IoWarning } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from 'react-icons/hi';
import { createUrl } from '../../helper/functions';
import { RootState } from '../../redux/store';
import {
  deleteEquipmentAction,
  getEquipmentsAction,
} from '../../redux/slices/equipmentSlice';

type Props = {
  setSelectedEquipment: React.Dispatch<
    React.SetStateAction<EquipmentType | null>
  >;
};

export default function EquipmentList({ setSelectedEquipment }: Props) {
  const dispatch = useDispatch();
  const equipments = useSelector((store: RootState) => store.equipment.data);
  const totalPages = useSelector(
    (store: RootState) => store.equipment.totalPages
  );
  const totalRecords = useSelector(
    (store: RootState) => store.equipment.totalRecords
  );
  const limit = useSelector((store: RootState) => store.equipment.limit);
  const currentPage = useSelector(
    (store: RootState) => store.equipment.currentPage
  );

  const handlePageChange = (changedPage: number) => {
    dispatch(getEquipmentsAction({ page: changedPage, limit }));
  };

  const handleLimitChange = (value: number) => {
    dispatch(getEquipmentsAction({ page: 1, limit: value }));
  };

  const handleOpenPdf = (url: string) => {
    window.open(url, '_blank');
  };

  const handleEdit = (equipment: EquipmentType) => {
    setSelectedEquipment(equipment);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: deleteEquipmentAction.type, payload: id });
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <div className="mb-6 flex justify-between items-center gap-2">
        <h1 className="text-xl font-bold ms-1 md:text-2xl">Equipment List</h1>
        <div className="flex gap-2 items-center">
          <label htmlFor="limit" className="text-sm font-medium">
            Items per page:{' '}
          </label>
          <Dropdown
            id="limit"
            value={limit}
            options={[3, 5, 10, 15, { label: 'All', value: totalRecords }]}
            onChange={(e) => handleLimitChange(e.value)}
            className="w-[180px] p-1.5 shadow-md rounded"
          />
        </div>
      </div>
      {equipments.length > 0 ? (
        <Accordion multiple className="w-full space-y-4">
          {equipments.map((equipment, index) => (
            <AccordionTab
              key={index}
              header={
                <div className="flex items-center justify-between w-full pr-4 py-2 px-4">
                  <div className="flex items-center space-x-4">
                    {equipment.image ? (
                      <img
                        src={createUrl(equipment.image)}
                        alt={equipment.name}
                        className="rounded-md w-[50px] h-[50px]"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                        <FaImage className="text-gray-400" size={24} />
                      </div>
                    )}
                    <span className="font-semibold text-lg">
                      {equipment.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded-full">
                    {equipment.models.length} models
                  </span>
                </div>
              }
            >
              <Card className="mt-2 rounded-md shadow-md">
                <div className="p-4">
                  <p className="text-gray-600 mb-4">{equipment.description}</p>
                  <div className="grid grid-cols-5 gap-4 font-semibold mb-2 px-4 py-2 bg-gray-100 rounded-md">
                    <div>Model</div>
                    <div>User Manual</div>
                    <div>Service Manual</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  {equipment.models.map((model) => (
                    <div
                      key={model._id}
                      className="grid grid-cols-5 gap-4 border-b last:border-b-0 py-3 px-4 items-center"
                    >
                      <div className="font-medium">{model.machineModel}</div>
                      <div>
                        {model.userManual ? (
                          <Button
                            icon={<FaDownload className="text-white" />}
                            onClick={() =>
                              handleOpenPdf(createUrl(model.userManual))
                            }
                            className="p-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
                          />
                        ) : (
                          <div className="flex items-center text-yellow-600">
                            <IoWarning size={25} />
                          </div>
                        )}
                      </div>
                      <div>
                        {model.serviceManual ? (
                          <Button
                            icon={<FaDownload className="text-white" />}
                            onClick={() =>
                              handleOpenPdf(createUrl(model.serviceManual))
                            }
                            className="p-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
                          />
                        ) : (
                          <div className="flex items-center text-yellow-600">
                            <IoWarning size={25} />
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2 col-span-2">
                        <Button
                          icon={<FaPencilAlt className="text-white" />}
                          onClick={() =>
                            handleEdit({
                              name: equipment?.name,
                              description: equipment?.description,
                              image: equipment?.image,
                              _id: model?._id,
                              machineModel: model?.machineModel,
                              userManual: model?.userManual,
                              serviceManual: model?.serviceManual,
                            })
                          }
                          className="p-0 w-8 h-8 bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700"
                        />
                        <Button
                          icon={<MdDeleteForever className="text-white" />}
                          onClick={() => handleDelete(model?._id)}
                          className="p-0 w-8 h-8 bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </AccordionTab>
          ))}
        </Accordion>
      ) : (
        <div className="flex justify-center items-center h-[200px]">
          <p className="text-gray-600 text-xl">No equipments found</p>
        </div>
      )}

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex justify-center items-center gap-2">
          <Button
            icon={<HiOutlineChevronDoubleLeft className="h-4 w-4" />}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="p-0 w-8 h-8"
          />
          <Button
            icon={<HiOutlineChevronLeft className="h-4 w-4" />}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-0 w-8 h-8"
          />

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              label={`${page}`}
              onClick={() => handlePageChange(page)}
              className={`p-0 w-8 h-8 ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 border-blue-600'
              }`}
            />
          ))}

          <Button
            icon={<HiOutlineChevronRight className="h-4 w-4" />}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-0 w-8 h-8"
          />
          <Button
            icon={<HiOutlineChevronDoubleRight className="h-4 w-4" />}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-0 w-8 h-8"
          />
        </div>
        <p className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
}
