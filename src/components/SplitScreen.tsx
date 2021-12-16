import React, {useEffect, useState} from 'react';
import classes from './SplitScreen.module.scss'

type TSplit = {
  left: { name: string, element: React.ReactElement },
  right: { name: string, element: React.ReactElement },
}

const SplitScreen: React.FC<TSplit> = (props) => {

  const [isMobile, setMobile] = useState(false)
  const [selectedPanel, setPanel] = useState(1)

  window.onresize = () => {
    if ( isMobile !== ( window.innerWidth< 768) )
      setMobile(window.innerWidth<768);
  }

  useEffect( () => {
    if ( isMobile !== (window.innerWidth< 768 ) )
      setMobile(window.innerWidth<768);
  }, [])
  
  const selectPanel = (panel:number) => {
    setPanel(panel);
  }

  return (
    <div className={classes.splitter}>
      { isMobile && 
        <div className={classes.captions}>
          <button onClick={ () => selectPanel(1)} className={(selectedPanel===1 ? classes.active : "")}>{props.left.name}</button>
          <button onClick={ () => selectPanel(2)} className={(selectedPanel===2 ? classes.active : "")}>{props.right.name}</button>
        </div>
      }
      {(!isMobile || selectedPanel===1) && props.left.element}
      {(!isMobile || selectedPanel===2) && props.right.element}
    </div>
  )
}

export default SplitScreen;