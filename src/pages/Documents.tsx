import DocumentGrid from "../components/documents/DocList";
import DocUploadForm from "../components/documents/DocUploadForm";
import { useEffect, useState } from 'react';
import { DocumentType } from '../types';
import { useDispatch } from 'react-redux';
import { getDocumentsAction } from '../redux/slices/documentSlice';


function Documents() {
  const dispatch = useDispatch();

  const [selectedDocument, setSelectedDocument] =
    useState<DocumentType | null>(null);

  useEffect(() => {
    dispatch({ type: getDocumentsAction.type });
  }, []);

  return (
    <>
      <DocUploadForm/>
      <DocumentGrid setSelectedDocument={setSelectedDocument} />
    </>
  );
}

export default Documents;
