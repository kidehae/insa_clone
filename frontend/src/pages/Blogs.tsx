import Drive from "../assets/Drive.png";
import Cyber from "../assets/cyber.png";
import Caution from "../assets/Caution.png";
import Mobile from "../assets/Mobile.png";
import Phising from "../assets/Phising.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Blog {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  learnMoreUrl: string;
  isFeatured: boolean;
  date?: string;
  author?: string;
}

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 1,
      title: "Phishing Attack Alert",
      description:
        "New phishing campaign targeting banking credentials detected",
      imageUrl: Cyber,
      learnMoreUrl: "https://www.insa.gov.et/web/guest/w/news-06-2",
      isFeatured: true,
      date: "2023-10-15",
      author: "Security Team",
    },
    {
      id: 2,
      title: "Printer Driver Vulnerability",
      description: "Critical security flaw in HP printer drivers discovered",
      imageUrl: Drive,
      learnMoreUrl: "https://www.insa.gov.et/web/guest/w/news-02-6",
      isFeatured: false,
      date: "2023-10-14",
      author: "Tech Support",
    },
    {
      id: 3,
      title: "Public WiFi Warning",
      description: "Avoid sensitive transactions on unsecured networks",
      imageUrl: Caution,
      learnMoreUrl: "https://www.insa.gov.et/web/guest/w/news-1-1",
      isFeatured: false,
      date: "2023-10-13",
      author: "Network Team",
    },
    {
      id: 4,
      title: "Fake App Scam",
      description: "Malicious apps mimicking popular services on app stores",
      imageUrl: Mobile,
      learnMoreUrl:
        "https://www.insa.gov.et/web/guest/w/untitled-basic-web-content-13",
      isFeatured: false,
      date: "2023-10-12",
      author: "Mobile Security",
    },
    {
      id: 5,
      title: "Ransomware Attack",
      description: "New ransomware variant encrypting corporate networks",
      imageUrl: Phising,
      learnMoreUrl: "https://www.insa.gov.et/web/guest/w/tips-13",
      isFeatured: false,
      date: "2023-10-11",
      author: "Cyber Defense",
    },
  ]);

  // Rotate featured blog every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBlogs((prevBlogs) => {
        const currentIndex = prevBlogs.findIndex((blog) => blog.isFeatured);
        const nextIndex = (currentIndex + 1) % prevBlogs.length;

        return prevBlogs.map((blog, index) => ({
          ...blog,
          isFeatured: index === nextIndex,
        }));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const featuredBlog = blogs.find((blog) => blog.isFeatured);
  const regularBlogs = blogs.filter((blog) => !blog.isFeatured);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-left mb-12">Blogs</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Featured Blog (50% width) */}
        <div className="lg:w-1/2">
          {featuredBlog && (
            <Link to={featuredBlog.learnMoreUrl} className="group">
              <div className="relative rounded-xl shadow-lg overflow-hidden transition-all duration-500 h-104 ">
                <img
                  src={featuredBlog.imageUrl}
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover transition-all duration-[1000ms] ease-out transform group-hover:scale-110" // 10% zoom
                />
                <p className="absolute -top-2 -right-2 bg-red-600 text-white text-base font-bold px-8 pt-2 pb-1 rounded-lg shadow-md">
                  {" "}
                  New
                </p>
                {/* Text Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-gray-200 mb-4">
                      {featuredBlog.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Regular Blogs (50% width in 2x2 grid) */}
        <div className="lg:w-1/2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularBlogs.map((blog) => (
              <Link to={blog.learnMoreUrl} key={blog.id} className="group">
                <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800  lg:mx-0 hover:shadow-xl">
                  <div className="relative h-48 w-full">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-black/50 height-[5px] top-[160px]">
                      <span className="absolute bottom-2  bg-grey-200 text-white text-xs px-2 p-1 rounded textcenter pt-3">
                        {blog.title}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
