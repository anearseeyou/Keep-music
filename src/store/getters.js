/**
 * 4.通过做一层包装 映射
 * 通常从getters里面取state里面的数据
 */

// 箭头函数简写 相当于function return回来一个state.singer
export const singer = state => state.singer;