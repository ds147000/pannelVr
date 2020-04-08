var VR = pannellum.viewer('panorama', {
    "type": "equirectangular",
    "panorama": "./src/images/alma.jpg",
});

function hotspot(hotSpotDiv, args) {
    hotSpotDiv.classList.add('custom-tooltip');
    var div = document.createElement('div');
    div.innerHTML = args[0];
    hotSpotDiv.appendChild(div);
    div.style.marginLeft = -(div.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
    div.style.marginTop = -div.scrollHeight + 80  + 'px';
    div.addEventListener('click', function() {
        alert('报修内容是' + args[1])
    })
}

//创建热点
function addHot(pitch, yaw, r) {
    VR.addHotSpot({
        "pitch": pitch,
        "yaw": yaw,
        "cssClass": "custom-hotspot",
        "createTooltipFunc": hotspot,
        "createTooltipArgs": ["保修点", r]
    })
}

var clickTime = 0

//绑定事件
VR.on('mousedown', function (e) {
    clickTime = new Date().getTime()
})

VR.on('mouseup', function (e) {
    if (new Date().getTime() - clickTime < 150) {
        var r = prompt('请输入保修内容')
        if (r) {
            var hotData = VR.mouseEventToCoords(e)
            addHot(hotData[0], hotData[1], r)
        }
    }
})