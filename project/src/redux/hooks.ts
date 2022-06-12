import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from './store' //获取state类型

// 返回一个带有类型定义的useSelector，便于使用。
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
