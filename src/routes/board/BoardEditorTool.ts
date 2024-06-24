import Embed from '@editorjs/embed'
import List from "@editorjs/list"
import LinkTool from '@editorjs/link'
import ImageTool from '@editorjs/image'
import Header from '@editorjs/header'
import SimpleImage from '@editorjs/simple-image'

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api"

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  list: List,
  linkTool: LinkTool,
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: `${baseURL}/board-service/images/upload`,
        byUrl: ''
      }
    }
  },
  header: Header,
  simpleImage: SimpleImage,
}