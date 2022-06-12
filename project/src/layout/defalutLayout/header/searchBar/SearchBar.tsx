import { RightOutlined, SearchOutlined } from '@ant-design/icons'
import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getHotSearch, getSearchSuggest, SEARCH_TYPE } from '../../../../service/api/search'
import { CSSTransition } from 'react-transition-group'
import style from './SearchBar.module.css'
import store from '../../../../redux/store'
import { publicSlice } from '../../../../redux/publicSlice/slice'
import { SearchSuggestType, useSearchSuggest } from '../../../../hooks/useSearchSuggest'
import { addMusic, getSongBaseInfoAndSet } from '../../../../controller/musicControl'

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = () => {
  //TODO,获取不到
  const { keyword } = useParams()
  const [hotSearch, setHotSearch] = useState([])
  const [searchInput, setSearchInput] = useState(keyword || '')
  const [searchSuggest, handleSearchSuggest, suggestLoading] = useSearchSuggest()
  const [showTip, setShowTip] = useState(false)
  const searchHistory = store.getState().public.searchHistory.slice(0, 6)
  const navigate = useNavigate()

  const handleGetHotSearch = () => {
    setShowTip(true)
    getHotSearch().then((res) => {
      setHotSearch(res.data)
    })
    searchInput && handleSearchSuggest(searchInput)
  }

  //优先使用searchText，searchText为空则使用state中的searchInput
  const handleSearch = (searchText?: string, key = 'songs') => {
    if (searchText === undefined && searchInput === '') {
      return
    }
    store.dispatch(publicSlice.actions.setSearchHistory(searchText || searchInput))
    setShowTip(false)
    key = key && (SEARCH_TYPE as any)[key?.toUpperCase()]
    navigate(`/search/${searchText || searchInput}?type=${key}`)
  }
  const clickHot = (item: any) => {
    setSearchInput(item)
    handleSearch(item)
  }
  const handleInputChange = (e: any) => {
    setSearchInput(e.target.value)
    handleSearchSuggest(e.target.value)
  }

  const handleSuggestClick = (item: any, type: keyof typeof SearchSuggestType) => {
    switch (type) {
      case 'songs':
        getSongBaseInfoAndSet(item.id)
        break
      case 'playlists':
        navigate(`/songSheet/${item.id}`)
        break
      case 'artists':
        navigate(`/artist/${item.id}`)
        break
      case 'albums':
        navigate(`/album/${item.id}`)
    }
  }

  return (
    <div
      onBlur={() => {
        setShowTip(false)
      }}
      onFocus={() => {
        handleGetHotSearch()
      }}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          handleSearch()
        }
      }}
      className={style.navSearch}
    >
      <SearchOutlined onClick={() => handleSearch()} className={style.searchIcon} />
      <input value={searchInput} onInput={handleInputChange} type='text' />
      <CSSTransition in={showTip} timeout={300} classNames='showTip' unmountOnExit>
        <div className={style.searchInfoTipWrap}>
          {searchInput === '' || searchSuggest?.order.length === 0 ? (
            <>
              <div className={style.history}>
                {searchHistory.length !== 0 && (
                  <>
                    <div className={style.historyTitle}>搜索历史</div>
                    {searchHistory.map((item) => {
                      return (
                        <div
                          key={item}
                          onClick={() => {
                            setSearchInput(item)
                            handleSearch(item)
                          }}
                          className={`${style.historyItem} line1`}
                        >
                          {item}
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
              <div className={style.hotSearch}>
                <div className={style.hotSearchTitle}>热搜榜</div>
                <div className={style.hotSearchList}>
                  {hotSearch.map((item: any, index: number) => {
                    return (
                      <div
                        onClick={() => clickHot(item.searchWord)}
                        className={style.hotSearchItem}
                        key={item.searchWord}
                      >
                        <div
                          className={`${style.hotItemIndex} ${
                            index < 3 ? style['hotItemIndex' + index] : ''
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className={style.hotItemInfo}>
                          <div className={style.hotItemKeyWord}>
                            <span
                              className={`${style.hotItemSearchWord} ${
                                index < 3 ? style.hotSearchBold : ''
                              }`}
                            >
                              {item.searchWord}
                            </span>
                            <span className={style.hotItemScore}>{item.score}</span>
                          </div>
                          {item.content && (
                            <div className={`${style.hotItemContent} line1`}>
                              <span>{item.content}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>搜索“{searchInput}”相关的内容</div>

              <div className={style.suggest}>
                {searchSuggest?.order.map((key) => {
                  return (
                    <div key={key}>
                      <div onClick={() => handleSearch('', key)} className={style.suggestType}>
                        {SearchSuggestType[key]}
                      </div>
                      <div className={style.suggestContent}>
                        {searchSuggest.data[key].map((item: any) => {
                          return (
                            <div
                              key={item.id}
                              onClick={() => handleSuggestClick(item, key)}
                              className={`${style.suggestItem} line1`}
                            >
                              {item.name}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </CSSTransition>
    </div>
  )
}

export default SearchBar
