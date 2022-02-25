const t_std = new L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"
});
const t_pale = new L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"
});
const t_pic = new L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>国土地理院</a>"
});
const Map_b = {
    "地理院地図 標準": t_std,
    "地理院地図 淡色": t_pale,
    "地理院写真": t_pic,
};
const map = L.map('map', {
    center: [36.099887,138.75],
    zoom: 5,
    layers: [t_std],
    maxzoom: 18,
    minZoom: 4,
});
L.control.scale({imperial: false}).addTo(map);
L.control.layers(Map_b).addTo(map);
const markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    removeOutsideVisibleBounds: true,
    disableClusteringAtZoom: 19
});
const Layer_Sake_Map = new L.geoJson(json_Sake_Map, {
    onEachFeature: function (feature, layer) {
        const Marker_T = feature.properties.Brewery
            + '「' + feature.properties.Brand + '」'
        layer.bindTooltip(Marker_T);
        const popupContent = '<table>' 
            + '<tr><th scope="row" width="110">銘柄（商品名）</th><td width="220">' + feature.properties.Brand + '<br>（' + feature.properties.Sub_Brand + '）</td></tr>'
            + (feature.properties.Specific_n !== null ? '<tr><th scope="row">特定名称</th><td>' + feature.properties.Specific_n + '</td></tr>' : '')
            + '<tr><th scope="row">蔵元</th><td>' + feature.properties.Brewery + '</td></tr>'
            + (feature.properties.Rice !== null ? '<tr><th scope="row">使用米</th><td>' + feature.properties.Rice + '</td></tr>' : '')
            + '<tr><th scope="row">精米歩合</th><td>' + feature.properties.Ratio + '%</td></tr>'
            + (feature.properties.Yeast !== null ? '<tr><th scope="row">使用酵母</th><td>' + feature.properties.Yeast + '</td></tr>' : '')
            + (feature.properties.Alcohol_de !== null ? '<tr><th scope="row">アルコール度数</th><td>' + feature.properties.Alcohol_de + '%</td></tr>' : '')
            + (feature.properties.Sake_de !== null ? '<tr><th scope="row">日本酒度</th><td>' + new Intl.NumberFormat("en-US", {signDisplay:'always'}).format(feature.properties.Sake_de) + '</td></tr>' : '')
            + '<tr><th scope="row">酒造年度</th><td>' + feature.properties.BY + '</td></tr>'
            + '<tr><th scope="row">感想</th><td>' + feature.properties.Impression + '</td></tr>'
            + '<tr><th scope="row">画像</th><td><img src="/img/sake/' + feature.properties.Image + '"</img></td></tr>'
            + '</table>'
        layer.bindPopup(popupContent, {maxHeight: 400})
        markers.addLayer(layer)
}});
map.addLayer(markers);
