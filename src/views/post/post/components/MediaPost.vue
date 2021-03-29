<template>
  <div id="mediaPostContent" @click="clickContent">
    <template v-if="data.length === 1" >
      <img class="responsive rounded" :src="data[0].img" alt="user-upload" v-if="mediaType(data[0]) === 'image'">
      <video-player ref="player" class="media-video-player rounded" :options="playerOptions(data[0])" v-else-if="mediaType(data[0]) === 'video'"/>
      <span class="text-lg text-primary" v-else>Lỗi</span>
    </template>
    <template v-if="data.length >= 2" >
      <div class="media-content-wrapper flex">
        <div class="image-oversize">
          <div v-bind:style="{ 'background-image': 'url(' + data[0].poster + ')' }" class="image-thumb rounded" v-if="mediaType(data[0]) === 'video'">
            <feather-icon icon="PlayIcon" svgClasses="w-16 h-16" class="stroke-current text-white icon-blur"></feather-icon>
          </div>
          <div v-bind:style="{ 'background-image': 'url(' + data[0].img + ')' }" class="image-thumb rounded" v-if="mediaType(data[0]) === 'image'"/>
        </div>
        <div class="image-oversize">
          <div v-bind:style="{ 'background-image': 'url(' + data[1].poster + ')' }" class="image-thumb rounded" v-if="mediaType(data[1]) === 'video'"/>
          <div v-bind:style="{ 'background-image': 'url(' + data[1].img + ')' }" class="image-thumb rounded" v-if="mediaType(data[1]) === 'image'"/>
          <div class="image-blur">
            <h1>+{{ data.length - 1 }}</h1>
          </div>
        </div>
      </div>
    </template>
    <post-carousel :showPopup="postCarouselConfig.display" :dataCarousel="postCarouselConfig.data" @hiddenPostCarousel="hiddenPostCarousel" v-if="postCarouselConfig.display"/>
  </div>
</template>


<script>
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'
  import PostCarousel from "./PostCarousel";

  export default {
    props: {
      data: {
        required: true
      },
      itemId: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        mediaExtensions: { img: ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'exif', 'tiff'], video: ['avi', 'flv', 'wmv', 'mov', 'mp4', '3gp'] },
        postCarouselConfig: {
          display: false,
          data: []
        }
      }
    },
    components: {
      videoPlayer,
      PostCarousel
    },
    computed: {
      mediaType () {
        return (media) => {
          if (media.img) {
            const ext = media.img.split('.').pop()
            if (this.mediaExtensions.img.includes(ext)) return 'image'
          } else if (media.sources && media.poster) {
            return 'video'
          }
        }
      },
      playerOptions () {
        return (media) => {
          return {
            height: '400',
            fluid: true,
            autoplay: false,
            controls: true,
            muted: true,
            language: 'vi',
            playbackRates: [0.75, 1.0, 1.5, 2.0],
            sources: media.sources,
            poster: media.poster
          }
        }
      }
    },
    methods: {
      clickContent () {
        this.postCarouselConfig.display = true;
        this.postCarouselConfig.data = this.data;
      },
      hiddenPostCarousel () {
        this.postCarouselConfig.display = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .media-content-wrapper {
    width: 100%;
    height: 60vh;
    position: relative;
    border-radius: .25rem;
    .image-oversize {
      width: 50%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      .image-thumb {
        width: 100%;
        height: 100%;
        > .icon-blur {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;
        }
      }
      .blur-filter {
        filter: blur(3px);
        color: white;
      }
      .image-blur {
        width: 50%;
        height: 100%;
        position: absolute;
        border-radius: 0.25rem;
        top: 50%;
        left: 100%;
        transform: translate(-100%, -50%);
        background-color: rgba(0, 0, 0, 0.6);
        >h1 {
          cursor: pointer;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: normal;
          font-size: 5rem;
          color: white;
        }
      }
    }
  }
</style>
