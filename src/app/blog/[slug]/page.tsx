import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/api'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="blog-container">
      <article>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {post.featured_image && (
            <div className="relative w-full h-[400px]">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-600 mb-8">
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
              <span>•</span>
              <span>{post.author}</span>
            </div>
            <div className="prose prose-lg max-w-none">
              <MDXRemote source={post.content} />
            </div>
            <div className="mt-8 pt-8 border-t">
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
          </div>
        </div>
      </article>
    </div>
  )
} 