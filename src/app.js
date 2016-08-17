import { loadImagePromise, loadImageCallback } from './load-image'


const addImg = (img, id) => document.getElementById(id).appendChild(img);

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
  },
  {
    url: 'images/cat1.jpg',
    node: null,
    rendered: false,
    delay: 600 * coeficcient
  },
  {
    url: 'images/cat2.jpg',
    node: null,
    rendered: false,
    delay: 500 * coeficcient
  },
  {
    url: 'images/cat3.jpg',
    node: null,
    rendered: false,
    delay: 1200 * coeficcient
  },
  {
    url: 'images/cat4.jpg',
    node: null,
    rendered: false,
    delay: 2000 * coeficcient
  }
]);


const efficientCallbacks = function(imgs) {
  let renderIndex = 0;
  function renderInOrder() {
    imgs.forEach(function(image, index) {
      if(image.node && (renderIndex === index && !image.rendered)) {
        addImg(image.node, 'one');
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
efficientCallbacks(images());



const inefficientCallbacks = function(imgs) {
  const haveAllLoaded = () => {
    return imgs.filter(img => img.node).length === imgs.length;
  };

  function renderInOrder(img, index) {
    imgs[index].node = img;
    if (haveAllLoaded()) {
     imgs.forEach(img => {
        addImg(img.node, 'two');
      });
    }
  }

  imgs.forEach(function loadImages(img, i) {
    loadImageCallback(img.url, function(err, res) {
      renderInOrder(res, i);
    }, img.delay);
  });
};
inefficientCallbacks(images());


const reallyInefficientCallbacks = function(imgs) {
  const add = res => addImg(res, 'three');
  loadImageCallback(imgs[0].url, function(err, res) {
    add(res);
    loadImageCallback(imgs[1].url, function(err, res) {
      add(res);
      loadImageCallback(imgs[2].url, function(err, res) {
        add(res);
        loadImageCallback(imgs[3].url, function(err, res) {
          add(res);
          loadImageCallback(imgs[4].url, function(err, res) {
            add(res);
            loadImageCallback(imgs[5].url, function(err, res) {
              add(res);
              loadImageCallback(imgs[6].url, function(err, res) {
                add(res);
                loadImageCallback(imgs[7].url, function(err, res) {
                  add(res);
                }, imgs[7].delay);
              }, imgs[6].delay);
            }, imgs[5].delay);
          }, imgs[4].delay);
        }, imgs[3].delay);
      }, imgs[2].delay);
    }, imgs[1].delay);
  }, imgs[0].delay);
}
reallyInefficientCallbacks(images());


const random = function(imgs) {
  imgs.forEach(img => {
    loadImageCallback(img.url, function(err, res) {
      addImg(res, 'four');
    }, img.delay);  
  });
}
random(images());

