import NotFound from '@/pages/NotFound';

export default function customFetch(url, stopLoading, opts) {
  return new Promise((resolve, reject) => {
    fetch(process.env.REACT_APP_BASE_URL + url, {
      ...opts,
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            return response.json();
          case 204:
            resolve();
            break;
          case 400:
            return response.text();
          case 404:
            reject(<NotFound />);
            break;
          default:
            throw response.statusText;
        }
      })
      .then((data) => {
        if (Array.isArray(data) && !data.length) {
          const isOffsetQuery = url.split('=')
            .slice(0, -1)
            .pop()
            .endsWith('offset');

          if (isOffsetQuery) {
            resolve([]);
          } else {
            resolve('Нет данных для просмотра');
          }
        } else if (typeof data === 'string') {
          reject(data);
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        reject(
          `Ошибка: ${error.message || error}!`,
        );
      })
      .finally(stopLoading);
  });
}
