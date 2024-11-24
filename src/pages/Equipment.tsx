import { useEffect, useState, useRef } from 'react';
import EquipmentForm from '../components/equipment/EquipmentForm';
import { EquipmentType } from '../types';
import { useDispatch } from 'react-redux';
import { getEquipmentsAction } from '../redux/slices/equipmentSlice';
import EquipmentList from '../components/equipment/EquipmentList';

function Equipment() {
  const dispatch = useDispatch();
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType | null>(null);

  // Ref to handle scroll to top
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch({ type: getEquipmentsAction.type });
  }, [dispatch]);

  // Scroll to top wheFn selected equipment changes
  const handleFormScroll = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  return (
    <>
      <div ref={formRef}>
        <EquipmentForm
          selectedEquipment={selectedEquipment}
          setSelectedEquipment={setSelectedEquipment}
        />
      </div>
      <EquipmentList setSelectedEquipment={setSelectedEquipment} handleFormScroll={handleFormScroll} />
    </>
  );
}

export default Equipment;
