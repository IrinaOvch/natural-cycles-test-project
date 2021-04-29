import { useEffect, useRef, useState } from 'react'

interface FitTextParameters {
  inputValue: string
  rangeInputValue: number
  initialFontSize: number
}

const MIN_FONT_SIZE = 12

function useFitText({
  inputValue,
  rangeInputValue,
  initialFontSize,
}: FitTextParameters) {
  const divRef = useRef<HTMLDivElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)
  const [fontSize, setFontSize] = useState(initialFontSize)

  useEffect(() => {
    const applyFontSize = () => {
      const spanElWidth = spanRef?.current?.offsetWidth
      const divElWidth = divRef?.current?.offsetWidth
      if (!spanElWidth) return
      if (!divElWidth) return

      const fontSizeNumber = Number(
        spanRef?.current?.style?.fontSize.split('px')[0],
      )

      if (spanElWidth >= divElWidth) {
        const newFontSizeNumber =
          fontSizeNumber - 1 < MIN_FONT_SIZE
            ? MIN_FONT_SIZE
            : fontSizeNumber - 1

        setFontSize(newFontSizeNumber)
      }
    }

    applyFontSize()
  }, [inputValue, rangeInputValue, fontSize])

  useEffect(() => {
    const applyFontSize = () => {
      const spanElWidth = spanRef?.current?.offsetWidth
      const divElWidth = divRef?.current?.offsetWidth
      const divElHeight = divRef?.current?.offsetHeight
      if (!divElWidth) return
      if (!spanElWidth) return
      if (!divElHeight) return

      const fontSizeNumber = Number(
        spanRef?.current?.style?.fontSize.split('px')[0],
      )
      if (spanElWidth < divElWidth && fontSizeNumber < divElHeight) {
        const approximateFontSize = Math.floor(
          fontSizeNumber * (divElWidth / spanElWidth),
        )

        const newFontSizeNumber =
          approximateFontSize > divElHeight ? divElHeight : approximateFontSize
        setFontSize(newFontSizeNumber)
      }
    }

    applyFontSize()
  }, [inputValue, rangeInputValue])

  return { divRef, spanRef, fontSize }
}

export default useFitText
