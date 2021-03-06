<template>
  <div id="profile-page">
    <!-- COL AREA -->
    <div class="vx-row">
      <!-- COL 2 -->
      <div class="vx-col w-full lg:w-1/2 m-auto">
        <vx-card class="mt-base" v-for="(post, index) in userPosts" :key="index">
          <div>
            <!-- POST HEADER -->
            <div class="post-header flex justify-between mb-4">
              <div class="flex items-center">
                <div>
                  <vs-avatar class="m-0" :src="userLatestPhotos[0]" size="45px"></vs-avatar>
                </div>
                <div class="ml-4">
                  <h6>{{ post.author }}</h6>
                  <small>{{ post.time | date(true) }} at {{ post.time | time }}</small>
                </div>
              </div>
              <div class="flex">
                <feather-icon class="ml-4" icon="HeartIcon" :svgClasses="{'text-danger fill-current stroke-current': post.isLiked}"></feather-icon>
              </div>
            </div>

            <!-- POST CONTENT -->
            <div class="post-content">
              <p>{{ post.text }}</p>
            </div>
            <div class="post-media-container mb-6 mt-4">
              <ul class="flex post-media-list">
                <li class="post-media m-1 w-full" v-for="(media, mediaIdex) in post.media.slice(0, 2)" :key="mediaIdex">
                  <img class="responsive rounded" :src="media.img" alt="user-upload" v-if="mediaType(media) == 'image'">
                  <video-player ref="player" class="media-video-player" :options="playerOptions(media)" v-else-if="mediaType(media) == 'video'" v-once />
                  <span class="text-lg text-primary" v-else>Unknown Media Type</span>
                </li>
              </ul>
              <span class="flex justify-end" v-if="post.media.length > 2">
                <a class="inline-flex items-center text-sm" href=""><span>View All</span> <feather-icon :icon="$vs.rtl ? 'ChevronsLeftIcon' : 'ChevronsRightIcon'" svgClasses="h-4 w-4"></feather-icon></a>
              </span>
            </div>

            <!-- POST ACTION DATA -->
            <div>
              <div class="flex justify-between">
                <div class="flex items-center">
                  <div class="flex items-center"><feather-icon class="mr-2" icon="HeartIcon" svgClasses="h-5 w-5"></feather-icon> <span>{{ post.likes }}</span></div>
                  <ul class="users-liked user-list ml-3 sm:ml-6">
                    <li v-for="(user, userIndex) in post.usersLiked" :key="userIndex">
                      <vx-tooltip :text="user.name" position="bottom">
                        <vs-avatar :src="user.img" size="30px" class="border-2 border-white border-solid -m-1"></vs-avatar>
                      </vx-tooltip>
                    </li>
                  </ul>
                  <small class="ml-2">+{{ post.likes - 5 }} more</small>
                </div>
                <div class="flex items-center"><feather-icon class="mr-2" icon="MessageSquareIcon" svgClasses="h-5 w-5"></feather-icon> <span>{{ post.comments }}</span></div>
              </div>
              <div class="comments-container mt-4">
                <ul class="user-comments-list">
                  <li v-for="(commentedUser, commentIndex) in post.usersCommented.slice(0, 2)" :key="commentIndex" class="commented-user flex items-center mb-4">
                    <div class="mr-3"><vs-avatar class="m-0" :src="commentedUser.img" size="30px" /></div>
                    <div class="leading-tight">
                      <p class="font-medium">{{ commentedUser.author }}</p>
                      <span class="text-xs">{{ commentedUser.comment }}</span>
                    </div>
                    <div class="ml-auto">
                      <div class="flex">
                        <feather-icon icon="HeartIcon" svgClasses="h-4 w-4" class="mr-2 cursor-pointer"></feather-icon>
                        <feather-icon icon="MessageSquareIcon" svgClasses="h-4 w-4" class="cursor-pointer"></feather-icon>
                      </div>
                    </div>
                  </li>
                </ul>
                <span class="flex justify-end" v-if="post.usersCommented.length > 2">
                  <a class="inline-flex items-center text-sm" href=""><span>View All</span> <feather-icon :icon="$vs.rtl ? 'ChevronsLeftIcon' : 'ChevronsRightIcon'" svgClasses="h-4 w-4"></feather-icon></a>
                </span>
              </div>
              <div class="post-comment">
                <vs-textarea label="Add Comment" class="mb-2" v-model="post.commentbox" />
                <vs-button size="small">Post Comment</vs-button>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="flex justify-center mt-base">
          <vs-button id="button-load-more-posts" class="vs-con-loading__container" @click="loadContent">Load More</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'

  export default {
    data () {
      return {
        isNavOpen: false,
        userPoll: '',
        user_info: {
          profile_img: require('@/assets/images/profile/user-uploads/user-13.jpg'),
          cover_img: require('@/assets/images/profile/user-uploads/cover.jpg')
        },
        mediaExtensions: { img: ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'exif', 'tiff'], video: ['avi', 'flv', 'wmv', 'mov', 'mp4', '3gp'] },
        suggestedFriends: [
          { name: 'Carissa Dolle', avatar: require('@/assets/images/portrait/small/avatar-s-5.jpg'),  mutualFriends: 6 },
          { name: 'Liliana Pecor', avatar: require('@/assets/images/portrait/small/avatar-s-6.jpg'),  mutualFriends: 3 },
          { name: 'Isidra Strunk', avatar: require('@/assets/images/portrait/small/avatar-s-7.jpg'),  mutualFriends: 2 },
          { name: 'Gerald Licea',  avatar: require('@/assets/images/portrait/small/avatar-s-8.jpg'),  mutualFriends: 1 },
          { name: 'Kelle Herrick', avatar: require('@/assets/images/portrait/small/avatar-s-9.jpg'),  mutualFriends: 1 },
          { name: 'Cesar Lee',     avatar: require('@/assets/images/portrait/small/avatar-s-10.jpg'), mutualFriends: 1 },
          { name: 'John Doe',      avatar: require('@/assets/images/portrait/small/avatar-s-11.jpg'), mutualFriends: 1 },
          { name: 'Tonia Seabold', avatar: require('@/assets/images/portrait/small/avatar-s-12.jpg'), mutualFriends: 1 }
        ],
        userLatestPhotos: [
          require('@/assets/images/profile/user-uploads/user-01.jpg'),
          require('@/assets/images/profile/user-uploads/user-02.jpg'),
          require('@/assets/images/profile/user-uploads/user-04.jpg'),
          require('@/assets/images/profile/user-uploads/user-03.jpg'),
          require('@/assets/images/profile/user-uploads/user-05.jpg'),
          require('@/assets/images/profile/user-uploads/user-06.jpg'),
          require('@/assets/images/profile/user-uploads/user-07.jpg'),
          require('@/assets/images/profile/user-uploads/user-08.jpg'),
          require('@/assets/images/profile/user-uploads/user-09.jpg')
        ],
        userPosts: [
          {
            author     : 'Leeanna Alvord',
            time       : 'Mon Dec 12 2018 07:46:05 GMT+0000 (GMT)',
            isLiked    : true,
            text       : 'I love jujubes wafer pie ice cream tiramisu. Chocolate I love pastry pastry sesame snaps wafer. Pastry topping biscuit lollipop topping I love lemon drops sweet roll bonbon. Brownie donut icing.',
            media      : [{ img: require('@/assets/images/profile/post-media/2.jpg') }],
            likes      : 145,
            comments   : 77,
            usersLiked : [
              { name: 'Trina Lynes',       img: require('@/assets/images/portrait/small/avatar-s-1.jpg') },
              { name: 'Lilian Nenez',      img: require('@/assets/images/portrait/small/avatar-s-2.jpg') },
              { name: 'Alberto Glotzbach', img: require('@/assets/images/portrait/small/avatar-s-3.jpg') },
              { name: 'George Nordick',    img: require('@/assets/images/portrait/small/avatar-s-4.jpg') },
              { name: 'Vennie Mostowy',    img: require('@/assets/images/portrait/small/avatar-s-5.jpg') }
            ],
            commentbox : '',
            usersCommented: [
              {
                comment : 'orthoplumbate morningtide naphthaline exarteritis',
                author  : 'Kitty Allanson',
                img     : require('@/assets/images/portrait/small/avatar-s-6.jpg'),
                time    : 'Mon Dec 10 2018 08:56:05 GMT+0000 (GMT)'
              },
              {
                comment : 'blockiness pandemy metaxylene speckle coppy',
                author  : 'Jeanie Bulgrin',
                img     : require('@/assets/images/portrait/small/avatar-s-8.jpg'),
                time    : 'Mon Dec 10 2018 08:55:00 GMT+0000 (GMT)'
              }
            ]
          },
          {
            author     : 'Leeanna Alvord',
            time       : 'Mon Dec 11 2018 08:05:05 GMT+0000 (GMT)',
            isLiked    : false,
            text       : 'Candy jelly beans powder brownie biscuit. Jelly marzipan oat cake cake. Cupcake I love wafer cake. Halvah I love powder jelly I love cheesecake cotton candy tiramisu brownie.',
            media      : [{ img: require('@/assets/images/profile/post-media/25.jpg') }],
            likes      : 276,
            comments   : 105,
            usersLiked : [
              { name: 'Lai Lewandowski',   img: require('@/assets/images/portrait/small/avatar-s-6.jpg')  },
              { name: 'Elicia Rieske',     img: require('@/assets/images/portrait/small/avatar-s-7.jpg')  },
              { name: 'Darcey Nooner',     img: require('@/assets/images/portrait/small/avatar-s-8.jpg')  },
              { name: 'Julee Rossignol',   img: require('@/assets/images/portrait/small/avatar-s-10.jpg') },
              { name: 'Jeffrey Gerondale', img: require('@/assets/images/portrait/small/avatar-s-9.jpg')  }
            ],
            commentbox: '',
            usersCommented: [
              {
                comment : 'I love cupcake danish jujubes sweet.',
                author  : 'Darcey Nooner',
                img     : require('@/assets/images/portrait/small/avatar-s-8.jpg'),
                time    : 'Mon Dec 11 2018 09:56:05 GMT+0000 (GMT)'
              },
              {
                comment : 'Wafer I love brownie jelly bonbon tart apple pie',
                author  : 'Lai Lewandowski',
                img     : require('@/assets/images/portrait/small/avatar-s-6.jpg'),
                time    : 'Mon Dec 10 2018 09:50:00 GMT+0000 (GMT)'
              }
            ]
          },
          {
            author     : 'Leeanna Alvord',
            time       : 'Mon Dec 10 2018 12:05:05 GMT+0000 (GMT)',
            isLiked    : false,
            text       : 'Wafer I love brownie jelly bonbon tart. Candy jelly beans powder brownie biscuit. Jelly marzipan oat cake cake.',
            media      : [{
              sources: [{
                type: 'video/mp4', src: 'http://vjs.zencdn.net/v/oceans.mp4'
              }],
              poster: 'https://images.unsplash.com/photo-1453847562882-4a4ae8f511f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80' }],
            likes      : 269,
            comments   : 98,
            usersLiked : [
              { name: 'Vennie Mostowy',  img: require('@/assets/images/portrait/small/avatar-s-5.jpg')  },
              { name: 'Elicia Rieske',   img: require('@/assets/images/portrait/small/avatar-s-7.jpg')  },
              { name: 'Julee Rossignol', img: require('@/assets/images/portrait/small/avatar-s-10.jpg') },
              { name: 'Darcey Nooner',   img: require('@/assets/images/portrait/small/avatar-s-8.jpg')  },
              { name: 'Elicia Rieske',   img: require('@/assets/images/portrait/small/avatar-s-7.jpg')  }
            ],
            commentbox: '',
            usersCommented: [
              {
                comment : 'I love cupcake danish jujubes sweet.',
                author  : 'Darcey Nooner',
                img     : require('@/assets/images/portrait/small/avatar-s-8.jpg'),
                time    : 'Mon Dec 11 2018 09:56:05 GMT+0000 (GMT)'
              },
              {
                comment : 'Wafer I love brownie jelly bonbon tart apple pie',
                author  : 'Lai Lewandowski',
                img     : require('@/assets/images/portrait/small/avatar-s-6.jpg'),
                time    : 'Mon Dec 10 2018 09:50:00 GMT+0000 (GMT)'
              }
            ]
          }
        ],
        suggestedPages: [
          { img: require('@/assets/images/profile/pages/page-09.jpg'), title: 'Rockose',      type: 'Company'          },
          { img: require('@/assets/images/profile/pages/page-08.jpg'), title: 'The Devil\'s', type: 'Clothing Store'   },
          { img: require('@/assets/images/profile/pages/page-03.jpg'), title: 'The Magician', type: 'Public Figure'    },
          { img: require('@/assets/images/profile/pages/page-02.jpg'), title: 'AC/DC',        type: 'Music'            },
          { img: require('@/assets/images/profile/pages/page-07.jpg'), title: 'eat hard',     type: 'restaurant / bar' },
          { img: require('@/assets/images/profile/pages/page-04.jpg'), title: 'B4B',          type: 'Beauty Store'     },
          { img: require('@/assets/images/profile/pages/page-05.jpg'), title: 'Kylie Jenner', type: 'Public Figure'    },
          { img: require('@/assets/images/profile/pages/page-01.jpg'), title: 'RDJ',          type: 'Actor'            },
          { img: require('@/assets/images/profile/pages/page-06.jpg'), title: 'Taylor Swift', type: 'Music'            }
        ],
        polls: [
          {
            id: 59,
            title: 'Who is the best actor in Marvel Cinematic Universe?',
            options: [
              {
                text       : 'RDJ',
                value      : 'rdj',
                voted      : 58,
                usersVoted : [
                  { name: 'Tonia Seabold',  avatar: require('@/assets/images/portrait/small/avatar-s-12.jpg') },
                  { name: 'Carissa Dolle',  avatar: require('@/assets/images/portrait/small/avatar-s-5.jpg') },
                  { name: 'Kelle Herrick',  avatar: require('@/assets/images/portrait/small/avatar-s-9.jpg') },
                  { name: 'Len Bregantini', avatar: require('@/assets/images/portrait/small/avatar-s-10.jpg') },
                  { name: 'John Doe',       avatar: require('@/assets/images/portrait/small/avatar-s-11.jpg') },
                  { name: 'Tonia Seabold',  avatar: require('@/assets/images/portrait/small/avatar-s-12.jpg') },
                  { name: 'Dirk Fornili',   avatar: require('@/assets/images/portrait/small/avatar-s-2.jpg') }
                ]
              },
              {
                text       : 'Chris Hemsworth',
                value      : 'chris hemsworth',
                voted      : 16,
                usersVoted : [
                  { name: 'Liliana Pecor',      avatar: require('@/assets/images/portrait/small/avatar-s-6.jpg') },
                  { name: 'Kasandra Nalevanko', avatar: require('@/assets/images/portrait/small/avatar-s-1.jpg') }
                ]
              },
              {
                text       : 'mark ruffalo',
                value      : 'mark ruffalo',
                voted      : 8,
                usersVoted : [{ name: 'Lorelei Lacsamana', avatar: require('@/assets/images/portrait/small/avatar-s-4.jpg') }]
              },
              {
                text       : 'Chris Evans',
                value      : 'chris evans',
                voted      : 16,
                usersVoted : [
                  { name: 'Jeanie Bulgrin', avatar: require('@/assets/images/portrait/small/avatar-s-8.jpg') },
                  { name: 'Graig Muckey',   avatar: require('@/assets/images/portrait/small/avatar-s-3.jpg') }
                ]
              }
            ]

          }
        ],
        twitterFeeds: [
          {
            authorAvatar      : require('@/assets/images/portrait/small/avatar-s-12.jpg'),
            authorUsername    : 'tiana59',
            authorDisplayName : 'Tiana Vercetti',
            content           : 'I love cookie chupa chups sweet tart apple pie chocolate bar. Jelly-o oat cake chupa chups.',
            tags              : ['js', 'vuejs'],
            time              : 'Mon Dec 12 2018 07:46:05 GMT+0000 (GMT)'
          },
          {
            authorAvatar      : require('@/assets/images/portrait/small/avatar-s-12.jpg'),
            authorUsername    : 'tiana59',
            authorDisplayName : 'Tiana Vercetti',
            content           : 'Carrot cake cake gummies I love I love tiramisu. Biscuit marzipan cookie lemon drops.',
            tags              : ['python'],
            time              : 'Mon Dec 11 2018 01:05:05 GMT+0000 (GMT)'
          },
          {
            authorAvatar      : require('@/assets/images/portrait/small/avatar-s-12.jpg'),
            authorUsername    : 'tiana59',
            authorDisplayName : 'Tiana Vercetti',
            content           : 'I love cookie chupa chups sweet tart apple pie chocolate bar. Jelly-o oat cake chupa chups .',
            tags              : [],
            time              : 'Mon Dec 10 2018 03:33:05 GMT+0000 (GMT)'
          },
          {
            authorAvatar      : require('@/assets/images/portrait/small/avatar-s-12.jpg'),
            authorUsername    : 'tiana59',
            authorDisplayName : 'Tiana Vercetti',
            content           : 'Muffin candy caramels. I love caramels tiramisu jelly. Pie I love wafer. Chocolate cake lollipop tootsie roll cake.',
            tags              : ['django', 'vuejs'],
            time              : 'Mon Dec 9 2018 08:47:05 GMT+0000 (GMT)'
          }
        ],
        wasSidebarOpen: null
      }
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
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: media.sources,
            poster: media.poster
          }
        }
      }
    },
    methods: {
      loadContent () {
        this.$vs.loading({
          background: this.backgroundLoading,
          color: this.colorLoading,
          container: '#button-load-more-posts',
          scale: 0.45
        })
        setTimeout(() => {
          this.$vs.loading.close('#button-load-more-posts > .con-vs-loading')
        }, 3000)
      }
    },
    components: {
      videoPlayer
    },
    mounted () {
      this.wasSidebarOpen = this.$store.state.reduceButton
      this.$store.commit('TOGGLE_REDUCE_BUTTON', true)
    },
    beforeDestroy () {
      if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
    }
  }

</script>


<style lang="scss">
  @import "@/assets/scss/vuexy/pages/profile.scss";
</style>
