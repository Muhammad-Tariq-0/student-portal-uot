import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import { v4 as uuid } from "uuid";
import { Button } from 'antd'

export default function UploadImage() {
  const [imageUrl, setImageUrl] = useState([]);

  const [state, setstate] = useState(false);

  const readImages = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const storageRef = firebase.storage().ref("table").child(id);
    const imageRef = firebase.database().ref("table").child("daily").child(id);
    await storageRef.put(file);
    storageRef.getDownloadURL().then((url) => {
      imageRef.set(url);
      const newState = [...imageUrl, { id, url }];
      setImageUrl(newState);
    });
  };

  const getImageUrl = () => {
    const imageRef = firebase.database().ref("table").child("daily");
    imageRef.on("value", (snapshot) => {
      const imageUrls = snapshot.val();
      const urls = [];
      for (let id in imageUrls) {
        urls.push({ id, url: imageUrls[id] });
      }
      const newState = [...imageUrl, ...urls];
      setImageUrl(newState);
    });
  };
  const deleteImage = (id) => {
    setstate(true);
    const storageRef = firebase.storage().ref("table").child(id);
    const imageRef = firebase.database().ref("table").child("daily").child(id);
    storageRef.delete().then(() => {
      imageRef.remove();
    });
  };
  useEffect(() => {
    getImageUrl();
  }, []);

  console.log(imageUrl.length)
  return (
    <div>
      <h3>Add TimeTable</h3>
      {imageUrl
        ? imageUrl.map(({ id, url }) => {
          return (
            <div key={id}>
              <iframe src={url} title='' alt="loading" width='100%' height='400px'
                frameBorder="0" />
              <br /> <br />
              <Button type='danger' style={{ float: 'right' }} onClick={() => deleteImage(id)}>Delete</Button>
            </div>
          );
        })
        : ''}
      {state === false && imageUrl.length > 0 ? (
        <input
          type="file"
          accept="application/pdf"
          disabled
          onChange={readImages}
        />
      ) : (
          <input type="file" accept="application/pdf" onChange={readImages} />
        )}
    </div>
  );
}
