declare module "react-quill" {
    import { Component } from "react";
  
    interface QuillProps {
      value?: string;
      defaultValue?: string;
      placeholder?: string;
      theme?: string;
      onChange?: (value: string) => void;
      onFocus?: () => void;
      onBlur?: () => void;
      readOnly?: boolean;
      modules?: any;
      formats?: string[];
      bounds?: string | HTMLElement;
      scrollingContainer?: string | HTMLElement | null;
      style?: React.CSSProperties;
    }
  
    class ReactQuill extends Component<QuillProps> {}
    export default ReactQuill;
  }
  