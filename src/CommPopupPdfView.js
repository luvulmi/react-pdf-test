
import React, { useEffect, useRef, useState } from "react"; 
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import ImageButtonClose from './xx.png';
// import './modal.css';

// pdf.js 설정
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const BaseMain = (props) => {
  const [numPages, setNumPages] = useState(null); // Total 페이지 수
  const [pageNumber, setPageNumber] = useState(1); // 현재 렌더링된 페이지 번호

  const pdfRef = useRef(null);

  const {selectedImage, handleCloseModal} = props;

  function onDocumentLoadSuccess({ numPages }) { 
    setNumPages(numPages);
  }

return (
    <>
      <div className="modal-pdf">
        <Document
          inputRef={pdfRef}
          file={selectedImage}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} width={pdfRef.current?.clientWidth} height= {pdfRef.current?.clientHeight} />
        </Document>
        <div style={{textAlign: 'center'}}>
          <span onClick={() => pageNumber> 1 ? setPageNumber(pageNumber-1):null}>
            &lt;</span>
          <span>{pageNumber} / {numPages}</span>
          <span onClick={() => pageNumber < numPages? setPageNumber(pageNumber+1):null}>
          &gt;</span>
        </div>
        <div style={{textAlign: 'center'}}>
          <button className="close-btn" onClick={handleCloseModal}>
            {/* <img src={ImageButtonClose} alt=""/>
            */}
            닫기
          </button>
        </div>
      </div>
    </>
  )
}

export default BaseMain;