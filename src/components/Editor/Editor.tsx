import React, { useEffect, useState, useRef } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import CodeEditor from 'components/Editor/CodeEditor';
import Board from 'components/Editor/Board';
import Sidebar from 'components/Editor/Sidebar';
import { Tool } from 'features/boardSlices';

export const NAVBAR_HEIGHT = 110;
const SIDEBAR_WIDTH = 48;

interface EditorProps {
  tool: Tool;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
    },
    editor: {
      width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
    },
    codeEditor: {
      width: '100%',
      height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
    },
    canvas: {
      top: NAVBAR_HEIGHT,
      height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
      position: 'fixed',
      /**
       * z-index
       * 1:  Show code mirror first
       * 10: Show canvas first
       */
      zIndex: (tool: Tool) => (tool === Tool.None ? 1 : 10),
    },
  }),
);

export default function Editor({ tool }: EditorProps) {
  const classes = useStyles(tool);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => {
      if (!divRef.current) {
        return;
      }

      const rect = divRef.current?.getBoundingClientRect();
      setWidth(rect.width);
      setHeight(rect.height);
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.editor} ref={divRef}>
        <div className={classes.codeEditor}>
          <CodeEditor />
        </div>
        <div className={classes.canvas}>
          <Board width={width} height={height} />
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
