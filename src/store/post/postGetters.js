const getters = {
  getPosts: state => {
    let posts = []
    state.posts.forEach((item) => {
      let media = []
      if (item.pictures.length > 0) {
        item.pictures.forEach((mediaItem) => {
          if (mediaItem.type === 'jpg') {
            media.push({
              img: mediaItem.path
            })
          } else if (mediaItem.type === 'mp4') {
            media.push({
              sources: [{
                type: 'video/mp4',
                src: mediaItem.path
              }],
              poster: mediaItem.thumbnail[0]
            })
          }
        })
      }
      posts.push({
        ...item,
        media: media
      })
    })

    return posts
  },
  getPostDetail: state => {
    let data = []

    state.postDetail.pictures.forEach((item) => {
      if (item.type === 'jpg') {
        data.push({
          img: item.path
        })
      } else if (item.type === 'mp4') {
        data.push({
          sources: [{
            type: 'video/mp4',
            src: item.path
          }],
          poster: item.thumbnail[0]
        })
      }
    })

    return data
  }
}

export default getters
