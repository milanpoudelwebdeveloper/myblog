interface IBlog {
  id: number | string
  title: string
  content: string
  coverimage: string
  category: number
  createdat: string
  categoryname: string
  published: boolean
}

interface ICategory {
  id: number | string
  name: string
  image: string
  createdat: string
}
