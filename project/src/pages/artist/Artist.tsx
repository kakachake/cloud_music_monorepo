import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useArtist } from '../../hooks/useArtist'
import ArtistHeader from './artistHeader/ArtistHeader'
import style from './Artist.module.css'
import TabBar from '../component/tabBar/TabBar'
import TabBarItem from '../component/tabBar/TabBarItem'
import { useHotSongs } from '../../hooks/useHotSongs'
import AlbumItem from '../component/albumItem/AlbumItem'
import top50 from '../../assets/img/top50.png'
import { useArtistAlbums } from '../../hooks/useArtistAlbums'
import { useArtistDetail } from '../../hooks/useArtistDetail'
import { n2br, splitN } from '../../utils'
import { Loading } from '@cloud_music/nui'

interface ArtistProps {}

const Artist: FC<ArtistProps> = () => {
  const id = useParams().id
  const [artist, loading, error] = useArtist(id)
  const [hotSongs, hotSongsLoading] = useHotSongs(id)
  const [albums, albumsLoading] = useArtistAlbums(id)
  const [artistDetail, artistDetailLoading] = useArtistDetail(id)
  const [activeTab, setActiveTab] = useState(0)
  const [tabList, setTabList] = useState([
    {
      title: '专辑',
      id: 0
    },
    {
      title: 'MV',
      id: 1
    },
    {
      title: '歌手详情',
      id: 2
    },
    {
      title: '相似歌手',
      id: 3
    }
  ])
  if (error) {
    return <div>未知歌手信息！</div>
  }

  return (
    <div className={style.artistWrap}>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <ArtistHeader artist={artist} />
          <div className={style.content}>
            <TabBar activeIndex={activeTab}>
              {tabList.map((item, index) => {
                return (
                  <TabBarItem onClick={() => setActiveTab(item.id)} key={item.id} id={item.id}>
                    {item.title}
                  </TabBarItem>
                )
              })}
            </TabBar>
            <div className={style.tabContentWrap}>
              <div
                style={{
                  display: activeTab === 0 ? 'block' : 'none'
                }}
              >
                <div>
                  {hotSongs?.length > 0 && (
                    <AlbumItem title='热门50首' songs={hotSongs} pic={top50} />
                  )}
                </div>
                {albums && albums.length > 0 && (
                  <div>
                    {albums.map((item) => {
                      return (
                        <AlbumItem
                          title={item.name}
                          songs={item.songs}
                          key={item.id}
                          albumId={item.id}
                          pic={item.picUrl}
                        />
                      )
                    })}
                  </div>
                )}
              </div>

              {activeTab === 1 && 'MV'}

              <div
                style={{
                  display: activeTab === 2 ? 'block' : 'none'
                }}
              >
                <div className={style.descItem}>
                  <div className={style.descItemTitle}>{artist?.artist.name}简介</div>
                  <div>
                    {splitN(artistDetail.briefDesc)?.map((item) => {
                      return (
                        <p className={style.desc} key={item}>
                          {item}
                        </p>
                      )
                    })}
                  </div>
                </div>
                {artistDetail?.introduction?.map((item: any) => {
                  return (
                    <div key={item.ti} className={style.descItem}>
                      <div className={style.descItemTitle}>{item.ti}简介</div>
                      <div>
                        {splitN(item.txt)?.map((item) => {
                          return (
                            <p className={style.desc} key={item}>
                              {item}
                            </p>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              {activeTab === 3 && '相似歌手'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Artist
