// 이미지 리사이즈

// png, jpeg -> webp (용량 축소를 위해)


const transferWebp = async (file) => {
    let blobData = '';

    const reader = new FileReader();
    const 원본파일이름 = file.name;

    let canvas = document.createElement("canvas");

    await new Promise((res, rej) => {
        reader.onload = (e) => {
            let img = new Image();
            img.src = e.target.result;
            
            img.onload = () => {
                let scale = Math.min(1, 800 / img.width);
            
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                
                const ctx = canvas.getContext('2d');

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    blobData = blob;
                    res();
                }, "image/webp", 0.8);
            }
        }
        reader.readAsDataURL(file);
    });

    console.log('outside blobData >>> ', blobData);
    return blobData;
    // promise.then((res) => {
    //     blobData = res;
    //     console.log('blobData >>> ', blobData);
    //     return blobData;
    // })
}

const sendWebp = async (blobData, 원본파일이름) => {
    const formData = new FormData();
    formData.append("file", blobData, 원본파일이름);

    const { error, status, data } = await axios.post("/files/upload", param);
    return 원본파일이름;    
}

export {
    transferWebp,
    sendWebp
}



