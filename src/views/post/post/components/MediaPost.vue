<template>
  <div id="mediaPostContent" @click="clickContent">
    <template v-if="data.length === 1" >

    </template>
  </div>
</template>

<script>
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'

  export default {
    props: {
      data: {
        required: true
      }
    },
    data () {
      return {
        mediaExtensions: { img: ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'exif', 'tiff'], video: ['avi', 'flv', 'wmv', 'mov', 'mp4', '3gp'] },
      }
    },
    components: {
      videoPlayer
    },
    computed: {
      mediaType () {
        return (media) => {
          if (media.img) {
            const ext = media.img.split('.').pop()
            if (this.mediaExtensions.img.includes(ext)) return 'image'
          } else if (media.sources && media.poster) {
            // other validations
            return 'video'
          }
        }
      },
      playerOptions () {
        return (media) => {
          return {
            height: '360',
            fluid: true,
            autoplay: false,
            muted: true,
            language: 'vi',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: media.sources,
            poster: media.poster
          }
        }
      }
    },
    methods: {
      clickContent () {
        console.log('click')
      }
    }, created() {
      console.log(this.data)
    }
  }
</script>

<style lang="scss" scoped>
  .media-content-wrapper {
    width: 100%;
    height: 60vh;
    position: relative;
    border-radius: .25rem;
  }
</style>
