declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "@editorjs/header" {
  import Header from "@editorjs/header";
  export = Header;
}

declare module "@editorjs/list" {
  import List from "@editorjs/list";
  export = List;
}

declare module "@editorjs/link" {
  import Table from "@editorjs/link";
  export = Table;
}

declare module "@editorjs/image" {
  import Table from "@editorjs/image";
  export = Table;
}

declare module "@editorjs/simple-image" {
  import Table from "@editorjs/simple-image";
  export = Table;
}

declare module "@editorjs/embed" {
  import Table from "@editorjs/embed";
  export = Table;
}