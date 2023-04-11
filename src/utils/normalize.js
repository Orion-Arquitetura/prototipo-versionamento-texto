export default function normalizar(string) {
    return string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}