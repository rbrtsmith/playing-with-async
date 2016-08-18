import { loadImagePromise, loadImageCallback } from './load-image'

const runPromises = true;

const renderImg = (img, id) => document.getElementById(id).appendChild(img);

const coeficcient = 1;

const images = () => ([
  {
    url: 'images/cat1.jpg',
    node: null,
    rendered: false,
    delay: 100 * coeficcient
  },
  {
    url: 'images/cat2.jpg',
    node: null,
    rendered: false,
    delay: 800 * coeficcient
  },
  {
    url: 'images/cat3.jpg',
    node: null,
    rendered: false,
    delay: 300 * coeficcient
  },
  {
    url: 'images/cat4.jpg',
    node: null,
    rendered: false,
    delay: 1000 * coeficcient
  }
]);


const efficientCallbacks = function(imgs) {
  let renderIndex = 0;
  function renderInOrder() {
    imgs.forEach(function(image, index) {
      if(image.node && (renderIndex === index && !image.rendered)) {
        renderImg(image.node, 'one');
        image.rendered = true;
        renderIndex +=1;
      }
    });
  }

  imgs.forEach(function loadImages(img, i) {
    loadImageCallback(img.url, function(err, res) {
      imgs[i].node = res;
      renderInOrder();
    }, img.delay);
  });  
};
if (!runPromises) {
  efficientCallbacks(images());  
}



const inefficientCallbacks = function(imgs) {
  const haveAllLoaded = () => {
    return imgs.filter(img => img.node).length === imgs.length;
  };

  function renderInOrder(img, index) {
    imgs[index].node = img;
    if (haveAllLoaded()) {
     imgs.forEach(img => {
        renderImg(img.node, 'two');
      });
    }
  }

  imgs.forEach(function loadImages(img, i) {
    loadImageCallback(img.url, function(err, res) {
      renderInOrder(res, i);
    }, img.delay);
  });
};
if (!runPromises) {
  inefficientCallbacks(images());  
}


const reallyInefficientCallbacks = function(imgs) {
  const add = res => renderImg(res, 'three');
  loadImageCallback(imgs[0].url, function(err, res) {
    add(res);
    loadImageCallback(imgs[1].url, function(err, res) {
      add(res);
      loadImageCallback(imgs[2].url, function(err, res) {
        add(res);
        loadImageCallback(imgs[3].url, function(err, res) {
          add(res);
        }, imgs[3].delay);
      }, imgs[2].delay);
    }, imgs[1].delay);
  }, imgs[0].delay);
}
if (!runPromises) {
  reallyInefficientCallbacks(images());
}

const random = function(imgs) {
  imgs.forEach(img => {
    loadImageCallback(img.url, function(err, res) {
      renderImg(res, 'four');
    }, img.delay);  
  });
}
if (!runPromises) {
  random(images());
}

const randomPromises = function(imgs) {
  function loadImg (img) {
  loadImagePromise(img.url, img.delay)
    .then(res => renderImg(res, 'four'))
    .catch(err => { console.error(err)});    
  }
  imgs.forEach(loadImg);  
};
if(runPromises) {
  randomPromises(images());
}

const inefficientPromises = function(imgs) {
  const imgPromises = imgs.map(img => loadImagePromise(img.url, img.delay));
  const renderAllImgs = imgs => imgs.forEach(img => renderImg(img, 'three'));
  Promise.all(imgPromises)
  .then(renderAllImgs).catch(err => { console.error(err)});
};
if(runPromises) {
  inefficientPromises(images());
}

