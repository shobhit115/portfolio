import { useState } from 'react';
import { Blog, blogs } from '../data/blog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


const categories = [
  "All",
  "Hackathons & Events",
  "Projects & Engineering",
  "Research & AI",
  "Learning & Growth"
];

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [filter, setFilter] = useState('All');

  const filteredBlogs =
    filter === "All"
      ? blogs
      : blogs.filter(blog => blog.category === filter);

  return (
    <section id="blogs" className="relative py-20 px-4">
      <div className="container mx-auto max-w-6xl">

        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Blogs Nebula
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My journey through hackathons, engineering, research, and growth.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              variant={filter === category ? "default" : "outline"}
              className={`font-orbitron ${filter === category
                  ? 'bg-primary text-primary-foreground border-glow'
                  : 'hover:border-primary/50'
                }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => (
            <div
              key={index}
              onClick={() => setSelectedBlog(blog)}
              className="group relative bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer animate-fade-in-up"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.images[0]}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60"></div>
                <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs px-3 py-1 rounded-full font-orbitron">
                  {blog.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-orbitron text-xl font-semibold mb-2">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={!!selectedBlog} onOpenChange={() => setSelectedBlog(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-primary/30">
            {selectedBlog && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-orbitron text-2xl text-gradient">
                    {selectedBlog.title}
                  </DialogTitle>
                  <p className="text-muted-foreground text-sm">
                    {selectedBlog.date} • {selectedBlog.readTime}
                  </p>
                </DialogHeader>

                {/* Image Cluster / Gallery */}
                {selectedBlog.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
                    {selectedBlog.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`blog-${i}`}
                        className="h-40 w-full object-cover rounded-lg border border-primary/20 hover:border-primary/50 transition"
                      />
                    ))}
                  </div>
                )}


                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {selectedBlog.content}
                  </ReactMarkdown>
                </div>


                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedBlog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/30 text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Blogs;
