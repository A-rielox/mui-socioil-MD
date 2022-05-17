import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

const config = {
   buttons: ['bold', 'italic', 'link', 'unlink', 'underline', 'source'],
   removeButtons: ['table', 'fullsize', 'copyformat', 'eraser', 'dots'],
};

const Editor = ({ initialValue, setContent }) => {
   const editor = useRef(null);

   return (
      <JoditEditor
         ref={editor}
         value={initialValue}
         config={config}
         tabIndex={1}
         //   onBlur={(newContent) => getValue(newContent)}
         onChange={newContent => setContent(newContent)}
      />
   );
};

export default Editor;
