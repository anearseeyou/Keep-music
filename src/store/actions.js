/**
 * 当需要改变多个状态和操作的时候 用到actions
 */
import * as types from './mutation-types';
import {playMode} from 'common/js/config';
import {shuffle} from 'common/js/util';

// 找到有序列表歌曲当中的索引 对应随机列表的索引是那个
function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}

// 选择播放
export const selectPlay = function ({commit, state}, {list, index}) {
    commit(types.SET_SQUENCE_LIST, list);
    if (state.mode === playMode.random) {
        let randomList = shuffle(list);
        commit(types.SET_PLAYLIST, randomList);
        index = findIndex(randomList, list[index]);
    }
    else {
        commit(types.SET_PLAYLIST, list);
    }
    commit(types.SET_CURRENT_INDEX, index);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
}

// 随机播放
export const randomPlay = function ({commit}, {list}) {
    commit(types.SET_PLAY_MODE, playMode.random);
    commit(types.SET_SQUENCE_LIST, list);
    let randomList = shuffle(list);
    commit(types.SET_PLAYLIST, randomList);
    commit(types.SET_CURRENT_INDEX, 0);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
}