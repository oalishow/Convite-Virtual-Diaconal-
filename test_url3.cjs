let rawUrl = "https://www.youtube.com/playlist?list=PLUK8yrBE-TeU";
try {
  let urlObj = new URL(rawUrl.startsWith('http') ? rawUrl : 'https://' + rawUrl);
  if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.includes('/playlist')) {
      let listId = urlObj.searchParams.get('list');
      if (listId) {
          let newUrl = 'https://www.youtube-nocookie.com/embed/videoseries?list=' + listId;
          console.log(newUrl);
      }
  }
} catch (e) {
  console.log(e);
}
