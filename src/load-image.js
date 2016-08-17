import 'babelify/polyfill'

function loadImagePromise(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = function() {
      resolve(image)
    };

    image.onerror = function() {
      const message =
        'Could not load image at ' + url
      reject(new Error(message))
    };

    image.src = url;

  });
}

function loadImageCallback(url, cb, delay) {
  const image = new Image();

  image.onload = function() {
    setTimeout(() => {
      cb(null, image);
    }, delay);
  };

  image.onerror = function() {
    const message =
        'Could not load image at ' + url
      cb(new Error(message))
  };
    image.src = url;
}

export { loadImagePromise, loadImageCallback };
