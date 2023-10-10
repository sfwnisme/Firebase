import React, { useEffect, useState } from 'react'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import { storage } from './firebase'
import { v4 } from 'uuid'

const App = () => {

  const [imageUpload, setImageUpload] = useState(null)
  const [imageUrls, setImageUrls] = useState([])
  // console.log(imageList)

  // const uploadImage = () => {
  //   if (imageUpload == null) return;
  //   const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
  //   uploadBytes(imageRef, imageUpload).then((res) => {
  //     console.log('image uploaded')
  //   }).then(() => {
  //     setImageUpload(null)
  //   })
  // }

  const uploadImage = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    try {
      const uploading = await uploadBytes(imageRef, imageUpload)
      console.log('api', uploading)
      console.log('uploaded')
    } catch (error) {
      console.error(error.message)
    }

  }

  const imagesListRef = ref(storage, 'images/')

  // call the images
  // useEffect(() => {
  //   listAll(imagesListRef).then((res) => {
  //     console.log(res.items)
  //     res.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         console.log(url)
  //         setImageUrls((prev) => [...prev, url])
  //       })
  //     })
  //   })
  // }, [])

  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);
  //         console.log('test')
  //       });
  //     });
  //   });
  // }, []);

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      let promises = response.items.map((item) => getDownloadURL(item))
      Promise.all(promises).then((urls) => {
        setImageUrls(urls)
      })
    });
  }, []);

  console.log('----------testing', imageUrls)

  // check upload avalibilty
  const canSave = imageUpload !== null

  return (
    <div>
      <input type="file" onChange={(event) => setImageUpload(event.target.files[0])} />
      <input type="button" disabled={!canSave} onClick={uploadImage} value='upload' />
      {
        imageUrls.map((url, index) => { return <img src={url} key={index} /> })
      }
    </div>
  )
}

export default App