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
  }
}

export default getters
