import React from 'react';
import { useEffect } from 'react';

interface CellProps{
  isAlive:boolean,
  x:number,
  y:number,
  updateCellValue: (newValue: boolean, x: number, y: number) => void,
  getAliveNeighboursCount:(x: number, y: number) => number

}



const Cell = ({isAlive, updateCellValue, y, x, getAliveNeighboursCount}:CellProps) =>{


  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => { 
    updateCellValue(!isAlive, y, x);
    
  }

  const onMouseEnterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1)
    updateCellValue(!isAlive, y, x);
  }




  const cellStyle={
    backgroundColor: isAlive ? 'white' : 'black',
    height:'10px',
    width:'10px',
    border: '1px solid grey',
    margin:0
  };

   
  return (
    <div style={cellStyle} onClick={onClickHandler} onMouseEnter={onMouseEnterHandler}/>
  )
}

export default React.memo(Cell) 