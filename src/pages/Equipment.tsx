import { useEffect, useState } from 'react';
import EquipmentForm from '../components/equipment/EquipmentForm';
import { EquipmentType } from '../types';
import { useDispatch } from 'react-redux';
import { getEquipmentsAction } from '../redux/slices/equipmentSlice';
import EquipmentList from '../components/equipment/EquipmentList';

function Equipment() {
  const dispatch = useDispatch();

  const [selectedEquipment, setSelectedEquipment] =
    useState<EquipmentType | null>(null);

  useEffect(() => {
    dispatch({ type: getEquipmentsAction.type });
  }, []);

  return (
    <>
      <EquipmentForm
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
      />
      <EquipmentList setSelectedEquipment={setSelectedEquipment} />
    </>
  );
}

export default Equipment;


