import React from 'react'
import useQueryString from './hooks/useQueryString'
import useFitText from './hooks/useFitText'
import './App.css'

const CONTAINER_HEIGHT = 50
const INITIAL_CONTAINER_WIDTH = 10

function App() {
  const [inputValue, setInputValue] = useQueryString('text', '')
  const [rangeInputValue, setRangeInputValue] = useQueryString(
    'width',
    INITIAL_CONTAINER_WIDTH,
  )
  const { divRef, spanRef, fontSize } = useFitText({
    inputValue,
    rangeInputValue,
    initialFontSize: CONTAINER_HEIGHT,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setInputValue(newValue)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRangeValue = event.target.valueAsNumber
    setRangeInputValue(newRangeValue)
  }

  return (
    <div className="page">
      <label className="input-label">
        Type text here:
        <input
          value={inputValue}
          className="input"
          type="text"
          onChange={handleChange}
        />
      </label>

      <label className="input-label">
        Output width:
        <input
          value={rangeInputValue}
          type="range"
          min={10}
          max={100}
          onChange={handleInputChange}
          className="input"
        />
        {rangeInputValue}%
      </label>
      <div
        ref={divRef}
        className="output"
        style={{ width: `${rangeInputValue}%` }}
      >
        <span ref={spanRef} style={{ fontSize }}>
          {inputValue}
        </span>
      </div>
    </div>
  )
}

export default App
