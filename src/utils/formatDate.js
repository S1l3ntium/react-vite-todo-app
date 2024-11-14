export default function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('ru-RU', options); // Форматируем в нужный формат
}