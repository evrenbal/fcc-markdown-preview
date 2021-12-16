/* React Hooks */
import {useState} from 'react';

/* External Libraries */
import {marked} from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'

/* Css Modules */
import classes from './Preview.module.scss';

const escapeHtml = (html:string): string => {
  return html
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;")
  .replace(/\n/g, "<br>");
}

const stripHtml = (html:string): string => {
  let tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

const wordCount = (text:string): number => {
  text = text.trim();
  if (text.length === 0) return 0;
  return text.split(/\s+/).length;
}

const readingTime = (text:string): string => {
  const wordsPerMinute = 236;
  const words = wordCount(text);
  const minutes = Math.floor( words/wordsPerMinute);
  const seconds = Math.round((words%wordsPerMinute)/wordsPerMinute*60);
  return minutes+"m"+(seconds > 0 ? " "+seconds+"s" : '');
}


const Preview: React.FC<{value: string}> = (props) => {

const [htmlView, setHtmlView] = useState(false);

marked.setOptions({
  breaks: true,
  highlight: function (code:string) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

const handleViewChoice:React.ChangeEventHandler<HTMLSelectElement> = (e) => {
  if (e.target.value==="1")
    setHtmlView(false);
  else
    setHtmlView(true)
}

const content = htmlView ? escapeHtml(marked(props.value)) : marked(props.value) ;

  return (
    <div className={classes["preview-container"]}>
      <div className={classes.title}>
        {htmlView ? 'CODE PREVIEW' : 'MARKDOWN PREVIEW'}
      </div>
      <div className={classes["view-choice"]}>
          <select onChange={handleViewChoice}>
            <option value="1">Preview</option>
            <option value="2">Html Code</option>
          </select>
      </div>
      <div className={classes.stats}>
        <div>
          <label>Word Count:</label>
          <span>{wordCount(stripHtml(props.value))}</span>
        </div>        
        <div>
          <label>Char Count:</label>
          <span>{stripHtml(props.value).length}</span>
        </div>        
        <div>
          <label>Reading Time:</label>
          <span>{readingTime(stripHtml(props.value))}</span>
        </div>        
      </div>
      <div id="preview"
        className={classes["preview-inner"]}
        dangerouslySetInnerHTML={{
          __html: content
        }}>
      </div>
    </div>      
  )
}

export default Preview;