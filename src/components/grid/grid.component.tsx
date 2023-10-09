import Cell from '../cell/cell.component';
import { useState, useEffect, Fragment } from 'react';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const Grid = () => {
  const [height, setHeight] = useState(50);
  const [width, setWidth] = useState(50);
  const [cells, setCells] = useState<boolean[][]>(() => {
    // Initialize the state with the correct number of rows and columns
    const arr: boolean[][] = [];

    for (let i = 0; i < height; i++) {
      arr[i] = [];

      for (let j = 0; j < width; j++) {
        arr[i][j] = false;
      }
    }

    return arr;
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const getAliveNeighboursCount = (x: number, y: number): number => {
    let aliveNeighbours = 0;

    const numRows = cells.length;
    const numCols = cells[0].length;

    const startX = Math.max(0, x - 1);
    const endX = Math.min(numRows - 1, x + 1);
    const startY = Math.max(0, y - 1);
    const endY = Math.min(numCols - 1, y + 1);

    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        // Skip the current cell
        if (i === x && j === y) continue;

        if (cells[i][j]) aliveNeighbours = aliveNeighbours + 1;
      }
    }

    return aliveNeighbours;
  };

  const updateCellValue = (newValue: boolean, y: number, x: number) => {
    setCells((prevCells) => {
      const newCells = [...prevCells];
      newCells[y][x] = newValue;
      return newCells;
    });
  };

  const updateCell = (oldCells: boolean[][], y: number, x: number) => {
    if (isUpdating) {
      if (oldCells[y][x] && getAliveNeighboursCount(y, x) < 2)
        updateCellValue(false, y, x);
      else if (oldCells[y][x] && getAliveNeighboursCount(y, x) > 3)
        updateCellValue(false, y, x);
      else if (!oldCells[y][x] && getAliveNeighboursCount(y, x) === 3)
        updateCellValue(true, y, x);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCells((prevCells) => {
        const newCells = prevCells.slice().map((row) => [...row]);
        for (let i = 0; i < height; i++) {
          for (let j = 0; j < width; j++) {
            updateCell(prevCells, i, j);
          }
        }
        return newCells;
      });
    }, 250);

    return () => clearInterval(interval); // Clean up the interval
  });

  const handlePlay = () => {
    setIsUpdating(true);
  };

  const handlePause = () => {
    setIsUpdating(false);
  };


  return (


    <Fragment>
      <div style={{display:'flex', flexDirection:'row', gap:'10px'}}>
        <Button variant="contained" startIcon={<PlayArrowIcon/>} onClick={handlePlay}>Play</Button>
        <Button variant="contained" startIcon={<PauseIcon/>} onClick={handlePause}>Pause</Button>
      </div>

      <div style={{marginTop:'20px'}}>
        {cells.map((row, rowIndex) => (
          <div key={rowIndex} style={{display:'flex', flexDirection:'row'}}>
            {row.map((item, itemIndex) => (
              <div key={itemIndex}>
                <Cell
                y={rowIndex}
                x={itemIndex}
                isAlive={item}
                updateCellValue={updateCellValue}
                getAliveNeighboursCount={getAliveNeighboursCount}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  )
  
}

export default Grid