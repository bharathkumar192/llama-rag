import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

const FileInput = () => {
  const inputRef = useRef(null); // Create a ref for the input element
  const allowedFileTypes = ['pdf', 'doc', 'docx', 'md', 'html', 'py', 'txt'];

  useEffect(() => {
    const checkAndInitialize = () => {
      if (window.jQuery && window.jQuery.fn.fileinput) {
        window.jQuery(inputRef.current).fileinput({
          theme: 'explorer',
          uploadUrl: '/file-upload-batch/2', // Set your upload URL
          allowedFileExtensions: allowedFileTypes,
          overwriteInitial: false,
          maxFileSize: 10000,
          removeFromPreviewOnError: true
        });
      } else {
        setTimeout(checkAndInitialize, 100);
      }
    };

    checkAndInitialize();

    return () => {
      // Make sure to destroy fileinput instance when component unmounts
      if (window.jQuery && window.jQuery.fn.fileinput) {
        window.jQuery(inputRef.current).fileinput('destroy');
      }
    };
  }, []);

  return (
    <div>
      <Helmet>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.5.4/css/fileinput.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.min.css" crossorigin="anonymous" />
        <script src={`https://code.jquery.com/jquery-3.6.0.min.js?ts=${new Date().getTime()}`} defer></script>
        <script src={`https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js?ts=${new Date().getTime()}`} defer></script>
        <script src={`https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.5.4/js/fileinput.min.js?ts=${new Date().getTime()}`} defer></script>
      </Helmet>
      <input 
        ref={inputRef}
        type="file" 
        className="file" 
        id="input-b7" 
        multiple
        data-msg-placeholder="Select {files} for upload..."
      />
    </div>
  );
};

export default FileInput;
