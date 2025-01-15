/* eslint-disable */

export const formatDate = (dateString: string | any): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

export const formatDateWithMonthName = (dateString: string | any): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const months = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    const month = months[date.getMonth()];

    return `${day} de ${month}, ${year}`;
};

export const formatDateWithMonthNameAndHours = (dateString: string | any): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const months = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];

    const month = months[date.getMonth()];

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day} de ${month}, ${year} ás ${hours}:${minutes}`
}