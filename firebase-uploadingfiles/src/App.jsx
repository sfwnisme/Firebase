import React, { useEffect, useState } from 'react'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import { storage } from './firebase'
import { v4 } from 'uuid'

const App = () => {

  const [imageUpload, setImageUpload] = useState(null)
  const [imageList, setImageList] = useState([])
  console.log(imageList)

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

  const imageListRef = ref(storage, 'images/')

  // call the images
  useEffect(() => {
    listAll(imageListRef).then((res) => {
      console.log(res.items)
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          console.log(url)
          setImageList((prev) => [...prev, url])
        })
      })
    })
  }, [])

  // check upload avalibilty
  const canSave = imageUpload !== null

  return (
    <div>
      <input type="file" onChange={(event) => setImageUpload(event.target.files[0])} />
      <input type="button" disabled={!canSave} onClick={uploadImage} value='upload' />

      {
        imageList.map((url, index) => { return <img src={url} key={index} /> })
      }
    </div>
  )
}

export default App