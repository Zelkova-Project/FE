// 이미지 리사이즈

// png, jpeg -> webp (용량 축소를 위해)


const transferWebp = async (file, isProfile = false) => {
    const maxScale = isProfile ? 120 : 800;

    let blobData = '';

    const reader = new FileReader();
    const 원본파일이름 = file.name;

    let canvas = document.createElement("canvas");

    await new Promise((res, rej) => {
        reader.onload = (e) => {
            let img = new Image();
            img.src = e.target.result;
            
            img.onload = () => {
                let widthScale = Math.min(1, maxScale / img.width);
                let heightScale = Math.min(1, maxScale / img.height);

                canvas.width = img.width * widthScale;
                canvas.height = img.height * heightScale;
                
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




