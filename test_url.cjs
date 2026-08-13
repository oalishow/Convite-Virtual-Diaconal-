let rawUrl = "https://www.youtube.com/watch?v=nTdhx9Zz04U&list=PLUK8yrBE-TeU";
try {
  if (rawUrl.includes('youtube.com/watch')) {
     const urlObj = new URL(rawUrl.startsWith('http') ? rawUrl : 'https://' + rawUrl);
     let videoId = urlObj.searchParams.get('v');
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
