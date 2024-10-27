const deleteAllCookies = () => {
    const cookies = document.cookie.split(";"); // Get all cookies

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;

        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}

const putCookie = (accessToken) => {
    document.cookie = "accessToken=" + accessToken + '; max-age=604800; path=/';
}

  export {
    deleteAllCookies,
    putCookie
  }
