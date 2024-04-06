interface IBlog {
  id: number | string
  title: string
  content: string
  coverimage: string
  createdat: string
  categories: string[]
  published: boolean
}

interface ICategory {
  id: number | string
  name: string
  image: string
  createdat: string
}

interface IAddBlog {
  title: string
  coverImage: File | string
  content: string
  categories: string[] | number[]
  published: boolean
}
