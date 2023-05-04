// Next, we’ll create a utility function for parsing data from the file system. With this utility function, we’d like to:
// Parse each markdown file and get title, date, and file name (which will be used as id for the post URL).
// List the data on the index page, sorted by date.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');


// In lib/posts.js, we’ve implemented getSortedPostsData which fetches data from the file system. 
// But you can fetch the data from other sources, like an external API endpoint, and it’ll work just fine:
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
  
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
  }
  

// Important: The returned list is not just an array of strings
// it must be an array of objects that look like the comment above.
// Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name).
// Otherwise, getStaticPaths will fail.

// We need to fetch necessary data to render the post with the given id.
export function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
  
    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  }
  