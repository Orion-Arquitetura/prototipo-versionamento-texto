export default function formatDate(date) {
    console.log("////////////////////////////")
    const a = new Date("2023-06-09T03:00:00.000+00:00")
    console.log(a)
    console.log("////////////////////////////")
    const day = a.getDate() <= 9 ? `0${a.getDate()}` : a.getDate()
    const month = a.getMonth() + 1 <= 9 ? `0${a.getMonth() + 1}`: a.getMonth()
    const year = a.getFullYear()

    return (`${day}/${month}/${year}`)
}