'use client';
import React, { useState } from 'react';
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<null | File>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedImage(file);
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('/api/v1/postOpenAiData', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const jsonData = await response.json();
        setResponseData(jsonData);
        console.log(jsonData);
        setSelectedImage(null);
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h1>Home</h1>
      <div className="mb-6">
        <div className="flex gap-2">
          <Input onChange={handleImageUpload} accept="image/*" isRequired type="file" label="file" className="max-w-xs" color="success" />
          <Button color="success" onClick={handleSubmit} disabled={!selectedImage || isLoading}>
            {isLoading ? 'アップロード中...' : 'アップロード'}
          </Button>
        </div>
      </div>
      {responseData && (
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-4">
            <div className="text-3xl">{responseData.title}</div>
            <div className="flex flex-col gap2">
              <div className="text-xl">問題</div>
              <div>{responseData.PhysicsIssue}</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Step 1: {responseData.step1}</div>
            <div>Step 2: {responseData.step2}</div>
            <div>Step 3: {responseData.step3}</div>
            <div>Answer: {responseData.Answer}</div>
            <div>Explanation: {responseData.Explanation}</div>
          </div>
        </div>
      )}
    </div>
  );
}
