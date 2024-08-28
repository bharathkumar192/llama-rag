import React from "react";
import FileInput from "../fileUpload/fileInput";

function App() {
  const uniqueKey = Date.now();  

  return (
    <div>
      <h1>Upload Your Files</h1>
      <FileInput key={uniqueKey} /> 
    </div>
  );
}

export default App;
