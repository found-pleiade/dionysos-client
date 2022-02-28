export const requestData = (code: string, data: {}) => JSON.stringify({ code, payload: data });

export const visibility = (condition: boolean) => (condition ? 'visible' : 'hidden');
