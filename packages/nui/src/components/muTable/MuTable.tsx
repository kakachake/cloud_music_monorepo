import React, { FunctionComponent } from 'react'
import { pad } from '../../utils'
import style from './MuTable.module.css'
import styled from 'styled-components'
import { useClick } from '../../hooks/useClick'

export interface TableColumnType<DataType = any> {
  // 列名
  title: string
  //列数据在数据项中对应的路径，支持通过数组查询嵌套路径
  dataIndex?: string
  //React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
  key?: string
  render?: (data: DataType, idx: number) => JSX.Element
  width?: number | string
  align?: 'left' | 'center' | 'right'
  sorter?: (a: any, b: any) => number
}

interface TableProps {
  columns: TableColumnType[]
  data: any[]
  showIdx?: boolean
  onColDoubleClick?: (data: any, idx: number) => void
  onColClick?: (data: any, idx: number) => void
  hideHeader?: boolean
  height?: number
}

const MuTable: FunctionComponent<TableProps> = (props) => {
  const {
    columns,
    data,
    showIdx,
    onColDoubleClick,
    onColClick,
    hideHeader = false,
    height = 30
  } = props

  if (!data || (data && data?.length === 0)) {
    return <div className={style.empty}>暂无数据</div>
  }
  const [click, doubleClick] = useClick({
    clickFn: onColClick ?? (() => {}),
    doubleFn: onColDoubleClick ?? (() => {})
  })
  return (
    <div className={style.muTable}>
      <table>
        <thead>
          <tr style={hideHeader ? { display: 'none' } : {}} className={`${style.muTableHeader}`}>
            {showIdx === true && (
              <th>
                <div className={style.tableIndex}>序号</div>
              </th>
            )}
            {columns.map((item) => {
              return (
                <th key={item.title} style={{ width: item.width, textAlign: item.align }}>
                  {item.title}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, idx) => {
            return (
              <MuTableItemTr
                height={height}
                onDoubleClick={() => doubleClick(item, idx)}
                onClick={() => click(item, idx)}
                key={item.id}
                className={`${style.muTableItem}`}
              >
                {showIdx === true && (
                  <MuTableItemTd height={height} className={style.tableIndex}>
                    <div className={style.tableIndex}>{pad(idx + 1)}</div>
                  </MuTableItemTd>
                )}
                {columns.map((col) => {
                  return (
                    <MuTableItemTd
                      height={height}
                      className={style.td}
                      key={col.title}
                      style={{ width: col.width, textAlign: col.align }}
                    >
                      {col.render ? col.render(item, idx) : item[col.dataIndex || '']}
                    </MuTableItemTd>
                  )
                })}
              </MuTableItemTr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MuTable

const MuTableItemTr = styled.tr<{ height: number }>`
  height: ${(props) => props.height + 'px'};
  line-height: ${(props) => props.height + 'px'};
  font-size: 14px;
  user-select: none;
  vertical-align: baseline;
`
const MuTableItemTd = styled.td<{ height: number }>`
  height: ${(props) => props.height + 'px'};
  line-height: ${(props) => props.height + 'px'};
  font-size: 14px;
  user-select: none;
  vertical-align: baseline;
`
