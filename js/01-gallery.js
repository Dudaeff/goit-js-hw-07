import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector('.gallery');

galleryRef.insertAdjacentHTML('beforeend', makeGallaryItemsMarkup(galleryItems));

galleryRef.addEventListener('click', getOriginalImgLinkOnClick);


function makeGallaryItemsMarkup(gallery) {
    return gallery.map(({ preview, original, description }) => {
        return `<div class="gallery__item">
                  <a class="gallery__link" href="${original}">
                    <img
                      class="gallery__image"
                      src="${preview}"
                      data-source="${original}"
                      alt="${description}"
                    />
                  </a>
                </div>`
    }).join('');
};

function getOriginalImgLinkOnClick(evt) {
    evt.preventDefault();
    const currentImage = evt.target.classList.contains('gallery__image');
    const originalImgLink = evt.target.dataset.source;

    if (!currentImage) {
        return;
    }
    openModalWindowGallary(originalImgLink);
};

function openModalWindowGallary(source) {
    const instance = basicLightbox.create(`
    <div class="modal">
           <img  src="${source}" width="1280" height="800" />
    </div>
`, {
        onShow: (instance) => {
            document.addEventListener('keydown', onEscapePress);
        
            function onEscapePress(evt) {
                const keyCode = evt.code;

                if (keyCode === 'Escape') {
                    document.removeEventListener('keydown', onEscapePress)
                    instance.close()
                };
            };
        }
    });
    instance.show();
};