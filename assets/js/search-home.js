const listResult  = document.getElementById('home-result')
const searchInput = document.getElementById('home-bar');

function setList(result) {
  clearList();
  for (const song of result) {
    
    const title = makeTitle(song.name);
    const name = document.createTextNode(title);

    const div_name = document.createElement('div');
    div_name.classList.add('f-w-500');
    div_name.classList.add('f-15')
    div_name.appendChild(name);

    const author = document.createTextNode(song.singer);
    
    const div_author = document.createElement('div');
    div_author.classList.add('f-w-100');
    div_author.classList.add('f-13');
    div_author.classList.add('font-dark');
    div_author.appendChild(author);

    const a = document.createElement('a');
    a.classList.add('realname');
    a.href = "./song/" + song.name.replaceAll(" ", "-");
    a.appendChild(div_name);
    a.appendChild(div_author);

    const divSmallCard = document.createElement('div');
    divSmallCard.classList.add('ProfileCard-realName');
    divSmallCard.appendChild(a);

    const divBigCard = document.createElement('div');
    divBigCard.classList.add('ProfileCard-details');
    divBigCard.appendChild(divSmallCard);

    const icon = document.createElement('i');
    icon.classList.add('fa');
    icon.classList.add('fa-music');

    const divIcon = document.createElement('div');
    divIcon.classList.add('ProfileCard-avatar');
    divIcon.appendChild(icon);

    const entry = document.createElement('div');
    entry.classList.add('ProfileCard');
    entry.classList.add('u-cf');
    entry.appendChild(divIcon);
    entry.appendChild(divBigCard);
    
    listResult.appendChild(entry);
  }
  listResult.classList.add('is-open');
  if (result.length === 0) {
    setEmpty();
  }
}

function clearList() {
  listResult.classList.remove('is-open');
  while (listResult.firstChild) {
    listResult.removeChild(listResult.firstChild);
  }
}

function setEmpty() {
  clearList();
  const item = document.createElement('div');
  item.classList.add('new-class');
  const text = document.createTextNode('No Results Found!');
  item.appendChild(text);
  listResult.appendChild(item);
}

function makeTitle(title) {
  const words = title.split(" ");
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  const newTitle = words.join(" ");
  return newTitle;
}


searchInput.addEventListener('input', (event) => {
  const term = event.target.value.toLowerCase();
  
  if (term && term.length > 0) {
    setList(songs);
    const results = [];

    var index = 0;
    while ((results.length < 7) && (index < songs.length)) {
      const song = songs[index];
      if (song.name.includes(term)) {
        results.push(song)
      }
      index++;
    }

    if (results.length > 0) {
      setList(results);
    } else {
      setEmpty();
    }
  } else {
    clearList()
  }

})

