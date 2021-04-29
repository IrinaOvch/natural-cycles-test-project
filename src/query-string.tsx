import { parse, stringify } from 'query-string'

export const setQueryString = (
  key: string,
  value: number | string | string[],
  queryString = window.location.search,
) => {
  const values = parse(queryString)
  const newQueryStrValue = stringify({ ...values, [key]: value })

  const { protocol, host, pathname } = window.location

  const newUrl = protocol + '//' + host + pathname + '?' + newQueryStrValue
  window.history.pushState({ path: newUrl }, '', newUrl)
}

export const getQueryStrValue = (
  key: string,
  queryString = window.location.search,
) => {
  const values = parse(queryString)

  const value = values[key]

  if (value === null) return ''
  if (!isNaN(Number(value))) Number(value)

  return values[key]
}
