import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/api'

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <div className="blog-container">
      <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
            <Link href={`/blog/${post.slug}`} className="block">
              {post.featured_image && (
                <div className="relative w-full h-48">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
                  {post.title}
                </h2>
                <div className="text-gray-600 text-sm mb-3">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                  {' • '}
                  {post.author}
                </div>
                <p className="text-gray-700 mb-4 line-clamp-3">{post.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {(post.categories || []).map((category) => (
                    <span
                      key={category}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
} 