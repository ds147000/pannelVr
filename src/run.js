var VR = pannellum.viewer('panorama', {
    "type": "equirectangular",
    "panorama": "./src/images/alma.jpg",
});

function hotspot(hotSpotDiv, args) {
    hotSpotDiv.classList.add('custom-tooltip');
    var a = document.createElement('a');
    a.innerHTML = args[0];
    a.href = args[1]
    hotSpotDiv.appendChild(a);
    a.style.width = a.scrollWidth - 20 + 'px';
    a.style.marginLeft = -(a.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
    a.style.marginTop = -a.scrollHeight - 12 + 'px';
}

//创建热点
function addHot(pitch, yaw) {
    VR.addHotSpot({
        "pitch": pitch,
        "yaw": yaw,
        "cssClass": "custom-hotspot",
        "createTooltipFunc": hotspot,
        "createTooltipArgs": ["维修点", "https://baidu.com"]
    })
}

var clickTime = 0

//绑定事件
VR.on('mousedown', function (e) {
    clickTime = new Date().getTime()
})

VR.on('mouseup', function (e) {
    if (new Date().getTime() - clickTime < 150) {
        var r = confirm('在这个位置报修吗？')
        if (r) {
            var hotData = VR.mouseEventToCoords(e)
            addHot(hotData[0], hotData[1])
        }
    }
})