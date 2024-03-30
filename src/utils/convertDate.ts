export const convertDate = (dateString: string) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions
  return new Date(dateString).toLocaleString('en-US', options)
}
