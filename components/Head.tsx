import Head from 'next/head'

export default function HeadInfo({
  title,
  desc,
  image,
}: {
  title: string
  desc: string
  image: string
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
    </Head>
  )
}
