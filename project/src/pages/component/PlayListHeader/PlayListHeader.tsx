import {
  CaretDownOutlined,
  CaretUpOutlined,
  createFromIconfontCN,
  DownloadOutlined,
  PlusOutlined,
  ShareAltOutlined,
  StarOutlined
} from '@ant-design/icons'
import { FunctionComponent, useState } from 'react'
import { Link } from 'react-router-dom'
import store from '../../../redux/store'
import { subPlayList } from '../../../service/api/reqLoginApi/songSheets'
import { SongSheetType } from '../../../type/songSheet'
import { formatNumber, formatTime } from '../../../utils'
import HeaderButton from '../headerButton/HeaderButton'
import style from './PlayListHeader.module.css'

export enum PLAY_LIST_TYPE {
  songSheet = '歌单',
  album = '专辑'
}

interface PlayListHeaderProps {
  listInfo: Partial<SongSheetType>
  type: PLAY_LIST_TYPE
  handlePlayList?: () => void
  toggleSubscribe?: () => void
}
const IconFont = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_3370146_f9nlawuexbc.js'
})
const PlayListHeader: FunctionComponent<PlayListHeaderProps> = ({
  listInfo,
  type,
  handlePlayList,
  toggleSubscribe
}) => {
  const userId = store.getState().user.userInfo?.userId
  const [isFold, setIsFold] = useState(true)
  const handleToggleFoldDesc = () => {
    setIsFold(!isFold)
  }
  if (!listInfo) {
    return <div></div>
  } else {
    return (
      <div>
        {listInfo && (
          <div className={style.playListHeader}>
            <div className={style.listImage}>
              <img src={listInfo.coverImgUrl} alt='' />
            </div>
            <div className={style.listDescribe}>
              <div className={style.listTitle}>
                <div className={style.listType}>{type}</div>
                <div className={style.listName}>{listInfo.name}</div>
              </div>
              {type === PLAY_LIST_TYPE.songSheet && (
                <Link to={'/'} className={style.creator}>
                  <img src={listInfo.creator?.avatarUrl} alt='' />
                  <div className={style.creatorName}>{listInfo.creator?.nickname}</div>
                  <div className={style.createTime}>
                    {formatTime(listInfo.createTime || '')}创建
                  </div>
                </Link>
              )}
              <div className={style.handle}>
                <div className={'combineBtn'}>
                  <HeaderButton
                    onClick={handlePlayList}
                    bg='#ec4141'
                    bgHover='#cc3232'
                    icon={
                      <IconFont className={`${style.playIcon} ${style.icon}`} type={'icon-play'} />
                    }
                    direction='left'
                    content={`播放全部`}
                  />
                  <HeaderButton
                    bg='#ec4141'
                    bgHover='#cc3232'
                    direction='right'
                    border='left'
                    icon={<PlusOutlined />}
                  />
                </div>
                <HeaderButton
                  icon={<StarOutlined />}
                  disabled={listInfo.userId === userId}
                  onClick={toggleSubscribe}
                  content={
                    listInfo.subscribed
                      ? `已收藏${
                          listInfo.subscribed
                            ? '(' + formatNumber(listInfo.subscribedCount || 0) + ')'
                            : ''
                        }`
                      : `收藏${
                          listInfo.subscribedCount
                            ? '(' + formatNumber(listInfo.subscribedCount || 0) + ')'
                            : ''
                        }`
                  }
                />
                <HeaderButton
                  icon={<ShareAltOutlined />}
                  content={`分享${
                    listInfo.shareCount ? '(' + formatNumber(listInfo.shareCount || 0) + ')' : ''
                  }`}
                />
                <HeaderButton icon={<DownloadOutlined />} content={`下载全部`} />
              </div>
              <div className={style.otherDesc}>
                {type === PLAY_LIST_TYPE.songSheet && (
                  <div>
                    <div className={`${style.otherDescItem} ${style.tags}`}>
                      标签：
                      {listInfo?.tags?.map((tag: any, idx: number) => (
                        <div key={idx} className={style.tag}>
                          {idx != 0 ? '/ ' : ''}
                          {tag}
                        </div>
                      ))}
                    </div>
                    <div className={`${style.otherDescItem}`}>
                      <div>歌曲：{listInfo.trackCount}</div>
                      <div>播放：{formatNumber(listInfo.playCount || 0)}</div>
                    </div>
                    <div className={`${style.otherDescItem}`}>
                      <div
                        className={isFold ? 'line2' : ''}
                        dangerouslySetInnerHTML={{
                          __html:
                            '简介：' +
                            (listInfo.description
                              ? listInfo?.description?.replaceAll('\n', '<br/>')
                              : '')
                        }}
                      ></div>
                      <div style={{ cursor: 'pointer' }} onClick={handleToggleFoldDesc}>
                        {isFold ? <CaretDownOutlined /> : <CaretUpOutlined />}
                      </div>
                    </div>
                  </div>
                )}
                {type === PLAY_LIST_TYPE.album && (
                  <div className={style.albumCreator}>
                    <div>
                      歌手：<span className={style.creatorName}>{listInfo.creator?.nickname}</span>
                    </div>
                    <div className={style.createTime}>
                      时间：{formatTime(listInfo.createTime || '', 'YYYY-MM-DD')}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default PlayListHeader
