export default function formatDate(date) {
    const a = new Date(date)
    const day = a.getDate() <= 9 ? `0${a.getDate()}` : a.getDate()
    const month = a.getMonth() + 1 <= 9 ? `0${a.getMonth() + 1}`: a.getMonth()
    const year = a.getFullYear()

    return (`${day}/${month}/${year}`)
}