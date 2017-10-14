/**
 * 4.通过做一层包装 映射
 * 通常从getters里面取state里面的数据
 */

// 箭头函数简写 相当于function return回来一个state.singer
// 管理歌手信息
export const singer = state => state.singer;

// 播放器状态管理 --> 有序 随机 单曲循环
export const playing = state => state.playing;

export const fullScreen = state => state.fullScreen;

export const playlist = state => state.playList

export const squenceList = state => state.squenceList;

export const mode = state => state.mode;

export const currentIndex = state => state.currentIndex;

export const currentSong = (state) => {
    return state.playList[state.currentIndex] || {}
}