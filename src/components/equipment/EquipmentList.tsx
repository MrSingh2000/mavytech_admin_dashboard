import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EquipmentType } from '../../types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FaPencilAlt, FaImage, FaDownload } from 'react-icons/fa'
import { IoWarning } from 'react-icons/io5'
import { MdDeleteForever } from 'react-icons/md'
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight  } from 'react-icons/hi'
import { createUrl } from '../../helper/functions'
import { RootState } from '../../redux/store'
import { deleteEquipmentAction, getEquipmentsAction } from '../../redux/slices/equipmentSlice'

type Props = {
  setSelectedEquipment: React.Dispatch<React.SetStateAction<EquipmentType | null>>
}

export default function EquipmentList({ setSelectedEquipment }: Props) {
  const dispatch = useDispatch()
  const equipments = useSelector((store: RootState) => store.equipment.data)
  const totalPages = useSelector((store: RootState) => store.equipment.totalPages)
  const limit = useSelector((store: RootState) => store.equipment.limit)
  const currentPage = useSelector((store: RootState) => store.equipment.currentPage)

  const handlePageChange = (changedPage: number) => {
    dispatch(getEquipmentsAction({ page: changedPage, limit }))
  }

  const handleLimitChange = (value: number) => {
    dispatch(getEquipmentsAction({ page: 1, limit: value }))
  }

  const handleOpenPdf = (url: string) => {
    window.open(url, '_blank')
  }

  const handleEdit = (equipment: EquipmentType) => {
    setSelectedEquipment(equipment)
  }

  const handleDelete = (id: string) => {
    dispatch({ type: deleteEquipmentAction.type, payload: id })
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <div className='mb-4 flex justify-between items-center gap-2'>
        <h1 className='text-xl font-bold ms-1 md:text-2xl'>Equipment List</h1>
        <div className='flex gap-2 items-center'>
        <Label htmlFor="limit">Items per page: </Label>
        <Select value={`${limit}`} onValueChange={(value) => handleLimitChange(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select limit" />
          </SelectTrigger>
          <SelectContent>
            {[3, 5, 10, 15].map((value) => (
              <SelectItem key={value} value={`${value}`}>{value}</SelectItem>
            ))}
            <SelectItem value="0">All</SelectItem>
          </SelectContent>
        </Select>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {equipments.map((equipment: any, index: number) => (
          <AccordionItem value={`${index}`} key={index} className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4 py-2 px-4">
                <div className="flex items-center space-x-4">
                  {equipment.image ? (
                    <img src={createUrl(equipment.image)} alt={equipment.name} className="rounded-md w-[50px] h-[50px]" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                      <FaImage className="text-gray-400" size={24} />
                    </div>
                  )}
                  <span className="font-semibold text-lg">{equipment.name}</span>
                </div>
                <span className="text-sm text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
                  {equipment.models.length} models
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <Card className="mt-2 rounded-md">
                <CardContent className="p-4">
                  <p className="text-muted-foreground mb-4">{equipment.description}</p>
                  <div className="grid grid-cols-5 gap-4 font-semibold mb-2 px-4 py-2 bg-primary/5 rounded-md">
                    <div>Model</div>
                    <div>User Manual</div>
                    <div>Service Manual</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  {equipment.models.map((model) => (
                    <div key={model._id} className="grid grid-cols-5 gap-4 border-b last:border-b-0 py-3 px-4 items-center">
                      <div className="font-medium">{model.machineModel}</div>
                      <div>
                        {model.userManual ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenPdf(createUrl(model.userManual))}
                            className="flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-8 h-8 rounded-lg"
                          >
                            <FaDownload size={25} color='white' />
                          </Button>
                        ) : (
                          <div className="flex items-center text-yellow-600">
                            <IoWarning size={25} />
                          </div>
                        )}
                      </div>
                      <div>
                        {model.serviceManual ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenPdf(createUrl(model.serviceManual))}
                            className="flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-8 h-8 rounded-lg"
                          >
                            <FaDownload size={25} color="white" />
                          </Button>
                        ) : (
                          <div className="flex items-center text-yellow-600">
                            <IoWarning size={25} />
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2 col-span-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit({
                            name: equipment?.name,
                            description: equipment?.description,
                            image: equipment?.image,
                            _id: model?._id,
                            machineModel: model?.machineModel,
                            userManual: model?.userManual,
                            serviceManual: model?.serviceManual
                          })}
                          className="flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
                        >
                          <FaPencilAlt color='white' />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(model?._id)}
                          className="flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-8 h-8 rounded-lg "
                        >
                          <MdDeleteForever color='white' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className='mt-8 flex flex-col items-center gap-4'>
        <div className='flex justify-center items-center gap-2'>
          <Button variant='outline' size='sm' disabled={currentPage === 1} onClick={() => handlePageChange(1)}>
            <HiOutlineChevronDoubleLeft className="h-4 w-4" />
          </Button>
          <Button variant='outline' size='sm' disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            <HiOutlineChevronLeft className="h-4 w-4" />
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size='sm'
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? 'bg-primary text-primary-foreground' : ''}
            >
              {page}
            </Button>
          ))}
          
          <Button variant='outline' size='sm' disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            <HiOutlineChevronRight className="h-4 w-4" />
          </Button>
          <Button variant='outline' size='sm' disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>
            <HiOutlineChevronDoubleRight className="h-4 w-4" />
          </Button>
        </div>
        <p className='text-sm text-muted-foreground'>
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  )
}
