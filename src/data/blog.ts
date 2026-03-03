
import IMG1 from '../assets/blogs/techthrive-2/IMG_1102_optimized_4500.jpg'

export interface Blog {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  images: string[]; // ✅ NEW
  date: string;
  readTime: string;
  tags: string[];
}


export const blogs: Blog[] = [

  {
    title: "Organizing College Hackathon – TechThrive 2.0",
    category: "Hackathons & Events",
    excerpt: "How I planned, organized and executed a college-level hackathon at Quantum University.",

    images: [IMG1], // ✅ MULTIPLE IMAGES

    content: `
## My experience

Organizing TechThrive-2 was one of the most defining experiences of my journey. I started it because I noticed many students were focusing only on theory, and I wanted to build a culture of innovation, collaboration, and hands-on learning. I personally built the entire website for the hackathon, and seeing 162 participants register and actively take part was a huge milestone. The event grew much bigger than I expected, and to make it memorable, we provided ID cards and welcome cards so every participant would remember the day and feel like they were part of something meaningful.

## Major Challenges

1. Permissions and approvals  
2. Team coordination  
3. Budget and sponsorship  
4. Promotion and registrations  

## What I Learned

- Leadership is about structure  
- Planning beats motivation  
- Marketing is as important as tech  

> This experience shaped my thinking as both an engineer and an organizer.
`,

    date: "2 Dec 2025",
    readTime: "3 min",
    tags: ["Hackathon", "Leadership", "Community"]
  }
];
