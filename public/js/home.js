/* eslint-disable */

export const loadPosters = async function() {
  const featuredImg = document.querySelectorAll('.featured__img');
  const featuredLink = document.querySelectorAll('.featured__link');

  const popularURL =
    'https://api.themoviedb.org/3/movie/popular?api_key=3718eda98708443cde931b20b81a12e0&language=en-US&page=1';
  const res = await fetch(`${popularURL}`);
  const data = await res.json();
  let i = 0;
  for (i; i < 6; i += 1) {
    const posterPath = `https://image.tmdb.org/t/p/original/${
      data.results[i].poster_path
    }`;
    featuredLink[i].href = `/movie/${data.results[i].id}`;
    featuredImg[i].src = posterPath;
  }
};

const login = document.querySelector('.login-section');
const signup = document.querySelector('.signup-section');
const overlay = document.querySelectorAll('.overlay');
const review = document.querySelector('.review-section');
const trailerVideo = document.querySelector('.trailer-video');

const btnOpenLogin = document.querySelectorAll('.login-btn');
const btnOpenSignup = document.querySelector('.signup-btn');
const btnOpenReview = document.querySelector('.review__btn');
const editReviewBtn = document.querySelector('.edit-btn');
const btnOpenTrailer = document.querySelector('.trailer-btn');
let iframeTag = document.querySelector('iframe');

const openLogin = function() {
  login.classList.remove('hidden');
  overlay[0].classList.remove('hidden');
};

const openSignup = function() {
  signup.classList.remove('hidden');
  overlay[0].classList.remove('hidden');
};
const openReview = function() {
  review.classList.remove('hidden');
  overlay[1].classList.remove('hidden');
};
const openTrailer = function() {
  trailerVideo.classList.remove('hidden');
  overlay[1].classList.remove('hidden');
};
export const closeModal = function() {
  login.classList.add('hidden');
  signup.classList.add('hidden');
  if (review) {
    review.classList.add('hidden');
    overlay[1].classList.add('hidden');
  }
  if (btnOpenTrailer) {
    trailerVideo.classList.add('hidden');
    overlay[1].classList.add('hidden');
    if (iframeTag) {
      let iframeSrc = iframeTag.src;
      iframeTag.src = iframeSrc;
    }
  }
  overlay[0].classList.add('hidden');
};
if (btnOpenLogin[0]) {
  overlay[0].addEventListener('click', closeModal);
  btnOpenLogin[0].addEventListener('click', openLogin);
}
if (btnOpenLogin[1]) {
  overlay[0].addEventListener('click', closeModal);
  btnOpenLogin[1].addEventListener('click', openLogin);
}
if (btnOpenLogin[2]) {
  overlay[0].addEventListener('click', closeModal);
  btnOpenLogin[2].addEventListener('click', openLogin);
}
if (btnOpenLogin[3]) {
  overlay[0].addEventListener('click', closeModal);
  btnOpenLogin[3].addEventListener('click', openLogin);
}
if (btnOpenSignup) {
  overlay[0].addEventListener('click', closeModal);
  btnOpenSignup.addEventListener('click', openSignup);
}
if (btnOpenReview) {
  overlay[1].addEventListener('click', closeModal);
  btnOpenReview.addEventListener('click', openReview);
}
if (editReviewBtn) {
  overlay[1].addEventListener('click', closeModal);
  editReviewBtn.addEventListener('click', openReview);
}
if (btnOpenTrailer) {
  overlay[1].addEventListener('click', closeModal);
  btnOpenTrailer.addEventListener('click', openTrailer);
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !login.classList.contains('hidden')) {
    closeModal();
  }
});
