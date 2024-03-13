import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setFile, setFileUpload } from '../redux/providerRedux/fileSlice';
import { useToast } from "@chakra-ui/react";

const FileUpload = ({setIsFileJustUploaded}) => {
    const toast = useToast()
    const dispatch = useDispatch()
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Lütfen bir dosya seçin.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                dispatch(setFile(result.file))
                setIsFileJustUploaded(true);
                dispatch(setFileUpload(true))
                toast({
                    title: "Dosya Başarıyla Gönderildi",
                    status: "success",
                    duration: "1000",
                    isClosable: true,
                    position: "top-right",
                })
            } else {
                toast({
                    title: "Error Occured!",
                    description: "Dosya Yükleme sırasında bir hata oluştur.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
            }

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Dosya Yükleme sırasında bir hata oluştur.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        }
    };
    return (
        <div className='flex justify-between'>
            <input type="file" onChange={handleFileChange} />
            <button className='border rounded-sm p-1 hover:bg-gray-400 hover:bg-opacity-10' onClick={handleUpload}>Dosya Yükle</button>
        </div>
    );
};

export default FileUpload;
