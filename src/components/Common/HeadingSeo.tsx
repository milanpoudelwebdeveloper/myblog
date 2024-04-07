import Head from 'next/head'

interface HeadingSeoProps {
  title: string
  description: string
  link: string
}

const HeadingSeo = ({ title, description, link }: HeadingSeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="programming coding reactjs nextjs expressjs nodejs aws cloud deployment frontend development backend development full stack development"
      />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta property="og:site_name" content="Blog | Code With Milan" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={link} />
      <meta property="og:image" content="/images/blogimage.jpg" />
      <meta property="og:image:alt" content="Nextjs Reactjs Nodejs AWS" />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@milanpoudel" />
      <meta name="twitter:creator" content="@milanpoudel" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/images/blogimage.jpg" />
    </Head>
  )
}

export default HeadingSeo
