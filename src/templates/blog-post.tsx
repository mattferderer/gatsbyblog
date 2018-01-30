import * as React from "react"
import Helmet from "react-helmet"
import Link from "gatsby-link"
import { padStart } from "lodash"
import "prismjs/themes/prism.css"
import NotFoundPage from "../pages/404"
import SideBar from "../components/SideBar"
import * as config from "../constants"
import { createLinkToTag } from "../helpers"

export const Content = ({ content, className }) => <div className={className}>{content}</div>

export const HTMLContent = ({ content, className }) => <div
  className={className}
  dangerouslySetInnerHTML={{ __html: content }}
/>

export const BlogPostTemplate = ({ content, contentComponent, description, title, date, helmet, tags, path }) => {
  const PostContent = contentComponent || Content
  const d = new Date(date)
  const dateTime = d.getFullYear().toString() + "-" +
    padStart((d.getMonth() + 1).toString(), 2, "0") + "-" +
    padStart(d.getDate().toString(), 2, "0")

  return (
    <div id="article" className="box post-template">
      {helmet ? helmet : ""}
      <header className="post-header post">
        <h1 className="post-title">{title}</h1>
        <section className="post-meta">
          <time className="post-date" dateTime={dateTime}>{date}</time>
        </section>
      </header>
      <article className="post">
        <section className="post-content">
          <PostContent content={content} />
        </section>
        <PostTags tags={tags} />
        <Footer
          link={path}
          title={title}
        />
      </article>
    </div>
  )
}

const PostTags = ({ tags }: { tags: string[] }) => (
  <section className="post-tags">
    {tags && tags.map((tag, i) => (
      <span key={i}>
        <Link to={createLinkToTag(tag)}>{tag}</Link>
        {i !== (tags.length - 1) && <span> | </span>}
      </span>
    ))}
  </section>
)

const Post = ({ data }) => {
  if (typeof data === "undefined") {
    return NotFoundPage
  }
  const { markdownRemark: post } = data
  const coverImage = post.frontmatter.cover ?
    `${config.DOMAIN}${post.frontmatter.cover}` :
    `https://via.placeholder.com/1024x512/2bbdf7/FFF?text=${post.frontmatter.title}`
  return (
    <div className="article-container">
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet
            title={`${config.SITE_TITLE} | ${post.frontmatter.title}`}
            bodyAttributes={
              { class: "post-template" }
            }
            meta={[
              { name: "description", content: post.frontmatter.description },
              { property: "og:type", content: "website" },
              { property: "og:title", content: post.frontmatter.title },
              { property: "og:description", content: post.frontmatter.description },
              { property: "og:url", content: config.DOMAIN },
              { property: "og:image", content: coverImage },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:title", content: post.frontmatter.title },
              { name: "twitter:description", content: post.frontmatter.description },
              { name: "twitter:url", content: config.DOMAIN },
              { name: "twitter:image", content: coverImage },
            ]}
          />
        }
        date={post.frontmatter.date}
        title={post.frontmatter.title}
        path={post.frontmatter.path}
        tags={post.frontmatter.tags}
      />
      <SideBar />
    </div>
  )
}

const Footer = ({ link, title }) => (
  <footer className="post-footer">
    <PostShare
      link={`${config.DOMAIN}${link}`}
      title={title}
    />
    <section className="author">
      <figure className="author-image">
        <span
          className="img"
          style={
            {
              backgroundImage: "url(/img/profile-1.jpg)",
            }
          }
        >
          <span className="hidden">{config.AUTHOR}'s Picture. Just imagine something really nice &amp; it'll be a win win for both of us.</span>
        </span>
      </figure>
      <div className="bio">
        <h4>
          <span>{config.AUTHOR}</span>
        </h4>
        <p>{config.BIO}</p>
      </div>
    </section>
  </footer>
)

const PostShare = ({ link, title }) => (
  <section className="share">
    <h4>Sharing is caring. Help spread the word &amp; share this post!</h4>
    <ShareButton shareTo="twitter" link={link} title={title} />
    <ShareButton shareTo="linkedin" link={link} title={title} />
    <ShareButton shareTo="reddit" link={link} title={title} />
    <ShareButton shareTo="facebook" link={link} title={title} />
    <ShareButton shareTo="hacker-news" link={link} title={title} />
  </section>
)

const ShareButton = ({ shareTo, link, title }) => {
  const getShareLink = () => {
    switch (shareTo) {
      case "twitter":
        return `https://twitter.com/share?text=${title}&amp;url=${link}`
      case "linkedin":
        return `https://www.linkedin.com/shareArticle?mini=true&amp;url=${link}`
      case "reddit":
        return `https://reddit.com/submit?title=${title}&amp;url=${link}`
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${link}`
      case "hacker-news":
        return `https://news.ycombinator.com/submitlink?t=${title}&amp;u=${link}`
    }
  }
  const getWindowSize = () => {
    switch (shareTo) {
      case "twitter":
        return `width=550,height=235`
      case "linkedin":
        return `width=490,height=530`
      case "reddit":
        return `width=580,height=296`
      case "facebook":
        return `width=580,height=296`
      case "hacker-news":
        return `width=580,height=296`
    }
  }

  const ShareClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
    event.preventDefault()
    if (typeof window !== "undefined") {
      window.open(getShareLink(), `${shareTo}-share`, getWindowSize())
    }
  }

  return (
    <a
      className={`fa fa-${shareTo}`}
      href={link}
      onClick={ShareClick}
    >
      <span>Update</span>
    </a>
  )
}

export default Post

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date
        title
        description
        cover
        tags
      }
    }
  }
`
