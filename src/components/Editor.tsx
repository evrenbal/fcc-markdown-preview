/* React Hooks */
import React, { useState } from 'react';
/* External Components/Libraries etc. */
import TextareaAutosize from 'react-textarea-autosize';
/* Css Modules */
import classes from './Editor.module.scss';

type TEditorParams = {
  initialValue: string|null
  onChange: (value:string) => void
  lineHeight?: number
}

const Editor: React.FC<TEditorParams> = (props) => {
  
  let textElement:HTMLTextAreaElement| null;

  const initialValue:string = props.initialValue ?? '';
  const lineHeight:number = props.lineHeight ?? 24;
  const [lines, setLines] = useState<React.ReactNode[]>([])

  const handleHeightChange = (height:number): void => { 
    const numberOfLines = Math.ceil(height/lineHeight);
    const newLines:React.ReactNode[] = Array(numberOfLines);
    for (let i = 1; i <= numberOfLines; i++)
      newLines.push(<div key={`line${i}`}>{i}</div>);
    setLines(newLines);
  }

  const clickEditorHandle:React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (textElement)
      textElement.focus();
  }

  return (
    <div className={classes["editor-container"]}>

      <div className={classes["lines-background"]}></div>
      <div className={classes["title"]}>
        ENTER MARKDOWN BELOW
      </div>
      <div className={classes["editor-inner"]} onClick={clickEditorHandle} style={{lineHeight: lineHeight+'px'}}>

        <div className={classes.lines}>
          {lines}
        </div>
        <TextareaAutosize
          ref={(elm) => (textElement = elm)}
          id="editor"
          className={classes["text-editor"]}
          onHeightChange = {handleHeightChange}
          onChange={ (e) => {props.onChange(e.target.value)}}
          defaultValue={initialValue}
          style={{lineHeight: lineHeight+'px'}}
          onClick={ (e) => e.stopPropagation() }
        />
      </div>
    </div>     
  )
}

export default Editor;