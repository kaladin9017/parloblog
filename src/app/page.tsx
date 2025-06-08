import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/api'

export default function Home() {
  const posts = getAllPosts()
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 4)
  const olderPosts = posts.slice(4)

  return (
    <main className="min-h-screen">
      <div className="blog-container">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              The fun, easy, and interactive way to learn French
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover tips, stories, and insights to help you master French naturally
            </p>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                {featuredPost.featured_image && (
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    <Image
                      src={featuredPost.featured_image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                <div className="p-8 md:w-1/2">
                  <div className="text-sm font-semibold text-blue-600 mb-2">
                    {featuredPost.categories?.[0]?.toUpperCase()}
                  </div>
                  <h2 className="text-3xl font-bold mb-4">
                    <Link href={`/blog/${featuredPost.slug}`} className="hover:text-blue-600">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{featuredPost.summary}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>BY {featuredPost.author}</span>
                    <span className="mx-2">|</span>
                    <time dateTime={featuredPost.date}>
                      {new Date(featuredPost.date).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Recent Posts Grid */}
        <section className="py-12 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Link href={`/blog/${post.slug}`} className="block">
                  {post.featured_image && (
                    <div className="relative h-48">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-sm font-semibold text-blue-600 mb-2">
                      {post.categories?.[0]?.toUpperCase()}
                    </div>
                    <h3 className="text-xl font-bold mb-2 hover:text-blue-600">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.summary}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>BY {post.author}</span>
                      <span className="mx-2">|</span>
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </time>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Older Posts */}
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-8">OLDER POSTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {olderPosts.map((post) => (
              <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Link href={`/blog/${post.slug}`} className="block">
                  {post.featured_image && (
                    <div className="relative h-48">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-sm font-semibold text-blue-600 mb-2">
                      {post.categories?.[0]?.toUpperCase()}
                    </div>
                    <h3 className="text-xl font-bold mb-2 hover:text-blue-600">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.summary}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>BY {post.author}</span>
                      <span className="mx-2">|</span>
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </time>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-blue-50">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">HEY THERE, WE'RE PARLO</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Parlo is not just another language app. There's no complicated grammar rules presented out of context, 
              no boring flashcards, no robotic conversations. It's simply a place where you can learn French naturally, 
              in real-world contexts and conversations, through all the fits and starts, all successes and mistakes.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Occasionally, we share tips worldwide. Every now and then, we design new features. 
              Sometimes, we help students become fluent. (Mostly, we make learning fun.)
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
