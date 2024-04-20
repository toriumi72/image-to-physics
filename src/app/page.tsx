'use client';

import React, { useState } from 'react';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<null | File>(null);
  const [responseText, setResponseText] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedImage(file);
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('/api/v1/postOpenAiData', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResponseText(data);
        setSelectedImage(null);
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <div>
        <h4>Upload Image</h4>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {selectedImage && <p>Selected Image: {selectedImage.name}</p>}
        <button onClick={handleSubmit} disabled={!selectedImage}>
          Upload
        </button>
      </div>
      {responseText && (
        <div>
          <h4>Response from OpenAI API:</h4>
          <p>{responseText}</p>
        </div>
      )}
    </div>
  );
}