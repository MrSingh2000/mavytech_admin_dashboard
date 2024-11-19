import AdvertisementForm from '../components/addAdvertisements/AdvertisementForm';
import AdvertisementList from '../components/addAdvertisements/AdvertisementList';
import { useEffect, useState } from 'react';
import { AdvertisementType } from '../types';
import { useDispatch } from 'react-redux';
import { getAdvertisementsAction } from '../redux/slices/advertisementSlice';

function Advertisement() {
  const dispatch = useDispatch();

  const [selectedAdvertisement, setSelectedAdvertisement] =
    useState<AdvertisementType | null>(null);

  useEffect(() => {
    dispatch({ type: getAdvertisementsAction.type });
  }, []);

  return (
    <>
      <AdvertisementForm
        selectedAdvertisement={selectedAdvertisement}
        setSelectedAdvertisement={setSelectedAdvertisement}
      />
      <AdvertisementList setSelectedAdvertisement={setSelectedAdvertisement} />
    </>
  );
}

export default Advertisement;
