/* React Hooks */
import {useState, useEffect} from 'react';
/* Custom Hooks */
import useStore from 'hooks/use-store';
/* Css Modules */
import * as classes from './App.module.scss';
/* Child Components */
import SplitScreen from 'components/SplitScreen';
import Editor from 'components/Editor';
import Preview from 'components/Preview';

function App() {

  // Editor will only write data to the store
  const [markDown, dispatch] = useStore("markdown", true);
  const [initialValue, setInitialValue] = useState<string|null>(null);
  const handleChange = (value:string): void => {
    dispatch("SET", value);
  }

  useEffect( () => {
    if (initialValue === null)
      setInitialValue(markDown);
  }, [markDown, initialValue]);

  return (
    <div className="h-screen overflow-hidden">
      <SplitScreen
        left= {{name: 'MARKDOWN', element: <Editor initialValue={initialValue} onChange={handleChange}/>}}
        right= {{name: 'PREVIEW', element: <Preview value={markDown}/>}}
      />
    </div>      
  );
}

export default App;
