export const area = [
  {
    name: '全部',
    id: -1
  },
  {
    name: '华语',
    id: 7
  },
  {
    name: '欧美',
    id: 96
  },
  {
    name: '日本',
    id: 8
  },
  {
    name: '韩国',
    id: 16
  },
  {
    name: '其他',
    id: 0
  }
]

export const type = [
  {
    name: '全部',
    id: -1
  },
  {
    name: '男歌手',
    id: 1
  },
  {
    name: '女歌手',
    id: 2
  },
  {
    name: '组合/乐队',
    id: 3
  }
]

export const initial: {
  name: string
  id: string
}[] = [
  {
    name: '热门',
    id: '-1'
  }
]

'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((item, idx) => {
  initial.push({
    name: item,
    id: item
  })
})
initial.push({
  name: '#',
  id: '#'
})
