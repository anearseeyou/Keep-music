/**
 * 因为歌手 排行 和 专辑的数据结构很像 所以需要抽象出来一个类复用
 */

export default class Song {
    constructor({id, mid, singer, name, album, duration, image, url}) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }
}

/**
 * 通过分析 发现musicData的数据结构都是相同的 所以再把song这个类进行二次封装 避免过多重复代码
 * @param musicData
 */

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        mid: musicData.songmid,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T001R300x300M00${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    })
}

function filterSinger(singer) {
    let ret = [];
    if (!singer) {
        return '';
    }
    singer.forEach((s) => {
        ret.push(s.name);
    });
    return ret.join('/');
}