// function to get image from wikipedia

import WikiImage from '../interfaces/WikiImage';

export default async (query: string) => {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${query}`;
    const response = await fetch(url);
    const data = (await response.json()) as WikiImage;
    const pages = data.query.pages;
    const page = Object.values(pages)[0];
    return page.original.source;
  } catch (e) {
    console.log(e);
    return 'https://via.placeholder.com/640x480.png?text=No+image+found';
  }
};
