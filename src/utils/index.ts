export const getTimeYYMMDDHM = (time: string) => {
  const datetime = new Date(parseInt(time))
  const year = datetime.getFullYear(),
    month = ('0' + (datetime.getMonth() + 1)).slice(-2),
    date = ('0' + datetime.getDate()).slice(-2),
    hours = ('0' + datetime.getHours()).slice(-2),
    minutes = ('0' + datetime.getMinutes()).slice(-2)
  return `${year}-${month}-${date} ${hours}:${minutes}`
}

export const getTimeHHMM = (time: string) => {
  const datetime = new Date(parseInt(time))
  const hours = ('0' + datetime.getHours()).slice(-2),
    minutes = ('0' + datetime.getMinutes()).slice(-2)
  return ` ${hours}:${minutes}`
}
