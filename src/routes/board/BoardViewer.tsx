import React, { useCallback, useEffect, useRef, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./BoardEditorTool";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import "./BoardViewer.css"

type BoardViewerProps = {
  /**
   * OutputData
   * blocks: [],
   * time: Number,
   * version: String
   */
  strData: string,
}

const BoardViewer: React.FC<BoardViewerProps> = ({ strData }) => {
  const [data, setData] = useState<OutputData>();
  const ReactEditorJS = createReactEditorJS();
  const editorCore = useRef<EditorJS | null>(null);

  const handleEditorInit = useCallback((instance: any) => {
    editorCore.current = instance;
  }, []);

  const parseStrData = useCallback((strData: string) => {
    console.log(JSON.parse(strData));
    return JSON.parse(strData);
  }, []);

  // useEffect(() => {
  //   console.log(parseStrData(strData));
  //   if (editorCore != null && editorCore.current != null) {
  //     editorCore.current?.render(parseStrData(strData));
  //   }
  // }, [strData, editorCore, editorCore.current]);


  return (
    <div>
      <ReactEditorJS onInitialize={handleEditorInit}
        tools={EDITOR_JS_TOOLS}
        readOnly={true}
        defaultValue={parseStrData(strData)}
      />
    </div>
  )
};

export default BoardViewer;
