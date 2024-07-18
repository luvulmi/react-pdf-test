import { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import CommPopupPdfView from './CommPopupPdfView';

// pdf.js 설정
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function App() {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedPdfFile, setSelectedPdfFile] = useState('');

  // 클릭한 파일이 pdf인지 확인. pdf 인경우 모달 오픈
  const handleFileClick = (event) => {
    const { files } = event.target;
    // console.log('files=>',files);
    const nextFile = files?.[0];
    // console.log('nextFile=>',nextFile);
    
    if (nextFile) {
      const regex_pdf = /\.pdf$/i;
        if(regex_pdf.test(nextFile.name)) {
          setSelectedPdfFile(nextFile)
          setShowPdfModal(true)
        } else {
          alert('pdf파일만 업로드해주세요.');
        }
    }
    // 이벤트 초기화
    event.target.value = ''
  }

  // 닫기 클릭시
  const handleCloseModal = () => {
    setSelectedPdfFile('');
    setShowPdfModal(false);
  }

  return (
    <>
      {/* {
        item.boardFile?.map((file, i) => (
        <div className='file-link'>
          <a href={`${file.boardFileName}`} onClick={e => {
          e.preventDefault();
          handleFileClick(file.boardFileName);
          }}>{file.boardFileOrigin}</a>
        </div>
        ))
      } */}
      <div>
        <label htmlFor="file">Load from file:</label>{' '}
        <input onChange={handleFileClick} type="file" />
      </div>
      {showPdfModal && (
        <CommPopupPdfView selectedImage={selectedPdfFile} handleCloseModal={() =>
          handleCloseModal('pdf')}/>
        )}
    </>
  )
}