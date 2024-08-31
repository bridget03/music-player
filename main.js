const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $(".header h2");
const songThumb = $(".thumbnail");
const audio = $("#audio");
const playlist = $(".playlist");
const thumbnail = $(".thumbnail");
const player = $(".player");
const currentPlaying = $$(".song");

const btnPlay = $(".icon-play-pause");
const btnForward = $(".icon-forward");
const btnPrev = $(".icon-previous");
const btnShuffle = $(".icon-shuffle");
const btnRepeat = $(".icon-repeat");
const btnOption = $$(".song-option");

const progress = $(".progress");
const app = {
  currentIndex: 0,
  songs: [
    {
      name: "Anh thôi nhân nhượng",
      singer: "Kiều Chi cover",
      path: "./assets/music/anh-thoi-nhan-nhuong.mp3",
      image: "./assets/img/anh-thoi-nhan-nhuong.jpg",
    },
    {
      name: "Buồn hay vui",
      singer: "Ivan Nger",
      path: "./assets/music/buon-hay-vui.mp3",
      image: "./assets/img/buon-hay-vui.jpg",
    },
    {
      name: "Chìm sâu",
      singer: "RPT MCK",
      path: "./assets/music/chim-sau.mp3",
      image: "./assets/img/chim-sau.jpg",
    },
    {
      name: "Có thể hay không",
      singer: "Trương Tử Hào 張紫豪",
      path: "./assets/music/co-the-hay-khong.mp3",
      image: "./assets/img/co-the-hay-khong.jpg",
    },
    {
      name: "Nhắn nhủ",
      singer: "Ronbooogz",
      path: "./assets/music/nhan-nhu.mp3",
      image: "./assets/img/nhan-nhu.jpg",
    },
    {
      name: "Phi điểu và ve sầu",
      singer: "Nhậm nhiên 任然",
      path: "./assets/music/phi-dieu-va-ve-sau.mp3",
      image: "./assets/img/phi-dieu-va-ve-sau.jpg",
    },
    {
      name: "Thời không sai lệch",
      singer: "Ngải Thần 艾辰",
      path: "./assets/music/thoi-khong-sai-lech.mp3",
      image: "./assets/img/thoi-khong-sai-lech.jpg",
    },
    {
      name: "Trái đất ôm mặt trời",
      singer: "GreyD, Hoàng Thuỳ Linh, Kai Đinh",
      path: "./assets/music/trai-dat-om-mat-troi.mp3",
      image: "./assets/img/trai-dat-om-mat-troi.jpg",
    },
    {
      name: "Yên bình có quá đắt không",
      singer: "Khiêm x Freak D",
      path: "./assets/music/yen-binh-co-qua-dat-khong.mp3",
      image: "./assets/img/yen-binh-co-qua-dat-khong.jpg",
    },
    {
      name: "Sa vào nguy hiểm",
      singer: "Cát Đông Kỳ (Ge Dong Qi)",
      path: "./assets/music/sa-vao-nguy-hiem.mp3",
      image: "./assets/img/sa-vao-nguy-hiem.jpg",
    },

    {
      name: "Anh chẳng thể",
      singer: "Lập Nguyên Ft. FREAKY x Yến",
      path: "./assets/music/anh-chang-the.mp3",
      image: "./assets/img/anh-chang-the.jpg",
    },
    {
      name: "Thuyền quyên remix",
      singer: "Diệu Kiên || AM remix",
      path: "./assets/music/thuyen-quyen-remix.mp3",
      image: "./assets/img/thuyen-quyen.jpeg",
    },
    {
      name: "Phố không em",
      singer: "Thái Đinh",
      path: "./assets/music/pho-khong-em.mp3",
      image: "./assets/img/pho-khong-em.jpg",
    },
    {
      name: "Tuổi đá buồn",
      singer: "Juki San cover",
      path: "./assets/music/tuoi-da-buon.mp3",
      image: "./assets/img/Tuoi-Da-Buon.webp",
    },
  ],

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${
          index === this.currentIndex ? "active" : ""
        }" data-index="${index}">
            <div class= "song-inf">
                <div
                    class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
        
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
            </div>

            <div class="song-option" data-index=${index}>
                <ion-icon name="ellipsis-vertical"></ion-icon>
                <div class="option-menu">
                  <li class="btnRemove">Remove</li>
                </div>
              
            </div>
        </div>
        `;
    });

    playlist.innerHTML = htmls.join("");
  },

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvent: function () {
    const isRandom = false;
    const isRepeat = false;
    const _this = this;
    // Xử lý thu phóng thumbnail
    const thumbnailWidth = thumbnail.offsetWidth;
    document.onscroll = function () {
      const scrollTop = document.documentElement.scrollTop || window.scrollY;
      const newThumbnailWidth = thumbnailWidth - scrollTop;
      thumbnail.style.width =
        newThumbnailWidth > 0 ? newThumbnailWidth + "px" : 0;

      thumbnail.style.opacity = newThumbnailWidth / thumbnailWidth;
    };

    //Thumbnail quay
    const thumbAnimate = thumbnail.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity,
    });
    thumbAnimate.pause();

    //xử lý click play / pause
    btnPlay.onclick = function () {
      if (audio.paused) {
        audio.play();
        player.classList.add("playing");
        thumbAnimate.play();
      } else {
        audio.pause();
        player.classList.remove("playing");
        thumbAnimate.pause();
      }

      audio.ontimeupdate = function () {
        const progressPlaying = (audio.currentTime / audio.duration) * 100;
        progress.value = progressPlaying;
      };
      audio.onended = function () {
        if (_this.isRepeat) {
          audio.play();
        } else {
          btnForward.click();
        }
      };
    };
    btnForward.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.activeSong();
      player.classList.add("playing");
    };
    btnPrev.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.activeSong();
      player.classList.add("playing");
    };

    btnShuffle.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      // e.target.classList.contains("active")
      //   ? e.target.classList.remove("active")
      //   : e.target.classList.add("active");
      e.target.classList.toggle("active");
    };

    btnRepeat.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      e.target.classList.toggle("active");
    };

    //Xử lý tua
    progress.oninput = function () {
      const seekTime = (progress.value / 100) * audio.duration;
      audio.currentTime = seekTime;
    };

    //Xử lý click vào song playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      const optionNode = e.target.closest(".song-option");
      const removeNode = e.target.closest(".btnRemove");
      if (songNode || optionNode) {
        if (songNode && !optionNode) {
          _this.currentIndex = songNode.dataset.index;
          _this.loadCurrentSong();
          _this.activeSong();
          player.classList.add("playing");
          console.log("song" + songNode.dataset.index);
        }
        if (optionNode) {
          //btnOption.classList.add("active");
          $(".song-option.active")?.classList.remove("active");
          optionNode.classList.add("active");
          console.log("option" + optionNode.dataset.index);
        }
      }
    };
    //Xử lý ẩn <li>remove</li> click ra ngoài
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".playlist,.song-option")) {
        $(".song-option.active")?.classList.remove("active");
      }
    });
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    songThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
    audio.play();
  },

  nextSong: function () {
    if (this.isRandom) {
      this.currentIndex = Math.floor(Math.random() * this.songs.length);
      this.loadCurrentSong();
    } else {
      this.currentIndex++;
      if (this.currentIndex >= this.songs.length) {
        this.currentIndex = 0;
      }

      this.loadCurrentSong();
    }
    this.scrollActiveSongIntoView();
  },
  prevSong: function () {
    this.currentIndex--;

    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
    this.scrollActiveSongIntoView();
  },
  playRandomSong: function () {
    this.currentIndex = Math.floor(Math.random() * this.songs.length);
    this.loadCurrentSong();
  },

  activeSong: function () {
    $(".song.active").classList.remove("active");
    const playlistNow = $$(".song");
    playlistNow[this.currentIndex].classList.add("active");
  },

  scrollActiveSongIntoView() {
    setTimeout(function () {
      $(".song.active").scrollIntoView({
        behaviour: "smooth",
        block: "end",
      });
    }, 300);
  },
  start: function () {
    this.defineProperties(); //Định nghĩa các thuộc tính cho Object
    this.handleEvent(); //Lắng nghe/xử lý các sự kiện (DOM event)
    this.loadCurrentSong(); //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.render(); //Render playlist
  },
};

app.start();
