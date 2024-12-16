import DocumentGrid from '../components/documents/DocList';
import DocUploadForm from '../components/documents/DocUploadForm';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDocumentsAction } from '../redux/slices/documentSlice';

function Documents() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: getDocumentsAction.type });
    console.log('rendered')
  }, []);

  return (
    <>
      <DocUploadForm />
      <DocumentGrid />
    </>
  );
}

export default Documents;
