import React, { useState, useEffect } from "react";
import firebase from "../../IT-Admin-Side/TimeTable/firebase";
import { v4 as uuid } from "uuid";

export default function UploadImage() {
  const [imageUrl, setImageUrl] = useState([]);

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
  
  useEffect(() => {
    getImageUrl();
  }, []);

  console.log(imageUrl.length)
  return (
    <div>
      <h2>TimeTable</h2>
   
      {imageUrl
        ? imageUrl.map(({ id, url }) => {
            return (
              <div key={id}>
                <iframe src={url} alt="loading" width='100%' height='400px'
                frameBorder="0" />
                
              </div>
            );
          })
        : ''}
    </div>
  );
}
