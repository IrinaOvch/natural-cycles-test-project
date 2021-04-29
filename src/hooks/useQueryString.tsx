import { useState } from 'react'
import { setQueryString, getQueryStrValue } from '../query-string'

function useQueryString(key: string, initialValue: any) {
  const [value, setValue] = useState(getQueryStrValue(key) || initialValue)

  const onSetValue = (newValue: number | string) => {
    setValue(newValue)
    setQueryString(key, newValue)
  }
  return [value, onSetValue]
}

export default useQueryString
