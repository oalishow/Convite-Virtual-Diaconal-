let rawUrl = "https://youtu.be/nTdhx9Zz04U?list=PLUK8yrBE-TeU";
try {
  let urlObj = new URL(rawUrl.startsWith('http') ? rawUrl : 'https://' + rawUrl);
  if (urlObj.hostname === 'youtu.be') {
      let videoId = urlObj.pathname.slice(1);
      let listId = urlObj.searchParams.get('list');
      if (videoId) {
          let newUrl = 'https://www.youtube-nocookie.com/embed/' + videoId;
          if (listId) newUrl += '?list=' + listId;
          console.log(newUrl);
      }
  }
} catch (e) {
  console.log(e);
}
