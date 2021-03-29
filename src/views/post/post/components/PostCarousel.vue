<template>
  <vs-popup
    fullscreen
    title=""
    :active.sync="activePopupCarousel"
  >
    <div class="carousel-example">
      <swiper :options="swiperOption" :dir="$vs.rtl ? 'rtl' : 'ltr'" :key="$vs.rtl">

        <swiper-slide  v-for="(item, index) in dataCarousel">
          <img class="responsive rounded" :src="item.img" alt="user-upload" v-if="mediaType(item) === 'image'">
          <video-player ref="player" class="media-video-player" :options="playerOptions(item)" v-else-if="mediaType(item) === 'video'"/>
          <span class="text-lg text-primary" v-else>Unknown Media Type</span>
        </swiper-slide>

        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </vs-popup>
</template>

<script>
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'
  import 'swiper/dist/css/swiper.min.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    props: {
      dataCarousel: {
        type: Array,
        required: true
      },
      showPopup: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        mediaExtensions: { img: ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'exif', 'tiff'], video: ['avi', 'flv', 'wmv', 'mov', 'mp4', '3gp'] },
        swiperOption: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },
    components: {
      videoPlayer,
      swiper,
      swiperSlide
    },
    computed: {
      activePopupCarousel: {
        get () {
          return this.showPopup
        },
        set (value) {
          this.$emit('hiddenPostCarousel', value)
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
      },
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
    },
    created() {
      console.log(this.dataCarousel)
    }
  }
</script>

<style scoped>

</style>
