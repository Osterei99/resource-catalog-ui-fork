export const formatDate = ( value, 
                            locale = 'de-DE', 
                            options = {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }
                        ) => {
    if (!value) return 'N/A';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString(locale, options);
};